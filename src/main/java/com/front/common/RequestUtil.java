package com.front.common;

import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.net.UnknownHostException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map; 

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.math.NumberUtils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

/**
 * 请求参数获取工具
 * 
 * @author Administrator
 *
 */
public class RequestUtil {

	public static HttpServletRequest getRequest() {
		return ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
	}

	/**
	 * 获取请求参数
	 * 
	 * @param attrName
	 *            参数名称
	 * @param clz
	 *            返回类型
	 * @return
	 */
	public static <T> T getAttribute(String attrName, Class<T> clz) {
		HttpServletRequest req = getRequest();
		if (req == null)
			return null;
		Object o = getAttribute(attrName);
		return o == null ? null : (T) o;
	}

	/**
	 * Integer类型参数
	 * 
	 * @param paramName
	 * @return
	 */
	public static Double getParameterDouble(String paramName) {
		HttpServletRequest req = getRequest();
		if (req == null)
			return null;
		String o = getParameter(paramName);
		return o == null ? null : Double.valueOf(o);
	}

	/**
	 * Integer类型参数
	 * 
	 * @param paramName
	 * @return
	 */
	public static Integer getParameterInt(String paramName) {
		HttpServletRequest req = getRequest();
		if (req == null)
			return null;
		String o = getParameter(paramName);
		return o == null ? null : Integer.valueOf(o);
	}

	/**
	 * 获取form请求参数
	 * 
	 * @param paramName
	 * @return
	 */
	public static String getParameter(String paramName) {
		HttpServletRequest req = getRequest();
		if (req == null)
			return null;
		String value = req.getParameter(paramName);
		return value == null ? null : value.trim();
	}

	/**
	 * 获取请求参数
	 * 
	 * @param attrName
	 * @return
	 */
	public static Object getAttribute(String attrName) {
		HttpServletRequest req = getRequest();
		if (req == null)
			return null;
		return req.getAttribute(attrName);
	}

	/**
	 * 获取字符串
	 * 
	 * @param paramName
	 *            参数名称
	 * @return
	 */
	public static String getString(String paramName) {
		HttpServletRequest req = getRequest();
		if (req == null)
			return null;
		String str = req.getParameter(paramName);
		return StringUtils.isNotBlank(str) ? str.trim() : str;
	}

	/**
	 * 获取list
	 * 
	 * @param paramName
	 *            参数名称
	 * @return
	 */
	public static List<?> getList(String paramName) {
		return getAttribute(paramName, List.class);
	}

	public static String getIp() {
		HttpServletRequest request = getRequest();
		if (request == null)
			return null;

		String ip = request.getHeader("x-forwarded-for");
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("WL-Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("HTTP_CLIENT_IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("HTTP_X_FORWARDED_FOR");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getRemoteAddr();
		}

		if (StringUtils.isNotBlank(ip) && ip.indexOf("0:0:0:0:0:0:0:1") > -1)
			ip = "127.0.0.1";

		return ip;
	} 

	public static String localMAC() {
		try {
			byte[] mac = NetworkInterface.getByInetAddress(InetAddress.getLocalHost()).getHardwareAddress();
			StringBuffer sb = new StringBuffer("");
			for (int i = 0;mac!=null && i < mac.length; i++) {
				if (i != 0) {
					sb.append("-");
				}
				// 字节转换为整数
				int temp = mac[i] & 0xff;
				String str = Integer.toHexString(temp);
				if (str.length() == 1) {
					sb.append("0" + str);
				} else {
					sb.append(str);
				}
			}
			return sb.toString().toUpperCase();
		} catch (SocketException e) {
			e.printStackTrace();
		} catch (UnknownHostException e) {
			e.printStackTrace();
		}

		return "FF:FF:FF:FF:FF:FF";
	}

	/**
	 * 获取Map
	 * 
	 * @param paramName
	 *            参数名称
	 * @return
	 */
	public static Map<?, ?> getMap(String paramName) {
		return getAttribute(paramName, Map.class);
	}

	/**
	 * 获取paramMap
	 * 
	 * @return
	 */
	public static Map<?, ?> getParamMap() {
		HttpServletRequest req = getRequest();
		if (req == null)
			return null;
		Object o = req.getParameterMap();
		return o == null ? null : (Map) o;
	}

	/**
	 * 从request中获得参数Map，并返回可读的Map
	 * 
	 * @param request
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public static Map getMapParameter() {
		HttpServletRequest request = getRequest();
		// 参数Map
		Map properties = request.getParameterMap();
		// 返回值Map
		Map returnMap = new HashMap();
		Iterator entries = properties.entrySet().iterator();
		Map.Entry entry;
		String name = "";
		String value = "";
		while (entries.hasNext()) {
			entry = (Map.Entry) entries.next();
			name = (String) entry.getKey();
			Object valueObj = entry.getValue();
			if (null == valueObj) {
				value = "";
			} else if (valueObj instanceof String[]) {
				String[] values = (String[]) valueObj;
				for (int i = 0; i < values.length; i++) {
					value = values[i] + ",";
				}
				value = value.substring(0, value.length() - 1);
			} else {
				value = valueObj.toString();
			}
			returnMap.put(name, value);
		}
		return returnMap;
	}

	/**
	 * 获取请求url
	 * 
	 * @return
	 */
	public static String getRequestUrl() {
		HttpServletRequest req = getRequest();
		if (req == null)
			return null;
		return req.getRequestURI() == null ? null : req.getRequestURI();
	}

	/**
	 * request setAttribute
	 * 
	 * @param name
	 * @param o
	 */
	public static void setAttribute(String name, Object o) {
		HttpServletRequest req = getRequest();
		if (req == null)
			return;
		req.setAttribute(name, o);
	}

	public static HttpSession getSession() {
		return getRequest().getSession();
	}

	public static String getHeader(String headerName) {
		return getRequest().getHeader(headerName);
	}

	public static int getInt(String paramName) {
		String paramValue = getString(paramName); 
		return NumberUtils.toInt(paramValue,0);
	}

	public static int getInt(String paramName, int defaultValue) {
		int result = getInt(paramName);
		if (result == 0)
			return defaultValue;
		return defaultValue;
	}

	public static String getSessionId() {
		return getSession().getId();
	}

}
