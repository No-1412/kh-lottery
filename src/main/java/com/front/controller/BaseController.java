package com.front.controller;

import java.io.IOException;
import java.net.URLDecoder;
import java.util.Base64;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.util.Base64.Encoder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;

import com.front.common.SiteUtil;
import com.front.exception.LoginException;
import com.front.model.User;
import com.front.service.ReportService;
import com.front.service.UserService;
import com.google.gson.GsonBuilder;

public class BaseController {

	@Autowired
	public ReportService reportService;

	@Autowired
	public UserService userService;
	
	public static Encoder encoder = Base64.getEncoder();

	/**
	 * 发送文本。使用UTF-8编码。
	 * 
	 * @param response
	 *            HttpServletResponse
	 * @param text
	 *            发送的字符串
	 * @throws IOException
	 */
	public void renderPage(HttpServletResponse response, String text) throws IOException {
		render(response, "text/html;charset=utf-8", text);
	}

	/**
	 * 发送文本。使用UTF-8编码。
	 * 
	 * @param response
	 *            HttpServletResponse
	 * @param text
	 *            发送的字符串
	 * @throws IOException
	 */
	public void renderText(HttpServletResponse response, String text) throws IOException {
		render(response, "text/plain;charset=UTF-8", text);
	}

	/**
	 * 发送json。使用UTF-8编码。
	 * 
	 * @param response
	 *            HttpServletResponse
	 * @param text
	 *            发送的字符串
	 * @throws IOException
	 */
	public void renderJson(HttpServletResponse response, String text) throws IOException {
		render(response, "application/json;charset=UTF-8", text);
	}

	/***
	 * 
	 * @param response
	 * @param retCode
	 * @param retMsg
	 * @param obj
	 * @throws IOException
	 */
	public void renderMsg(HttpServletResponse response, int retCode, String retMsg, Object obj) throws IOException {
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("retcode", retCode);
		result.put("retmsg", retMsg);
		result.put("data", obj);
		this.renderJson(response, new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").create().toJson(result));
	}

	/**
	 * 发送xml。使用UTF-8编码。
	 * 
	 * @param response
	 *            HttpServletResponse
	 * @param text
	 *            发送的字符串
	 * @throws IOException
	 */
	public void renderXml(HttpServletResponse response, String text) throws IOException {
		render(response, "text/xml;charset=UTF-8", text);
	}

	/**
	 * 发送内容。使用UTF-8编码。
	 * 
	 * @param response
	 * @param contentType
	 * @param text
	 * @throws IOException
	 */
	public void render(HttpServletResponse response, String contentType, String text) throws IOException {
		response.setContentType(contentType);
		response.setHeader("Pragma", "No-cache");
		response.setHeader("Cache-Control", "no-cache");
		response.setDateHeader("Expires", 0);
		response.getWriter().write(text);
		response.getWriter().flush();
	}

	/**
	 * 获取当前已登陆User对象
	 * 
	 * @return
	 */
	public User getLoginUserObject() throws LoginException {
		return this.getLoginUserObject(false);
	}

	/**
	 * 获取当前已登陆User对象
	 * 
	 * @param bol
	 *            是否强制从db获取
	 * @return
	 */
	public User getLoginUserObject(boolean bol) throws LoginException {
		User user = SiteUtil.getLoginUserObject();
		if (bol && user != null) {
			return this.userService.findByID(user.getId());
		}
		return user;
	}

	/***
	 * 获取所有request的参数 构建一个map结构数据
	 * 
	 * @param req
	 * @return
	 * @throws Exception
	 */
	public Map<String, Object> buildQueryMap(HttpServletRequest req) throws Exception {
		Map<String, Object> result = new HashMap<String, Object>();
		String method = req.getMethod();
		Enumeration<String> en = req.getParameterNames();
		while (en.hasMoreElements()) {
			String key = en.nextElement();
			if ("POST".equals(method)) {
				result.put(key, req.getParameter(key));
			} else {
				result.put(key, URLDecoder.decode(req.getParameter(key), "utf-8"));
			}
		}
		return result;
	}
}
