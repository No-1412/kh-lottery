package com.front.common;

import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUtils extends org.apache.commons.lang3.time.DateUtils{

	public static SimpleDateFormat timeformat=new SimpleDateFormat("HH:mm:ss");
	public static SimpleDateFormat dateformat=new SimpleDateFormat("yyyy-MM-dd");
	public static SimpleDateFormat dateShortFormat=new SimpleDateFormat("yyyyMMdd");
	private static SimpleDateFormat shorttimeformat = new SimpleDateFormat("HH:mm");
	public static SimpleDateFormat dateLongFormat=new SimpleDateFormat("yyyyMMddHHmmss");

	
	public static String getTimeString(Date date){
		return timeformat.format(date);
	}
	
	public static String getDateString(Date date){
		return dateformat.format(date);
	}
	
	public static String getShortDateString(Date date){
		return dateShortFormat.format(date);
	}
	
	/**
	 *  判断当前时间是否在时间间隔之内
	 * @param startTime
	 * @param endTime
	 * @return
	 */
	public static boolean IsRanage(String startTime,String endTime)
	{
		String timeNow = DateUtils.shorttimeformat.format(new Date());
		return (!StringUtils.isBlank(startTime)&&timeNow.compareTo(startTime)>=0)
				||(!StringUtils.isBlank(endTime)&&endTime.compareTo(timeNow)>=0);
	}
}
