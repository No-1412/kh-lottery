package com.front.dao;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcDaoSupport;
import org.springframework.stereotype.Component;

import com.front.cache.FrontCacheService;
import com.front.common.JsonUtil;
import com.front.common.RegUtils;
import com.front.common.StringUtils;
import com.front.conf.SpringUtils;
import com.front.constant.FrontConstant;
import com.front.constant.ReportConstant;
import com.front.dao.dialect.DataBaseDialectFactory;
import com.front.dao.dialect.DataBasePagingDialectService;
import com.front.enums.DataBaseDialectEnum;
import com.front.exception.FrontException;
import com.front.model.PageModel;
import com.front.redis.RedisService;
import com.front.report.RepDataHandlerProvider;
import com.front.report.RepDataHandlerService;

/****
 * 使用原生态的SQL语句查询
 * 
 * @author hongwu.huang
 *
 */
@Component(value = "cmsJdbcBaseDao")
public class CmsJdbcBaseDao extends NamedParameterJdbcDaoSupport {

	public static final String REPORT_CACHE_KEY = "disport-report";

	@Autowired
	private RepDataHandlerProvider repDataHandlerProvider;

	@Value("${platform.cache.mode:product}")
	private String mode;

	@Autowired
	private DataSource dataSource;

	@PostConstruct
	public void init() {
		setDataSource(dataSource);
	}
	
	
	/***
	 * 根据RepCode获取对应的SQL
	 * 
	 * @param repCode
	 * @throws SystemDBException
	 */
	@SuppressWarnings("unchecked")
	private Map<String, Object> getRepCode(String repCode) throws Exception {
		if (StringUtils.equals(mode, FrontConstant.PLATFORM_CACHE_PRODUCT)) {
			String repStr = RedisService.getRedisService().hget(REPORT_CACHE_KEY, repCode);
			if (StringUtils.isNotBlank(repStr)) {
				return JsonUtil.str2Object(repStr, Map.class);
			}
		}
		StringBuilder sb = new StringBuilder(ReportConstant.REPORT_CACHE_SQL);
		sb.append(" WHERE REP_CODE=:REP_CODE ");
		Map<String, Object> queryMap = new HashMap<String, Object>();
		queryMap.put("REP_CODE", repCode);
		Map<String, Object> repMap = this.getNamedParameterJdbcTemplate().queryForMap(sb.toString(), queryMap);
		if (repMap != null && !repMap.isEmpty()) {
			if (StringUtils.equals(mode, FrontConstant.PLATFORM_CACHE_PRODUCT)) {
				RedisService.getRedisService().hset(REPORT_CACHE_KEY, repCode, JsonUtil.object2String(repMap));
			}
			return repMap;
		} else {
			throw new Exception("通过[" + repCode + "]查找失败，请检查你的配置是否正确。");
		}
	}

	/****
	 * 根据RepCode 查询数据
	 * 
	 * @param repCode
	 * @param query
	 * @return
	 * @throws Exception
	 * @throws DataAccessException
	 */
	public Object getRepResult(String repCode, final Map<String, Object> queryParam)
			throws Exception {
		Map<String, Object> repMap = this.getRepCode(repCode);
		String cacheBean = StringUtils.obj2String(repMap.get(ReportConstant.REPORT_CACHE_HANDLER));
		FrontCacheService cache = null;
		if (!StringUtils.isBlank(cacheBean) && StringUtils.equals(mode, FrontConstant.PLATFORM_CACHE_PRODUCT)) {
			cache = SpringUtils.getBean(cacheBean);
			Object obj = cache.getCache(queryParam);
			if (obj != null) {
				return obj;
			}
		}
		String rsSql = StringUtils.obj2String(repMap.get(ReportConstant.REPORT_REP_SQL));
		String handlerBean = StringUtils.obj2String(repMap.get(ReportConstant.REPORT_REP_HANDLER));
		RepDataHandlerService handlerService = repDataHandlerProvider.getRepDataHandlerBean(handlerBean);
		RegUtils.findAndReplace("\\:\\s*[a-zA-Z\\.0-9\\_\\-\\?\\*\\/]+\\s*", rsSql, new RegUtils.FindCallback() {
			public String execute(String source) {
				String s = StringUtils.trim(StringUtils.replace(source, ":", ""));
				if (queryParam.get(s) == null) {
					queryParam.put(s, "");
				}
				return source;
			}
		});
		List<Map<String, Object>> result = this.getResultBySql(rsSql, queryParam);
		if (handlerService == null) {
			setCacheValue(queryParam, result, cache);
			return result;
		}
		try {
			Object obj = handlerService.handlerRepData(result, queryParam);
			setCacheValue(queryParam, obj, cache);
			return obj;
		} catch (FrontException e) {
			throw e;
		} catch (Exception e) {
			throw new Exception("查询数据异常:" + e.getMessage());
		}
	}

	/***
	 * 根据传入的SQL语句 查询的参数 执行SQL查询 返回 查询结果
	 * 
	 * @param rsSql
	 * @param queryParam
	 * @return
	 */
	public List<Map<String, Object>> getResultBySql(String rsSql, Map<String, Object> queryParam) {
		return this.getNamedParameterJdbcTemplate().queryForList(rsSql, queryParam);
	}

