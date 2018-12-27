package com.front.cache.impl;

import java.util.Map;

import org.springframework.stereotype.Service;

import com.front.cache.AbstractCacheService;
import com.front.common.JsonUtil;
import com.front.redis.RedisService;

@Service(value = "checkPlayInfoCacheService")
public class CheckPlayInfoCacheService extends AbstractCacheService {

	private static final String lotteryId = "id";

	private static final String playId = "playId";

	@Override
	public void setCache(Map<String, Object> query, Object data) throws Exception {
		StringBuilder sb = new StringBuilder();
		sb.append("checkPlayInfo:").append(query.get(lotteryId)).append("-");
		sb.append(query.get(playId));
		RedisService.getRedisService().set(sb.toString(), JsonUtil.object2String(data));
	}

	@Override
	public Object getCache(Map<String, Object> query) throws Exception {
		StringBuilder sb = new StringBuilder();
		sb.append("checkPlayInfo:").append(query.get(lotteryId)).append("-");
		sb.append(query.get(playId));
		String str = RedisService.getRedisService().get(sb.toString());
		return JsonUtil.str2List(str, Map.class);
	}

}
