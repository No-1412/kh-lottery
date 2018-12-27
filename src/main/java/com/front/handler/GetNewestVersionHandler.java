package com.front.handler;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.front.common.JsonUtil;
import com.front.common.StringUtils;
import com.front.report.RepDataHandlerService;
import com.google.common.collect.Maps;

@Component(value = "getNewestVersionHandler")
/**
 * 
 * @desc 获取最新的APP版本信息
 * @author lingdian
 *
 */
public class GetNewestVersionHandler implements RepDataHandlerService {

	@Override
	public Object handlerRepData(List<Map<String, Object>> srcData, Map<String, Object> query) throws Exception {
		Map<String, Object> result = Maps.newHashMap();
		if (srcData != null && !srcData.isEmpty()) {
			Map<String, Object> src = srcData.get(0);
			result.put("title", src.get("title")); // 更新标题
			result.put("publishDate", src.get("publishDate")); // 更新发布日期
			String content = StringUtils.obj2String(src.get("content"));
			if (StringUtils.isNotBlank(content)) {
				Map<String,Object> contentMap=JsonUtil.str2Object(content, Map.class);
				result.putAll(contentMap); 
			}
		}
		return result;
	} 
}