	/****
	 * 根据SQL语句获 查询的行数
	 * 
	 * @param rsSql
	 * @param queryParam
	 * @return
	 */
	public int getResultCountBySql(String rsSql, Map<String, Object> queryParam) {
		return this.getNamedParameterJdbcTemplate().queryForObject(rsSql, queryParam,Integer.class);
	}

	/***
	 * 
	 * @param rsSql
	 * @param queryParam
	 * @return
	 */
	public Map<String, Object> getSingleResultByOrgSql(String rsSql, Map<String, Object> queryParam) {
		return this.getNamedParameterJdbcTemplate().queryForMap(rsSql, queryParam);
	}

	/***
	 * 
	 * @param repCode
	 * @param queryParam
	 * @return
	 */
	public PageModel pagingResult(String repCode, final Map<String, Object> queryParam)
			throws Exception {
		PageModel model = new PageModel();
		try {
			Map<String, Object> repMap = this.getRepCode(repCode);
			String rsSql = StringUtils.obj2String(repMap.get(ReportConstant.REPORT_REP_SQL));
			String handlerBean = StringUtils.obj2String(repMap.get(ReportConstant.REPORT_REP_HANDLER));
			String pageIndex = StringUtils.obj2String(queryParam.get(FrontConstant.PAGE_INDEX));
			String pageSize = StringUtils.obj2String(queryParam.get(FrontConstant.PAGE_SIZE));
			DataBaseDialectEnum dbType = this.getDialect();
			DataBasePagingDialectService db = DataBaseDialectFactory.getInstance().createDialectService(dbType);
			RegUtils.findAndReplace("\\:\\s*[a-zA-Z\\.0-9\\_\\-\\?\\*\\/]+\\s*", rsSql, new RegUtils.FindCallback() {
				public String execute(String source) {
					String s = StringUtils.trim(StringUtils.replace(source, ":", ""));
					if (queryParam.get(s) == null) {
						queryParam.put(s, "");
					}
					return source;
				}
			});
			queryParam.put(FrontConstant.PAGE_START_INDEX,
					(StringUtils.str2Int(pageIndex) - 1) * StringUtils.str2Int(pageSize));
			queryParam.put(FrontConstant.PAGE_END_INDEX, StringUtils.str2Int(pageSize));
			String sql = db.generatePagingSQL(rsSql);
			RepDataHandlerService handlerService = repDataHandlerProvider.getRepDataHandlerBean(handlerBean);
			model.setTotalItem(this.getResultCountBySql(db.generatePagingCountSQL(rsSql), queryParam));
			if (handlerService == null) {
				model.setList(this.getResultBySql(sql, queryParam));
			} else {
				model.setList((List) handlerService.handlerRepData(this.getResultBySql(sql, queryParam), queryParam));
			}
		} catch (FrontException e) {
			throw e;
		} catch (Exception e) {
			throw new Exception("执行分页查询数据异常:repCode:" + repCode + ";异常信息" + e.getMessage());
		}
		return model;
	}

	/***
	 * 
	 * 根据repCode获取单条记录
	 * 
	 * @return
	 * @throws SQLException
	 */
	public Map<String, Object> querySingleResult(String repCode, final Map<String, Object> queryParam)
			throws  Exception {
		Map<String, Object> repMap = this.getRepCode(repCode);
		String cacheBean = StringUtils.obj2String(repMap.get(ReportConstant.REPORT_CACHE_HANDLER));
		FrontCacheService cache = null;
		if (!StringUtils.isBlank(cacheBean) && StringUtils.equals(mode, FrontConstant.PLATFORM_CACHE_PRODUCT)) {
			cache = SpringUtils.getBean(cacheBean);
			Object obj = cache.getCache(queryParam);
			if (obj != null) {
				return (Map<String, Object>) obj;
			}
		}
		String rsSql = StringUtils.obj2String(repMap.get("REP_SQL"));
		RegUtils.findAndReplace("\\:\\s*[a-zA-Z\\.0-9\\_\\-\\?\\*\\/]+\\s*", rsSql, new RegUtils.FindCallback() {
			public String execute(String source) {
				String s = StringUtils.trim(StringUtils.replace(source, ":", ""));
				if (queryParam.get(s) == null) {
					queryParam.put(s, "");
				}
				return source;
			}
		});
		Map<String, Object> object = null;
		List<Map<String, Object>> result = this.getNamedParameterJdbcTemplate().queryForList(rsSql, queryParam);
		if (result != null && !result.isEmpty()) {
			object = result.get(0);
			setCacheValue(queryParam, object, cache);
		}
		return object;
	}

	/**
	 * 
	 * @param key
	 * @param value
	 * @param cache
	 */
	private void setCacheValue(Map<String, Object> key, Object value, FrontCacheService cache) throws Exception {
		if (cache != null) {
			cache.setCache(key, value);
		}
	}

	/***
	 * 
	 * 获取dbType
	 * 
	 * @return
	 * @throws SQLException
	 */
	private DataBaseDialectEnum getDialect() throws SQLException {
		/*
		 * Connection conn =
		 * DataSourceUtils.doGetConnection(super.getDataSource()); String dbtype
		 * =conn.getMetaData().getDatabaseProductName();
		 * DataSourceUtils.releaseConnection(conn, super.getDataSource());
		 * return DataBaseDialectEnum.valueOf(dbtype);
		 */
		return DataBaseDialectEnum.MySQL;
	}
}
