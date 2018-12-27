package com.front.algor;

import java.util.ArrayList;
import java.util.BitSet;

public class Combination {
	
	private ArrayList<String> combList= new ArrayList<String>();

	public int mn(Integer[] array, int n) {
		int sum = 0;
		int m = array.length;
		if (m < n)
			throw new IllegalArgumentException("Error   m   <   n");
		BitSet bs = new BitSet(m);
		for (int i = 0; i < n; i++) {
			bs.set(i, true);
		}
		do {
			sum +=calc(array, bs);
		} while (moveNext(bs, m));
        return sum;
	}
	/**
	 * 1、start 第一个true片段的起始位，end截止位
	 * 2、把第一个true片段都置false
	 * 3、数组从0下标起始到以第一个true片段元素数量减一为下标的位置都置true
	 * 4、把第一个true片段end截止位置true
	 * 
	 * @param bs 数组是否显示的标志位
	 * @param m 数组长度
	 * @return boolean 是否还有其他组合
	 */
	private boolean moveNext(BitSet bs, int m) {
		int start = -1;
		while (start < m)
			if (bs.get(++start))
				break;
		if (start >= m)
			return false;

		int end = start;
		while (end < m)
			if (!bs.get(++end))
				break;
		if (end >= m)
			return false;
		for (int i = start; i < end; i++)
			bs.set(i, false);
		for (int i = 0; i < end - start - 1; i++)
			bs.set(i);
		bs.set(end);
		return true;
	}
	
	/**
	 * 输出生成的组合结果
	 * 
	 * @param array 数组
	 * @param bs 数组元素是否显示的标志位集合
	 */
	private int calc(Integer[] array, BitSet bs) {
		int sum = 1;
		//StringBuffer sb = new StringBuffer();
		for (int i = 0; i < array.length; i++)
			if (bs.get(i)) {
				sum*=array[i];
			}
		//sb.setLength(sb.length() - 1);
		//System.out.println(sb.toString());
		//combList.add(sb.toString());
		return sum;
	}
	
	public ArrayList<String> getCombList() {
		return combList;
	}

	public static void main(String[] args) throws Exception { 
		 Combination comb = new Combination();  
	      //int result = comb.mn(new int[]{1,2,3,4,10}, 4); 
	        //System.out.println(result);
	}
	
}