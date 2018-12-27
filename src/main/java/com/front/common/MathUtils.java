package com.front.common;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

public class MathUtils {
	
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
	public static int C(int n, int m){
		int n1 = 1, n2 = 1;
		for (int i = n, j = 1; j <= m; n1 *= i--, n2 *= j++) {
		}
		return n1 / n2;
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
	public static int P(int n, int m){
		int n1 = 1, n2 = 1;
		for (int i = n, j = 1; j <= m; n1 *= i--, n2 *= j++) {
		}
		return n1;
	}
	
	
	public static void NewN1Cb(List codes, String code, int idx, ArrayList<String> arr, int len){
		if(idx >= codes.size()){
			return;
		}
		String[] codeArr = (String[])codes.get(idx);
		idx++;
		if(codeArr == null || codeArr.length == 0) return;
		
		for(int i = 0; i < codeArr.length; i++){
			String newCode;
			String curCode = codeArr[i];
			if(code == null){
				newCode = curCode;
			}else{
				if(code.indexOf(curCode) != -1){
					continue;
				}
				newCode = code+' '+curCode;
			}
			if(idx == len){
				arr.add(newCode);
			}
			NewN1Cb(codes, newCode, idx, arr, len);
		}
	}
	
	public static int NewN1(List codes,int len){
		ArrayList<String> arr = new ArrayList<String>();
		
		NewN1Cb(codes, null, 0, arr, len);
		return arr.size();
	}
	
	public static int NewN1ByStringCode(String codes,int len){
		List codeList = new ArrayList();
		String[] codeArr = codes.split(",");
		for(int i = 0; i < codeArr.length; i++){
			codeList.add(codeArr[i].split(" "));
		}
		return NewN1(codeList,len);
	}
	
	public static int dwd(String codes){
		int length =0;
		String[] codeArr = codes.split(",");
		for(int i = 0; i < codeArr.length; i++){
			if(!StringUtils.equals(codeArr[i], "*"))
			{
				length+= codeArr[i].split(" ").length;
			}
		}
		return length;
	}
	
	public static String moveStr(String a){
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
	 * 根据数字选择和位数判断，得出注数
	 * @param c
	 * @param b
	 * @returns
	 */
	public static Integer Com(int c , int b){
		if(b < 0 || c < 0){
			return 0;
		}
		if(b == 0 || c ==0){
			return 1;
		}
		if(b > c){
			return 0;
		}
		if(b > (c / 2) ){
			b = c -b;	
		}
		double a = 0;
		for(int i = c ; i >= (c-b+1);i--){
			a += Math.log(i);
		}
		for(int i = b;i>=1;i--){
			a -= Math.log(i);
		}
		a = Math.exp(a);
		return new Long(Math.round(a)).intValue();
	}
	
	
	
	/**
	 * 
	 * @param o
	 * @param c
	 * @return
	 */
	public static String[] getRs (int [] o, int  c){
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
	
	/**
	 * 
	 * @param o
	 * @param c
	 * @return
	 */
	public static String[] getRs (List<java.lang.Integer> o, int  c){
		int l = o.size();
		String[] r = null;
		int[] f = new int[0];
		if(c > l){
			return new String[0];
		}
		if(c == 1){
			r = new String[o.size()];
			for(int i =0;i < o.size(); i++){
				r[i] = o.get(i)+ "";
			}
			return r;
		}
		if(l == c){
			r = new String[1];
			StringBuffer sb = new StringBuffer();
			for(int i=0;i<o.size();i++){
				if(i == (o.size() -1) ){
					sb.append(o.get(i) + ",");
				}else{
					sb.append(o.get(i));
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
			s += o.get(d)+ ",";
		}

		List<Object> r1 = new ArrayList<Object>();
		r1.add(s.substring(0, s.length() - 1));
		int h = 1;
		s = "";
		while( !a.substring(a.length() - c , (a.length() - c) + c).equalsIgnoreCase(b) ){
			a = moveStr(a);
			for(int d = 0; d < l; d++){
				if(a.substring(d, (d+1)).equals("1") ){
					s += o.get(d) + ",";
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
	
   //求两个数组的交集   
   public static List intersect(Object[] arr1, Object[] arr2) {   
       Map<String, Boolean> map = new HashMap<String, Boolean>();   
       LinkedList<String> list = new LinkedList<String>();   
       for (Object str : arr1) {   
           if (!map.containsKey(str)) {   
               map.put(str.toString(), Boolean.FALSE);   
           }   
       }   
       for (Object str : arr2) {   
           if (map.containsKey(str)) {   
               map.put(str.toString(), Boolean.TRUE);   
           }   
       }
 
       for (Entry<String, Boolean> e : map.entrySet()) {   
           if (e.getValue().equals(Boolean.TRUE)) {   
               list.add(e.getKey());   
           }   
       }   
 
       return list;   
   }  
	
	public static void main(String[] args) {
		List codes = new ArrayList();
		codes.add(new String[]{"01", "02"});
		codes.add(new String[]{"01", "02", "03"});
		
		System.out.println(NewN1ByStringCode("01 02,01 02 03", 2));
    }
 
}
