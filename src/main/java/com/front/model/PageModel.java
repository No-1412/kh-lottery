/**
 * PageModel.java	  V1.0   2013-12-31 下午2:03:04
 *
 * Copyright GTA Information System Co. ,Ltd. All rights reserved.
 *
 * Modification history(By    Time    Reason):
 * 
 * Description:
 */

package com.front.model;

import java.io.Serializable; 
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.google.common.collect.Lists;
import com.google.gson.Gson;

/***
 * 
 * @author hongwu.huang
 *
 */
public class PageModel implements Serializable{ 
	
	// 当前页码 
	private static ThreadLocal<Integer>pageIndex = new ThreadLocal<Integer>();
	
	// 当前页大小
	private static ThreadLocal<Integer>pageSize = new ThreadLocal<Integer>();
	
	/***
	 * 
	 * @return
	 */
	public List getPageList()
	{
		List result = new ArrayList();
		int totalPage = this.getTotalPage();
		for(int i=1;i<=totalPage;i++)
		{
			result.add(i);
		}
		return result;
	}
	
	public int getTotalPage() {
		return (int)Math.ceil((double)this.totalItem/this.getPageSize());
	}
	
	/**
	 * 
	 * @return
	 */
	public int getPageIndex() {
		return pageIndex.get();
	}
	
	/***
	 * 
	 * @return
	 */
	public int getPageSize() {
		return pageSize.get();
	}
	
	//分页的数据 
	private List list;
	
	//总页数 
	private int totalItem;
	
	
	public void setTotalItem(int totalItem) {
		this.totalItem = totalItem;
	}
	
	public int getTotalItem() {
		return totalItem;
	}
	
	public void setList(List list) {
		this.list = list;
	}
	
	public void setList(Object obj) {
		if(obj instanceof Collection)
		{
			this.list = Lists.newArrayList((Collection)obj);
		}
		
	}
	
	
	
	public List getList() {
		return list;
	} 
	
	/***
	 * 
	 * 设置当前的页码 
	 * @param row
	 */
	public void setPageIndex(int row)
	{
		pageIndex.set(row);
	}
	
	/***
	 * 设置页大小 
	 * @param total
	 */
	public void setPageSize(int total)
	{
		pageSize.set(total);
	}
	
	/***
	 * 
	 * @return
	 */
	public Map<String,Object> toMap()
	{
		Map<String,Object>result= new HashMap<String, Object>();
		result.put("total", this.getTotalItem());
		result.put("list", this.getList());
		result.put("pageIndex", this.getPageIndex());
		return result;
	}
}
