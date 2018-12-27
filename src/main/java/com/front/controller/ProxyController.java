package com.front.controller;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.math.NumberUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.front.annotation.LoginRule;
import com.front.common.JsonUtil;
import com.front.common.MD5Util;
import com.front.common.SiteUtil;
import com.front.common.StringUtils;
import com.front.constant.FrontConstant;
import com.front.constant.ReportConstant;
import com.front.constant.UserConstant;
import com.front.model.PageModel;
import com.front.model.User;
import com.front.service.UserProxyService;
import com.front.service.UserService;
import com.google.common.collect.Maps;

/**
 * 代理管理
 * 
 * @author GusonYang
 *
 */
@Controller
public class ProxyController extends BaseController {

	@Autowired
	private UserProxyService userProxyService;

	@Autowired
	private UserService userService;

	@RequestMapping("/content/proxy/vip")
	/***
	 * 代理中心主页面
	 * 
	 * @param modelMap
	 * @return
	 * @throws Exception
	 */
	public String Info(ModelMap modelMap) throws Exception {
		return "proxy/vip/vip";
	}

	@RequestMapping("/proxy/pagingProxy")
	/***
	 * 代理中心分页查询
	 * 
	 * @param modelMap
	 * @return
	 * @throws Exception
	 */
	@LoginRule
	public void pagingProxy(HttpServletRequest req, HttpServletResponse response, ModelMap modelMap) throws Exception {
		try {
			User user = super.getLoginUserObject();
			Map<String, Object> query = this.buildQueryMap(req);
			query.put("uid", user.getId());
			query.put("cid", user.getId());
			PageModel pg = this.reportService.pagingReportResult("pagingProxy", query);
			pg.setPageIndex(StringUtils.str2Int(req.getParameter(FrontConstant.PAGE_INDEX)));
			this.renderMsg(response, FrontConstant.SUCCESS_CODE, StringUtils.EMPTY, pg.toMap());
		} catch (Exception e) {
			this.renderMsg(response, FrontConstant.FAILED_CODE, e.getMessage(), StringUtils.EMPTY);
		}
	}

