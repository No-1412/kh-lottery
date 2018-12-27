package com.front.cache.impl;

import java.util.Map;

import org.springframework.stereotype.Service;

import com.front.cache.AbstractCacheService;
import com.front.common.JsonUtil;
import com.front.common.StringUtils;
import com.front.redis.RedisService;

@Service(value="lotteryCacheService")
/**
 *  repCode getLotteryByHash 缓存彩票及其对应的玩法组
 * @author huang
 *
 */
public class LotteryCacheService extends AbstractCacheService{

	 private static final String cache_key ="hash";
	
	@Override
	public void setCache(Map<String, Object> query, Object data) throws Exception
	{
		String hash = StringUtils.obj2String(query.get(cache_key));//存储彩票的唯一标识
		RedisService.getRedisService().set(hash, JsonUtil.object2String(data));
	}

	@Override
	public Object getCache(Map<String, Object> query) throws Exception {
		String hash = StringUtils.obj2String(query.get(cache_key));
		String str = RedisService.getRedisService().get(hash);
		return JsonUtil.str2List(str, Map.class);
	}

}
