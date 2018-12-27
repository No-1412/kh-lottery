package com.front.controller;

import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.front.common.JsonUtil;
import com.front.common.SiteUtil;
import com.front.common.StringUtils;
import com.front.constant.FrontConstant;
import com.front.constant.UserConstant;
import com.front.model.User;
import com.front.service.UserProxyService;
import com.google.common.collect.Maps;

@Controller
public class RegisterController extends BaseController {

	@Autowired
	private UserProxyService userProxyService;

	@RequestMapping(value = "/promLink/register", method = RequestMethod.POST)
	public void promLinkRegister(HttpServletRequest req, HttpServletResponse response) throws Exception {
		String loginName = req.getParameter("loginName");
		if (userService.findByUserName(loginName) != null) {
			StringBuilder sb = new StringBuilder();
			sb.append(loginName).append("已经在平台注册!");
			this.renderMsg(response, FrontConstant.FAILED_CODE, sb.toString(), StringUtils.EMPTY);
			return;
		}
		String promLink = req.getParameter("promLink");
		Map<String, Object> param = Maps.newHashMap();
		param.put("promotionLink", promLink);
		List<Map> result = (List<Map>)this.reportService.getReportResult("queryPromotionLinkInfo", param);
		if (result != null && !result.isEmpty()) {
			Map<String, Object> linkInfo = result.get(0);
			User parent = new User();
			parent.setVirtualAccount(StringUtils.str2Int(linkInfo.get("virtualAccount") + ""));
			parent.setUserType(StringUtils.str2Int(linkInfo.get("pUserType") + ""));
			parent.setId(StringUtils.str2Int(linkInfo.get("id") + ""));
			parent.setUid(StringUtils.obj2String(linkInfo.get("uid")));
			if (parent.getUserType() == UserConstant.USER_PROXY_TYPE) {
				Date date = new Date();
				User user =   JsonUtil.map2Object(this.buildQueryMap(req), User.class);  
				user.setUserType(StringUtils.str2Int(linkInfo.get("pUserType") + "")); 
				user.setFandian(StringUtils.str2Double(linkInfo.get("userRebate") + ""));
				user.setVirtualAccount(parent.getVirtualAccount());
				user.setStatus(UserConstant.USER_NORMAL_STATUS);
				user.setRegisterDate(date);
				user.setRegisterAddr(SiteUtil.getIpAddr());
				user.setCreateUser(user.getId());
				user.setModifyUser(user.getId());
				user.setModifyDate(date);
				user.setIsOnline(UserConstant.USER_OFF_LINE); 
				// user.setUserPassword(MD5Util.MD5(user.getUserPassword()));//用户密码
				user.setCoin(0.00);
				user.setFcoin(0.00);
				this.userProxyService.register(parent, user);
				this.renderMsg(response, FrontConstant.SUCCESS_CODE, "", StringUtils.EMPTY);
				return;
			} else {
				this.renderMsg(response, FrontConstant.FAILED_CODE, "会员无法创建下级代理，用户。", StringUtils.EMPTY);
			}
		}
	}

	@RequestMapping(value = "/register", method = RequestMethod.POST)
	public void register(HttpServletRequest req, HttpServletResponse response) throws Exception {
		String loginName = req.getParameter("loginName");
		if (userService.findByUserName(loginName) != null) {
			StringBuilder sb = new StringBuilder();
			sb.append(loginName).append("已经在平台注册!");
			this.renderMsg(response, FrontConstant.FAILED_CODE, sb.toString(), StringUtils.EMPTY);
			return;
		}
		Date date = new Date();
		User user =  JsonUtil.map2Object(this.buildQueryMap(req), User.class); 
		user.setUserType(1); 
		user.setFandian(0.125);
		user.setVirtualAccount(0);
		user.setStatus(UserConstant.USER_NORMAL_STATUS);
		user.setRegisterDate(date);
		user.setModifyDate(date);
		user.setRegisterAddr(SiteUtil.getIpAddr());  
		user.setIsOnline(UserConstant.USER_OFF_LINE); 
		// user.setUserPassword(MD5Util.MD5(user.getUserPassword()));//用户密码
		user.setCoin(0.00);
		user.setFcoin(0.00);
		this.userProxyService.register(null, user);
		this.renderMsg(response, FrontConstant.SUCCESS_CODE, "", StringUtils.EMPTY);
		return;
	}
}
