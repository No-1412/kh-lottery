package com.front.cache;

import java.util.Map;

/****
 * 
 *  定义缓存的接口
 * @author huang
 *
 */
public interface FrontCacheService {

	 /***
	  * @param query 查询的条件
	  * @param data 查询的数据
	  */
	 public void setCache(Map<String,Object>query,Object data)throws Exception;
	 
	 /***
	  * @param query 查询的条件
	  * @param data 查询的数据
	  */
	 public Object getCache(Map<String,Object>query)throws Exception;
}
