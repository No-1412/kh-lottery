package com.front.handler;

import java.text.MessageFormat;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component; 
import com.front.common.StringUtils;
import com.front.constant.FrontConstant;
import com.front.constant.UserConstant;
import com.front.exception.FrontException;
import com.front.model.User;
import com.front.report.RepDataHandlerService;
import com.front.service.UserService;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@Component(value= "proxyRebateLimitHandler")
public class ProxyRebateLimitHandler implements RepDataHandlerService{

	@Autowired
	private UserService userService;
	
	@Override
	public Object handlerRepData(List<Map<String, Object>> srcData, Map<String, Object> query) throws Exception
	{
		String OpType =StringUtils.obj2String(query.get(UserConstant.PROXY_OPERATION_TYPE));
		if(srcData!=null&&!srcData.isEmpty())
		{
		String rebate = query.get("rebate")+"";
		JsonParser parser= new JsonParser();
		if(StringUtils.equals(OpType, UserConstant.CREATE_PROXY))
		{ 
				Map<String, Object> temp = null;
				Iterator<Map<String, Object>>iter= srcData.iterator();
				while(iter.hasNext())
				{
					temp = iter.next();
					if(StringUtils.equals(rebate, temp.get("fanDian")+""))
					{
						String rule = StringUtils.obj2String(temp.get("rule")) ;
						if(!StringUtils.isBlank(rule))
						{
							JsonObject obj = parser.parse(rule).getAsJsonObject();
							Iterator<Entry<String, JsonElement>>iterator=  obj.entrySet().iterator();
							Entry<String, JsonElement>entry = null;
							while(iterator.hasNext())
							{
								 entry = iterator.next();
								 if(StringUtils.equals(entry.getKey(), rebate))
								 {
									 int count = entry.getValue().getAsInt();
									 if(StringUtils.str2Int(temp.get("ucount"))>=count)
									 {
										  throw new FrontException(FrontConstant.FAILED_CODE+"", 
												  MessageFormat.format(UserConstant.PROXY_REBATE_LIMIT_EX, 
														  1960 -(0.13-StringUtils.str2Double(rebate))*2000));
									 }
								 }
							} 
						}
						break;
					}
				} 
		}
		else if(StringUtils.equals(OpType, UserConstant.UPDATE_PROXY))
		{
			  int userId  = StringUtils.str2Int(query.get("userId"));
			  User user = userService.findByID(userId);
			  if(!StringUtils.equals(rebate, user.getFandian()+""))//未修改返点
			  {
					Map<String, Object> temp = null;
					Iterator<Map<String, Object>>iter= srcData.iterator();
					while(iter.hasNext())
					{
						temp = iter.next();
						if(StringUtils.equals(rebate, temp.get("fanDian")+""))
						{
							String rule = StringUtils.obj2String(temp.get("rule")) ;
							if(!StringUtils.isBlank(rule))
							{
								JsonObject obj = parser.parse(rule).getAsJsonObject();
								Iterator<Entry<String, JsonElement>>iterator=  obj.entrySet().iterator();
								Entry<String, JsonElement>entry = null;
								while(iterator.hasNext())
								{
									 entry = iterator.next();
									 if(StringUtils.equals(entry.getKey(), rebate))
									 {
										 int count = entry.getValue().getAsInt();
										 if(StringUtils.str2Int(temp.get("ucount"))>=count)
										 {
											  throw new FrontException(FrontConstant.FAILED_CODE+"", 
													  MessageFormat.format(UserConstant.PROXY_REBATE_LIMIT_EX, 
															  1960 -(0.13-StringUtils.str2Double(rebate))*2000));
										 }
									 }
								} 
							}
							break;
						}
					} 
			
			  }
		}
		}
		return null;
	}

}
