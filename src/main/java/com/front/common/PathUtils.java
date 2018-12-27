/**
 * FreeMarkUtils.java	  V1.0   2014-4-18 下午6:16:35
 *
 * Copyright GTA Information System Co. ,Ltd. All rights reserved.
 *
 * Modification history(By    Time    Reason):
 * 
 * Description:
 */

package com.front.common;

import java.net.InetAddress;

import javax.servlet.http.HttpServletRequest;

/***
 * 
 * @author Administrator
 * 
 */
public class PathUtils {
	/**
	 * 
	 * 功能描述：获取相对路径
	 * 
	 * @author bingzhong.qin
	 *         <p>
	 *         创建日期 ：20142014-4-18 下午6:17:51
	 *         </p>
	 * 
	 * @param request
	 * @return
	 * 
	 *         <p>
	 *         修改历史 ：(修改人，修改时间，修改原因/内容)
	 *         </p>
	 */
	public static String getBasePath(HttpServletRequest request) {
		if ("/ROOT".equals(request.getContextPath())) {
			return "";
		} else {
			return request.getContextPath();
		}
	}
 
	
	
	public static String getInterString()throws Exception
	{
		  InetAddress address =InetAddress.getLocalHost();
		  return address.getHostAddress();
	}
	
	public static void main(String[] args) throws Exception{
		String address = getInterString();
		System.out.println(address);
	}
}
