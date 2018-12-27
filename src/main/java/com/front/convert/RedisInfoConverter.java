package com.front.convert;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.properties.ConfigurationPropertiesBinding;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import com.front.common.JsonUtil;
import com.front.common.StringUtils;
import com.front.redis.CmsRedisInfo;
import com.google.common.collect.Maps;

 
@Component
@ConfigurationPropertiesBinding
public class RedisInfoConverter implements Converter<String, CmsRedisInfo>{

	private Logger logger =LoggerFactory.getLogger(RedisInfoConverter.class);
	
	@Override
	public CmsRedisInfo convert(String source) {
		logger.info("source:{}",source);
		String[] arr = StringUtils.split(source);
		Map<String,String>map = Maps.newHashMap();
		for(String str:arr)
		{
			String[]obj =StringUtils.split(str,":");
			map.put(obj[0], obj[1]);
		}
		return JsonUtil.map2Object(map, CmsRedisInfo.class);
	}

}
