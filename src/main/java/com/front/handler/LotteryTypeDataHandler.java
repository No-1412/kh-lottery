package com.front.handler;

 
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component; 

import com.front.report.RepDataHandlerService;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;

@Component(value ="lotteryTypeHandler")
public class LotteryTypeDataHandler implements RepDataHandlerService {

	@Override
	public Object handlerRepData(List<Map<String, Object>> srcData, Map<String, Object> query) throws Exception {
		List<Map<String, Object>> list = Lists.newArrayList();
		Map<String, Object> result = Maps.newHashMap();
		if (srcData != null && !srcData.isEmpty()) {
			List<Map<String, Object>> pgs = Lists.newArrayList();
			for (Map<String, Object> src : srcData) {
				if (result.isEmpty()) {
					result.put("id", src.get("id"));
					result.put("lottery_lname", src.get("lottery_lname"));
					result.put("lottery_num", src.get("lottery_num"));
					result.put("lottery_type", src.get("lottery_type"));
					result.put("logo", src.get("logo"));
					result.put("playGroupId", src.get("playGroupId"));
					result.put("template", src.get("template"));
					result.put("singleContinueBetting", src.get("singleContinueBetting"));
				}
				src.remove("singleContinueBetting");
				src.remove("id");
				src.remove("logo");
				src.remove("lottery-type");
				src.remove("lottery_lname");
				src.remove("lottery_num");
				//src.remove("playGroupId");
				src.remove("template");
				pgs.add(src);
			}
			result.put("playGroups", pgs);
		}
		if (!result.isEmpty()) {
			list.add(result);
		}
		return list;
	}

}
