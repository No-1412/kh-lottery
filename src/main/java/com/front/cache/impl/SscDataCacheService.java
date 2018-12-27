package com.front.cache.impl;

import java.util.Map;
import org.springframework.stereotype.Service;
import com.front.cache.AbstractCacheService;
import com.front.common.JsonUtil;
import com.front.redis.RedisService;
 

@Service(value="sscDataCacheService")
/***
 * queryColorList 缓存彩种以及彩种下的彩票信息 
 * @author huang
 *
 */
public class SscDataCacheService extends AbstractCacheService{

	 private static final String cache_key ="sscDataList";
	
	@Override
	public void setCache(Map<String, Object> query, Object data) throws Exception
	{
		RedisService.getRedisService().set(cache_key, JsonUtil.object2String(data));
	}

	@Override
	public Object getCache(Map<String, Object> query) throws Exception {
	   String str =  RedisService.getRedisService().get(cache_key);
	   return JsonUtil.str2List(str, Map.class);
	}

}
