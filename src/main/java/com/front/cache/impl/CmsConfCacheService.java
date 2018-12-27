package com.front.cache.impl;

import java.util.Map;

import org.springframework.stereotype.Service;

import com.front.cache.AbstractCacheService;
import com.front.common.JsonUtil;
import com.front.constant.ReportConstant;
import com.front.redis.RedisService;

@Service("cmsConfCacheService")
public class CmsConfCacheService extends AbstractCacheService{

	private static final String CONFIG_KEY="configBo:";
	
	private String getCacheKey(Map<String, Object> query)
	{
		StringBuilder sb = new StringBuilder();
		sb.append(CONFIG_KEY).append(query.get(ReportConstant.QUERY_CMS_CONF_PARAM));
		return sb.toString();
	}
	
	
	@Override
	public void setCache(Map<String, Object> query, Object data) throws Exception 
	{
		RedisService.getRedisService().set(this.getCacheKey(query), JsonUtil.object2String(data));
	}

	@Override
	public Object getCache(Map<String, Object> query) throws Exception {
		String str = RedisService.getRedisService().get(this.getCacheKey(query));
		return JsonUtil.str2Object(str, Map.class);
	}

}
