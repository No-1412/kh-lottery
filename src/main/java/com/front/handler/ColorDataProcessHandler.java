package com.front.handler;

 
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component; 

import com.front.common.StringUtils;
import com.front.report.RepDataHandlerService;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;

@Component(value = "colorDataHandler")
public class ColorDataProcessHandler implements RepDataHandlerService{

	@Override
	public Object handlerRepData(List<Map<String, Object>> srcData, Map<String, Object> query) throws Exception 
	{
		List result = Lists.newArrayList();
	    if(srcData!=null&&!srcData.isEmpty())
	    {
	    	 Map<String,Object>map = Maps.newHashMap();
	    	 String lotteryType=null;
	    	 Map<String,Object>temp =null;
	    	 List lotteryList =null;
	    	 for(Map<String, Object> data:srcData)
	    	 {
	    		  lotteryType=StringUtils.obj2String(data.get("lotteryType"));
	    		  if(map.containsKey(lotteryType))
	    		  {
	    			 temp=(Map<String,Object>)map.get(lotteryType);
	    			 ((List)temp.get("lotteryList")).add(data);
	    		  }
	    		  else
	    		  {
	    			  temp = Maps.newHashMap();
	    			  lotteryList = Lists.newArrayList();
	    			  lotteryList.add(data);
	    			  temp.put("lotteryList", lotteryList);
	    			  map.put(lotteryType, temp);
	    			  result.add(temp);
	    		  }
	    	 }
	    }
		return result;
	}

}
