package com.front.redis;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.annotation.PreDestroy;

import org.apache.commons.pool2.impl.GenericObjectPoolConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.front.common.StringUtils;

import redis.clients.jedis.JedisPoolConfig;

/**
 * 
 * @author lingdian
 *
 */
public class CmsRedisFactory {

	private static String DEFAULT_REDIS_POOL = "default_redis_pool";

	private static Logger logger = LoggerFactory.getLogger(CmsRedisFactory.class);

	private static Map<String, CmsJedisPool> jedisCacheMap = new HashMap<>();

	private static Map<String, RedisService> redisServiceCache = new ConcurrentHashMap<>();

	private CmsRedisFactory() {

	}

	/**
	 * 
	 * @author Administrator
	 *
	 */
	private static class MhsRedisFactoryHodler {
		private static CmsRedisFactory instance = new CmsRedisFactory();
	}

	/**
	 * 
	 * @return
	 */
	public static CmsRedisFactory getInstance() {
		return MhsRedisFactoryHodler.instance;
	}

	/**
	 * @desc 废弃  直接调用 RedisService.getRedisService()
	 * @return
	 */
	@Deprecated
	public RedisService getRedisService() {
		if (redisServiceCache.containsKey(DEFAULT_REDIS_POOL)) {
			return redisServiceCache.get(DEFAULT_REDIS_POOL);
		}
		CmsJedisPool pool = getDefaultRedisPool();
		RedisService redisService = RedisService.newRedisService(pool);
		redisServiceCache.putIfAbsent(DEFAULT_REDIS_POOL, redisService);
		return redisService;
	}
	
	
	/**
	 * @desc 废弃  直接调用 RedisService.getRedisService(name)
	 * @return
	 */
	@Deprecated
	public RedisService getRedisService(String name) {
		if (redisServiceCache.containsKey(name)) {
			return redisServiceCache.get(name);
		}
		CmsJedisPool pool = getRedisPool(name);
		RedisService redisService = RedisService.newRedisService(pool);
		redisServiceCache.putIfAbsent(name, redisService);
		return redisService;
	}

	/**
	 * 
	 * @param config
	 */
	public void init(CmsRedisBean config) {
		List<CmsRedisInfo> redisInfos = config.getRedisInfos();
		if (redisInfos != null && !redisInfos.isEmpty()) {
			JedisPoolConfig conf = new JedisPoolConfig();
			conf.setLifo(true);
			conf.setMaxIdle(config.getMaxIdle());
			conf.setMinIdle(config.getMinIdle());
			conf.setMaxTotal(config.getMaxActive());
			conf.setBlockWhenExhausted(false);
			conf.setTestOnBorrow(config.isTestOnBorrow());
			conf.setTestOnReturn(config.isTestOnReturn());
			conf.setTestOnCreate(true);
			conf.setMaxWaitMillis(config.getMaxWait());
			for (CmsRedisInfo redisInfo : redisInfos) {
				initRedisPool(conf, redisInfo, config.getTimeout());
			}
		}
	}

	/**
	 * 
	 * @param config
	 * @param redisInfo
	 * @param timeOut
	 */
	private void initRedisPool(GenericObjectPoolConfig config, CmsRedisInfo redisInfo, int timeOut) {
		CmsJedisPool jedisPool = new CmsJedisPool(config, redisInfo.getHost(), redisInfo.getPort(), timeOut,
				redisInfo.getAuthKey());
		jedisPool.setDefault(redisInfo.isDefault());
		jedisPool.setName(redisInfo.getName());
		String name = redisInfo.getName();
		logger.info("initRedisPool:{}", name);
		jedisCacheMap.put(name, jedisPool);
	}

	/**
	 * 
	 * @param name
	 */
	private CmsJedisPool getRedisPool(String name) {
		for (CmsJedisPool redisPool : jedisCacheMap.values()) {
			if (StringUtils.equals(name, redisPool.getName())) {
				return redisPool;
			}
		}
		return getDefaultRedisPool();
	}

	/**
	 * 
	 * @return
	 */
	private CmsJedisPool getDefaultRedisPool() {
		for (CmsJedisPool redisPool : jedisCacheMap.values()) {
			if (redisPool.isDefault()) {
				return redisPool;
			}
		}
		logger.error("not found defaultRedisPool");
		return null;
	}

	/**
	 * 
	 */
	@PreDestroy
	public static void destory() {
		for (CmsJedisPool jedisPool : jedisCacheMap.values()) {
			if (jedisPool != null && !jedisPool.isClosed()) {
				jedisPool.close();
			}
		} 
	} 
}
