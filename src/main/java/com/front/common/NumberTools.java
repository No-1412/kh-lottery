package com.front.common;

import java.text.DecimalFormat;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang3.math.NumberUtils;

public class NumberTools extends NumberUtils{

    private static Map<String,DecimalFormat>dfs = new HashMap<String,DecimalFormat>();
	
	/**
	 * 
	 * @param src
	 * @param pa
	 * @return
	 */
	public static  String formatNum(double src,String pa)
	{
		DecimalFormat df =null;
		if(dfs.containsKey(pa))
		{
			return dfs.get(pa).format(src);
		}
	    df = new DecimalFormat(pa);
	    dfs.put(pa, df);
	    return df.format(src);
	}
	
	
	public static void main(String[] args) {
		double b =194600;
		System.out.println(formatNum(b, "######0.0000"));
	}
}

