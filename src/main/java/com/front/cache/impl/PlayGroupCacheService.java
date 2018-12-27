package com.front.cache.impl;

import java.util.Map;

import org.springframework.stereotype.Service;

import com.front.cache.AbstractCacheService;
import com.front.common.JsonUtil;
import com.front.common.StringUtils;
import com.front.redis.RedisService;

@Service(value = "playGroupCacheService")
/***
 * 
 * RepCode getPlayByGroupId 缓存玩法组下面的玩法列表
 * 
 * @author huang
 *
 */
public class PlayGroupCacheService extends AbstractCacheService {

	private static final String cache_key = "groupId";

	@Override
	public void setCache(Map<String, Object> query, Object data) throws Exception {
		String id = StringUtils.obj2String(query.get(cache_key));// 存储彩票的唯一标识
		StringBuilder sb = new StringBuilder();
		sb.append("playGroupBo:").append(id);
		RedisService.getRedisService().set(sb.toString(), JsonUtil.object2String(data));
	}

	@Override
	public Object getCache(Map<String, Object> query) throws Exception {
		String id = StringUtils.obj2String(query.get(cache_key));// 存储彩票的唯一标识
		StringBuilder sb = new StringBuilder();
		sb.append("playGroupBo:").append(id);
		String str = RedisService.getRedisService().get(sb.toString());
		return JsonUtil.str2List(str, Map.class);
	}

}