	/***
	 * 跳转到创建代理中心页面 添加会员
	 * 
	 * @param modelMap
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/content/proxy/addProxyInfo")
	@LoginRule
	public void addProxyInfo(HttpServletRequest req, HttpServletResponse response) throws Exception {
		User user = super.getLoginUserObject();
		Map<String, Object> result = Maps.newHashMap();
		double fanDian = StringUtils.str2Double(this.reportService.queryCmsConf(ReportConstant.DIFFERENCE));
		result.put("fanDian", user.getFandian() - fanDian / 100);// 当前用户的返点，添加下属
																	// 的代理，会员不能高于当前返点
		result.put("minRebate", StringUtils.str2Double(this.reportService.queryCmsConf(ReportConstant.MIN_REBATE)));
		result.put("dc", fanDian);// 点差
		this.renderMsg(response, FrontConstant.SUCCESS_CODE, "", result);
	}

	@RequestMapping(value = "/proxy/saveProxy", method = RequestMethod.POST)
	/***
	 * 保存会员代理
	 * 
	 * @param modelMap
	 * @return
	 * @throws Exception
	 */
	@LoginRule
	public void saveProxy(HttpServletRequest req, HttpServletResponse response) throws Exception {
		try {
			User user = JsonUtil.map2Object(this.buildQueryMap(req), User.class);
			User current = super.getLoginUserObject(true);
			int userType = current.getUserType();
			String loginName = user.getLoginName();
			User check = userService.findByUserName(loginName);
			if (check == null) {
				if (userType == UserConstant.USER_PROXY_TYPE) {
					double rebate = new BigDecimal(user.getFandian() + "").divide(new BigDecimal("100")).doubleValue();
					double fanDian = new BigDecimal(this.reportService.queryCmsConf(ReportConstant.DIFFERENCE))
							.divide(new BigDecimal("100")).doubleValue();
					if (rebate < 0 || rebate > current.getFandian() - fanDian) {
						this.renderMsg(response, FrontConstant.FAILED_CODE, "用户返点数据异常。", StringUtils.EMPTY);
						return;
					}
					Date date = new Date();
					user.setFandian(user.getFandian() / 100);
					user.setVirtualAccount(current.getVirtualAccount());
					user.setStatus(UserConstant.USER_NORMAL_STATUS);
					user.setRegisterDate(date);
					user.setRegisterAddr(SiteUtil.getIpAddr());
					user.setCreateUser(current.getId());
					user.setModifyUser(current.getId());
					user.setModifyDate(date);
					user.setIsOnline(UserConstant.USER_OFF_LINE);
					// user.setUserPassword(MD5Util.MD5(user.getUserPassword()));//用户密码
					user.setCoin(0.00);
					user.setFcoin(0.00);
					Map<String, Object> param = new HashMap<String, Object>();
					param.put("uid", current.getId());
					param.put("rebate", user.getFandian());
					param.put(UserConstant.PROXY_OPERATION_TYPE, UserConstant.CREATE_PROXY);
					this.reportService.getReportResult("proxyRebateLimit", param);
					this.userProxyService.createProxy(user);
					this.renderMsg(response, FrontConstant.SUCCESS_CODE, "", StringUtils.EMPTY);
					return;
				}
				this.renderMsg(response, FrontConstant.FAILED_CODE, "会员无法创建下级代理，用户。", StringUtils.EMPTY);
			} else {
				StringBuilder sb = new StringBuilder();
				sb.append(loginName).append("已经在平台注册!");
				this.renderMsg(response, FrontConstant.FAILED_CODE, sb.toString(), StringUtils.EMPTY);
				return;
			}
		} catch (Exception e) {
			this.renderMsg(response, FrontConstant.FAILED_CODE, e.getMessage(), StringUtils.EMPTY);
		}
	}

	/***
	 * @desc 查询下级代理
	 * @param req
	 * @param response
	 */
	@RequestMapping("/proxy/pagingSubagent")
	@LoginRule
	public void pagingSubagent(HttpServletRequest req, HttpServletResponse response) throws IOException {
		try {
			User user = this.getLoginUserObject();
			Map<String, Object> query = this.buildQueryMap(req);
			int uid = StringUtils.str2Int(query.get("uid"));
			query.put("cid", user.getId());
			query.put("isSelf", (uid == user.getId()) ? "Y" : "N");
			PageModel pg = this.reportService.pagingReportResult("pagingProxy", query);
			pg.setPageIndex(StringUtils.str2Int(req.getParameter(FrontConstant.PAGE_INDEX)));
			this.renderMsg(response, FrontConstant.SUCCESS_CODE, StringUtils.EMPTY, pg.toMap());
		} catch (Exception e) {
			this.renderMsg(response, FrontConstant.FAILED_CODE, e.getMessage(), StringUtils.EMPTY);
		}
	}

	/***
	 * @desc 查看当前下级代理信息
	 * @param req
	 * @param response
	 */
	@RequestMapping(value = "/proxy/curProxyInfo")
	@LoginRule
	public void toUpdateSubProxy(HttpServletRequest req, HttpServletResponse response, ModelMap map)
			throws IOException, Exception {
		try {
			User user = this.getLoginUserObject(true);
			Map<String, Object> param = this.buildQueryMap(req);
			param.put("parentId", user.getId());
			Map<String, Object> result = this.reportService.querySingleResult("queryUserInfo", param);
			// result.put("userFandian", user.getFandian());
			// double fanDian = new
			// BigDecimal(this.reportService.queryCmsConf(ReportConstant.DIFFERENCE)).divide(new
			// BigDecimal(100)).doubleValue();
			// result.put("maxRebate", user.getFandian()-fanDian);//当前用户的返点，添加下属
			// 的代理，会员不能高于当前返点
			result.put("userCoin", user.getCoin()); 
			result.put("maxFandian", user.getFandian()-NumberUtils.toDouble(this.reportService.queryCmsConf(ReportConstant.DIFFERENCE)));// 点差
			this.renderMsg(response, FrontConstant.SUCCESS_CODE, StringUtils.EMPTY, result);
		} catch (Exception e) {
			this.renderMsg(response, FrontConstant.FAILED_CODE, e.getMessage(), StringUtils.EMPTY);
		}
	}

