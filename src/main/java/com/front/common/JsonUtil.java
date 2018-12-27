package com.front.common;

import java.util.List;
import java.util.Map;
 
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.SerializerFeature;
 
/**
 * 
 * @author Administrator
 *
 */
public class JsonUtil {

	private static Logger logger = LoggerFactory.getLogger(JsonUtil.class);

	private static SerializerFeature[] serializerFeature = { SerializerFeature.PrettyFormat,
			SerializerFeature.WriteMapNullValue, SerializerFeature.WriteNullStringAsEmpty,
			SerializerFeature.DisableCircularReferenceDetect, SerializerFeature.WriteNullListAsEmpty };

	/**
	 * 对象转JSON
	 * 
	 * @param o
	 * @return
	 */
	public static String object2String(Object o) {
		if (o == null)
			return null; 
		return JSON.toJSONString(o, serializerFeature);
	}

	/**
	 * map转换为对像
	 * 
	 * @param s
	 * @param clz
	 * @return
	 */
	public static <T> T map2Object(Map s, Class<T> clz) {
		return JSON.parseObject(object2String(s), clz);
	}

	/**
	 * json串转换为对象
	 * 
	 * @param s
	 * @return
	 */
	public static Object str2Object(String s) {
		if (StringUtils.isEmpty(s))
			return null;

		if (!s.startsWith("{")) {
			if (s.startsWith("["))
				return JSONArray.parseArray(s);
			else
				return s;
		}

		return JSONObject.parseObject(s);
	}

	/**
	 * 转换类型
	 * 
	 * @param s
	 * @param clz
	 * @return
	 */
	public static <T> T str2Object(String jsonStr, Class<T> clz) {
		if (StringUtils.isBlank(jsonStr)) {
			logger.error("json is null,param error!");
			return null;
		}
		return (T) JSON.parseObject(jsonStr, clz);
	}

	/**
	 * 
	 * @param jsonStr
	 * @param clz
	 * @return
	 */
	public static <T> List<T> str2List(String jsonStr, Class<T> clz) {
		if (StringUtils.isBlank(jsonStr)) {
			logger.error("json is null,param error!");
			return null;
		}
		return JSON.parseArray(jsonStr, clz);
	}
}
