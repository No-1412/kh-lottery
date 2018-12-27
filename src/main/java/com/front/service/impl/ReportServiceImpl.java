package com.front.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.front.common.StringUtils;
import com.front.constant.ReportConstant;
import com.front.dao.CmsJdbcBaseDao;
import com.front.exception.FrontException; 
import com.front.model.PageModel;
import com.front.service.ReportService;

@Service
public class ReportServiceImpl implements ReportService {

    @Autowired
	protected CmsJdbcBaseDao cmsDao;
	
	@Override
	public Object getReportResult(String repCode, Map<String, Object> param)throws Exception
	{
		return  cmsDao.getRepResult(repCode, param);
	}

	@Override
	public PageModel pagingReportResult(String repCode, Map<String, Object> param) throws Exception 
	{
		return this.cmsDao.pagingResult(repCode, param);
	}

	@Override
	public boolean verification(String repCode, Map<String, Object> param) throws Exception 
	{
		List<Map> result = null;
		try {
			result = (List<Map>)this.getReportResult(repCode, param);
			if(result!=null&&!result.isEmpty())
			{
				Map<String,Object> ver= result.get(0);
				String checkCode = StringUtils.obj2String(ver.get(ReportConstant.CHECK_CODE));
				if(StringUtils.equals(checkCode, "Y"))//校验成功
				{
					return true;
				}
				String msg =StringUtils.obj2String(ver.get(ReportConstant.CHECK_MSG));
				throw new FrontException(ReportConstant.CHECK_FAIL_EX, msg);
			}
		} catch (Exception e) {
		     throw new FrontException(ReportConstant.CHECK_SQL_EX, e.getMessage());
		}
	    return false;
	}
	

	@Override
	public String queryCmsSeq(String catalog) {
		Map<String,Object>queryParam = new HashMap<String, Object>();
		queryParam.put(ReportConstant.QUERY_CMS_PARAM, catalog);
		Map<String,Object>result= this.cmsDao.getSingleResultByOrgSql(ReportConstant.QUERY_CMS_SEQ, queryParam);
		return StringUtils.obj2String(result.get(ReportConstant.CMS_ORDER_KEY));
	}

	@Override
	public Map<String, Object> querySingleResult(String repCode,
			Map<String, Object> param) throws Exception {
		return cmsDao.querySingleResult(repCode, param);
	}

	@Override
	public String queryCmsConf(String catalog) throws Exception{
		Map<String,Object>queryParam = new HashMap<String, Object>();
		queryParam.put(ReportConstant.QUERY_CMS_CONF_PARAM, catalog);
		Map<String,Object>result= this.cmsDao.querySingleResult(ReportConstant.QUERY_CMS_REPCODE, queryParam);
		return StringUtils.obj2String(result.get(ReportConstant.CMS_CONF_KEY));
	}

 
}
