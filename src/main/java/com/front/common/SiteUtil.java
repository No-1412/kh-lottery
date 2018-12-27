package com.front.common;

import java.net.InetAddress;
import java.net.NetworkInterface;
import java.util.Enumeration;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.front.constant.FrontConstant;
import com.front.model.User;

public class SiteUtil {

	/***
	 * 获取ip地址信息
	 * 
	 * @param request
	 * @return
	 */
	public static String getIpAddr() {
		HttpServletRequest request = getHttpServletRequest();
		String ip = request.getHeader("x-forwarded-for");
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("WL-Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getRemoteAddr();
		}
		return ip;
	}

	/***
	 * 获取ip地址信息
	 * 
	 * @param request
	 * @return
	 */
	public static String getIpAddr(HttpServletRequest request) {
		String ip = request.getHeader("x-forwarded-for");
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("WL-Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getRemoteAddr();
		}
		return ip;
	}

	/**
	 * 获取本机ip地址，并自动区分Windows还是linux操作系统
	 * 
	 * @return String
	 */
	public static String getLocalIP() throws Exception {
		InetAddress ip = null;
		try {
			// 如果是Linux操作系统
			Enumeration<NetworkInterface> netInterfaces = (Enumeration<NetworkInterface>) NetworkInterface
					.getNetworkInterfaces();
			while (netInterfaces.hasMoreElements()) {
				NetworkInterface ni = (NetworkInterface) netInterfaces.nextElement();
				// ----------特定情况，可以考虑用ni.getName判断
				// 遍历所有ip
				Enumeration<InetAddress> ips = ni.getInetAddresses();
				while (ips.hasMoreElements()) {
					ip = (InetAddress) ips.nextElement();
					if (ip.isSiteLocalAddress() && !ip.isLoopbackAddress() // 127.开头的都是lookback地址
							&& ip.getHostAddress().indexOf(":") == -1) {
						return ip.getHostAddress();
					}
				}

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return InetAddress.getLocalHost().getHostAddress();
	}

	/***
	 * 获取HttpServletRequest
	 * 
	 * @return
	 */
	public static HttpServletRequest getHttpServletRequest() {
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes())
				.getRequest();
		return request;
	}

	/***
	 * @desc 将当前的user存入session
	 * @return
	 */
	public static void setSiteUser(User user) {
		HttpServletRequest request = getHttpServletRequest();
		request.getSession().setAttribute(FrontConstant.USER_SESSION_KEY, user);
	}
	
	
	/***
	 * @desc 获取session登录用户
	 * @return
	 */
	public static User getLoginUserObject()
	{
		HttpServletRequest request = getHttpServletRequest();
		return (User)request.getSession().getAttribute(FrontConstant.USER_SESSION_KEY);
	}
	
	
	/***
	 * @desc 获取session登录用户名
	 * @return
	 */
	public static String getCurrentUsername()
	{
		User user = getLoginUserObject();
		return user.getLoginName();
	}
	
}
