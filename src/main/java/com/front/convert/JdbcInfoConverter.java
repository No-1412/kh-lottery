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
import com.front.conf.SubJdbcConfig;
 
 

 

@Component
@ConfigurationPropertiesBinding
public class JdbcInfoConverter implements Converter<String, SubJdbcConfig> {

	private Logger logger =LoggerFactory.getLogger(RedisInfoConverter.class);
	
	
	@Override
	public SubJdbcConfig convert(String source) {
		logger.info("source:{}",source);
		String[] arr = StringUtils.split(source);
		Map<String,String>map = new HashMap<>();
		for(String str:arr)
		{
			//String[]obj =StringUtil.split(str,":");
			map.put(StringUtils.substringBefore(str, ":"), StringUtils.substringAfter(str, ":"));
		}
		return JsonUtil.map2Object(map, SubJdbcConfig.class);
	}

}
