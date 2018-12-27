package com.front.controller;

import java.util.Date;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.front.common.ClientInfo;
import com.front.common.MD5Util;
import com.front.common.SiteUtil;
import com.front.common.StringUtils;
import com.front.constant.FrontConstant;
import com.front.constant.ReportConstant;
import com.front.constant.UserConstant;
import com.front.model.User;
import com.front.model.UserLoginLog;
import com.front.service.UserLoginLogService;
import com.front.service.UserService;
import com.google.common.collect.Maps;
import com.google.gson.Gson;

/**
 * 
 * @author Administrator
 *
 */
@Controller
public class LoginController extends BaseController {

	@Autowired
	private UserService userService;

	@Autowired
	private UserLoginLogService userLoginLogService;
	
	private static final Logger logger = LoggerFactory.getLogger(LoginController.class.getName());

	@RequestMapping(value = "/login")
	public void login(@RequestParam(value = "userName") String userName,
			@RequestParam(value = "userPwd") String userPwd, @RequestParam(value = "verification") String code,
			HttpServletRequest request, HttpServletResponse response) throws Exception {
		HttpSession session = request.getSession();
		if (StringUtils.isBlank(code)) {
			this.renderMsg(response, FrontConstant.FAILED_CODE, "验证码为空！", StringUtils.EMPTY);
			return;
		}
		String verification = String.valueOf(session.getAttribute("rand"));
		session.removeAttribute("rand");
		if (StringUtils.equalsIgnoreCase(verification, code)) {
			User user = userService.findByUserName(userName);
			if (user != null) {
				String pwd = MD5Util.MD5(userPwd);
				if (StringUtils.equalsIgnoreCase(pwd, user.getUserPassword())) {
					SiteUtil.setSiteUser(user);
					saveUserLoginLog(user);
					Map<String,Object>data = Maps.newHashMap();
					data.put("username", user.getUserName());
					data.put("balance",user.getCoin());
					data.put("fandian", user.getFandian());
					this.renderMsg(response, FrontConstant.SUCCESS_CODE, StringUtils.EMPTY, data);
					return;
				} else {
					this.renderMsg(response, FrontConstant.FAILED_CODE, "登录密码输入错误！", StringUtils.EMPTY);
					return;
				}
			}
			this.renderMsg(response, FrontConstant.FAILED_CODE, "用户名不存在！", StringUtils.EMPTY);
			return;
		} else {
			this.renderMsg(response, FrontConstant.FAILED_CODE, "验证码输入错误！", StringUtils.EMPTY);
		}
	}
	
	/**
	 * 
	 * @desc 保存用户登录日志
	 * @param user
	 */
	private void saveUserLoginLog(User user )
	{
		UserLoginLog log = new UserLoginLog();
		log.setUid(user.getUid());
		log.setUname(user.getUserName());
		log.setLoginAddress(SiteUtil.getIpAddr());
		log.setLoginDate(new Date());
		log.setNavigator(SiteUtil.getCurrentUsername());
		log.setOperationSystem(SiteUtil.getIpAddr());
		this.userLoginLogService.recordLoginLog(log);
		logger.info("saveUserLoginLog.userId:{},uid:{},loginName:{}",user.getId(),user.getUid(),user.getLoginName());
		user.setLastLogindate(new Date());
		user.setIsOnline(1);
		user.setSessionId(SiteUtil.getHttpServletRequest().getSession().getId());
		user.setLastLoginAddr(log.getLoginAddress());
		this.userService.updateUser(user);
		logger.info("updateUser.userId:{},loginName:{}",user.getId(),user.getLastLoginAddr());
	}

}
