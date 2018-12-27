package com.front.common;

import java.io.UnsupportedEncodingException;
import java.util.regex.Pattern;

import org.apache.commons.lang3.math.NumberUtils;

/****
 * 
 * @author Administrator
 *
 */
public class StringUtils extends org.apache.commons.lang3.StringUtils {

	public static byte[] getString2Utf8(Object obj) {
		return getString2Utf8(obj2String(obj));
	}

	public static byte[] getString2Utf8(String key) {
		try {
			return key.getBytes("utf-8");
		} catch (UnsupportedEncodingException e) {
			return null;
		}
	}

	/***
	 * 将S 转化为 int 如转化异常 则返回 0
	 * 
	 * @param s
	 * @return
	 */
	public static int str2Int(String s) {
		return NumberUtils.toInt(s);
	}

	/***
	 * 将S 转化为 double 如转化异常 则返回 0
	 * 
	 * @param s
	 * @return
	 */
	public static double str2Double(String s) {
		return NumberUtils.toDouble(s);
	}

	/***
	 * 将S 转化为 int 如转化异常 则返回 0
	 * 
	 * @param s
	 * @return
	 */
	public static int str2Int(Object s) {
		return NumberUtils.toInt(s + "");
	}

	/***
	 * 将S 转化为 double 如转化异常 则返回 0
	 * 
	 * @param s
	 * @return
	 */
	public static double str2Double(Object s) {
		return NumberUtils.toDouble(s + "");
	}

	/***
	 * 将S 转化为 double 如转化异常 则返回 0
	 * 
	 * @param s
	 * @return
	 */
	public static Long str2Long(String s) {
		return NumberUtils.toLong(s);
	}

	/***
	 * 
	 * @param str
	 * @return
	 */
	public static boolean isDouble(String str) {
		return NumberUtils.isNumber(str);
	}

	/**
	 * 
	 * 功能描述：判断是否都是由数字组成
	 *
	 * @author qinbingzhong
	 *         <p>
	 *         创建日期 ：Jun 25, 2013 3:43:59 PM
	 *         </p>
	 *
	 * @param str
	 * @return
	 *
	 *         <p>
	 *         修改历史 ：(修改人，修改时间，修改原因/内容)
	 *         </p>
	 */
	public static boolean isNum(String str) {
		Pattern pattern = Pattern.compile("[0-9]*");
		if (isBlank(str)) {
			return false;
		}
		if (pattern.matcher(str).matches()) {
			return true;
		}
		return false;
	}

	/***
	 * 将哦不就转化为String类型格式的字符串
	 * 
	 * @param obj
	 * @return
	 */
	public static String obj2String(Object obj) {
		if (obj != null) {
			return obj.toString();
		}
		return null;
	}

	/**
	 * 判断字符串是否为空字符串
	 * 
	 * @param obj
	 * @return
	 */
	public static boolean isEmpty(Object obj) {
		if (null == obj || "".equals(obj.toString())) {
			return true;
		}
		return false;
	}

	/**
	 * 判断字符串是否为空字符串
	 * 
	 * @param obj
	 * @return
	 */
	public static String tirmAll(String obj) {
		if (isEmpty(obj)) {
			return StringUtils.EMPTY;
		}
		return obj.replaceAll("\\s*", StringUtils.EMPTY);
	}

}
