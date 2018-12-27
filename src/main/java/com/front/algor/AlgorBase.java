package com.front.algor;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

public abstract class AlgorBase {

	static String moveStr(String a){
		String h = "";
		String k = "01";
		String b = "";
		String f = "";
		String j = "";
		Boolean g = false;
		Boolean c = false;
		for(int e = 0 ; e < a.length();e++){
			if(g == false){
				h += a.substring(e, (e+1));
			}
			if(g == false && a.substring(e, (e+1)).equals("1") ){
				c = true;
			}else{
				if(g == false && c== true && a.substring(e, (e+1)).equals("0") ){
					g = true;
				}else{
					if(g == true){
						b += a.substring(e, (e+1));
					}
				}
			}
		}
		h = h.substring(0, h.length() - 2);
		for(int d=0;d<h.length();d++){
			if(h.substring(d, (d+1)).equals("1") ){
				f += h.substring(d, (d+1));
			}else{
				if(h.substring(d, d+1).equals("0") ){
					j += h.substring(d, (d+1));
				}
			}
		}
		h = f + j;
		return h + k + b;
	}
	
	/**
	 * @description 排列总数
	 * @param {Int}
	 *            n 总数
	 * @param {Int}
	 *            m 组合位数
	 * 
	 * @return {Int}
	 * @example Math.C(6,5);
	 * 
	 */
	Integer C(int n, int m){
		int n1 = 1;
		int n2 = 1;
		int i = n;
		int j = 1;
		for(;j<=m;n1 *= i--,n2 *= j++){}
		return n1 / n2;
	}
	
	
	/**
	 * @description 组合总数
	 * @param {Int}
	 *            n 总数
	 * @param {Int}
	 *            m 组合位数
	 * 
	 * @return {Int}
	 * @example Math.P(5,3); 60
	 * 
	 */
	Integer P(int n , int m){
		int n1 = 1;
		int n2 = 1;
		int i = n;
		int j = 1;
		for(;j<=m;n1 *= i--,n2 *= j++){}
		return n1;
	}

	/**
	 * 根据数字选择和位数判断，得出注数
	 * @param c
	 * @param b
	 * @returns
	 */
	Integer Com(int c , int b){
		if(b < 0 || c < 0){
			return 0;
		}
		if(b == 0 || c ==0){
			return 1;
		}
		if(b > c){
			return 0;
		}
		if(b > c / 2){
			b = c -b;
		}
		int a = 0;
		for(int i = c ; i >= (c-b+1);i--){
			a += Math.log(i);
		}
		for(int i = b;i>=1;i--){
			a -= Math.log(i);
		}
		a = (int)Math.exp(a);
		return Math.round(a);
	}
	
	/**
	 * 
	 * @param o
	 * @param c
	 * @return
	 */
	String[] getRs (int [] o, int  c){
		int l = o.length;
		String[] r = null;
		int[] f = new int[0];
		if(c > l){
			return new String[0];
		}
		if(c == 1){
			r = new String[o.length];
			for(int i =0;i < o.length; i++){
				r[i] = o[i] + "";
			}
			return r;
		}
		if(l == c){
			r = new String[1];
			StringBuffer sb = new StringBuffer();
			for(int i=0;i<o.length;i++){
				if(i == (o.length -1) ){
					sb.append(o[i] + ",");
				}else{
					sb.append(o[i]);
				}
			}
			r[0] = sb.toString();
			return r;
		}
		String a = "";
		String b = "";
		String s = "";

		for(int g = 0; g < c ; g++){
			a += "1";
			b += "1";
		}
		for(int e =0; e < l -c ; e++){
			a += "0";
		}
		for(int d = 0; d < c ; d++){
			s += o[d] + ",";
		}

		List<Object> r1 = new ArrayList<Object>();
		r1.add(s.substring(0, s.length() - 1));
		int h = 1;
		s = "";
		while( !a.substring(a.length() - c , (a.length() - c) + c).equalsIgnoreCase(b) ){
			a = moveStr(a);
			for(int d = 0; d < l; d++){
				if(a.substring(d, (d+1)).equals("1") ){
					s += o[d] + ",";
				}
			}
			r1.add(s.substring(0, s.length() - 1));
			s = "";
			h ++;
		}
		
		r = new String[r1.size()];
		for(int y = 0 ; y<r1.size() ; y++){
			r[y] = (String)r1.get(y);
		}
		return r;
	}
}
