package com.front.cache.impl;

import java.util.Map;

import org.springframework.stereotype.Service;

import com.front.cache.AbstractCacheService;
import com.front.common.JsonUtil;
import com.front.redis.RedisService;

@Service(value="commonCacheService")
public class DefaultCacheService extends AbstractCacheService {

	@Override
	public void setCache(Map<String, Object> query, Object data)
			throws Exception {
		RedisService.getRedisService().set(this.getName(), JsonUtil.object2String(data));	
	}

	@Override
	public Object getCache(Map<String, Object> query) throws Exception {
		String str = RedisService.getRedisService().get(this.getName());
		return JsonUtil.str2Object(str, Map.class);
	}

}