	/***
	 * @desc 修改下级代理信息
	 * @param req
	 * @param response
	 */
	@RequestMapping(value = "/proxy/updateSubProxy")
	@LoginRule
	public void updateSubProxy(HttpServletRequest req, HttpServletResponse response) throws IOException, Exception {
		try {

			
			User current = this.getLoginUserObject(true);
			User user = new User();
			double fanDian = new BigDecimal(req.getParameter("fandian")).divide(new BigDecimal("100"),3,RoundingMode.DOWN).doubleValue();
			if (fanDian < 0 ||  current.getFandian() - fanDian < 0) {
				this.renderMsg(response, FrontConstant.FAILED_CODE, "用户返点数据异常。", StringUtils.EMPTY);
				return;
			}
			user.setId(StringUtils.str2Int(req.getParameter("id")));
			user.setFandian(fanDian);
			this.userService.updateUser(user);
			this.renderMsg(response, FrontConstant.SUCCESS_CODE, StringUtils.EMPTY, StringUtils.EMPTY);
		} catch (Exception e) {
			this.renderMsg(response, FrontConstant.FAILED_CODE, e.getMessage(), StringUtils.EMPTY);
		}
	}

	@RequestMapping(value = "/proxy/chargeSubProxy")
	@LoginRule
	public void chargeSubProxy(HttpServletRequest req, HttpServletResponse response) throws IOException, Exception {
		try {
			User p = getLoginUserObject(true);// 获取当前登录用户
			String password = req.getParameter("password");
			if (StringUtils.isBlank(p.getCoinPassword())) {
				this.renderMsg(response, FrontConstant.FAILED_CODE, "您还未设置资金密码，无法进行充值！", StringUtils.EMPTY);
				return;
			}
			if (!StringUtils.equals(MD5Util.MD5(password), p.getCoinPassword())) {
				this.renderMsg(response, FrontConstant.FAILED_CODE, "资金密码错误！", StringUtils.EMPTY);
				return;
			}
			double coin = StringUtils.str2Double(req.getParameter("coin"));
			if (p.getCoin() > 0 && p.getCoin() >= coin) {
				User user = userService.findByID(StringUtils.str2Int(req.getParameter("id")));
				this.userProxyService.chargeSubProxy(p, user, coin);
				this.renderMsg(response, FrontConstant.SUCCESS_CODE, StringUtils.EMPTY, StringUtils.EMPTY);
			} else {
				this.renderMsg(response, FrontConstant.FAILED_CODE, "当前用户余额不足，无法充值。", StringUtils.EMPTY);
			}
		} catch (Exception e) {
			this.renderMsg(response, FrontConstant.FAILED_CODE, e.getMessage(), StringUtils.EMPTY);
		}
	}

	@RequestMapping(value = "/proxy/checkLoginName")
	public void checkLoginName(HttpServletRequest req, HttpServletResponse response, ModelMap modelMap)
			throws Exception {
		String userName = req.getParameter("userName");
		User user = userService.findByUserName(userName);
		if (user != null) {
			StringBuilder sb = new StringBuilder();
			sb.append(userName).append("已经在平台注册!");
			this.renderMsg(response, FrontConstant.FAILED_CODE, sb.toString(), StringUtils.EMPTY);
			return;
		}
		this.renderMsg(response, FrontConstant.SUCCESS_CODE, StringUtils.EMPTY, StringUtils.EMPTY);
	}

}
