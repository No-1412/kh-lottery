package com.front.common;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

public class JsonObjectUtils {

	/***
	 * 
	 * @param src
	 * @param key
	 * @param defaultValue
	 * @return
	 */
	public static Object getJsonObject(JsonObject src,String key,Object defaultValue)
	{
		if(src!=null&&!src.isJsonNull())
		{
			JsonElement el= src.get(key);
			if(el!=null&&!el.isJsonNull())
			{
				 return el.getAsString();
			} 
		}
		return defaultValue;
	}
	
	/***
	 * 
	 * @param src
	 * @param key
	 * @return
	 */
	public static Object getJsonObject(JsonObject src,String key)
	{
	     return getJsonObject(src, key, StringUtils.EMPTY);
	}
	
	/***
	 * 
	 * 将jsonObject转化为map结构
	 * @param src
	 * @return
	 */
	public static Map<String,Object>jsonObject2Map(JsonObject src)
	{ 
		Map<String,Object>result= new HashMap<String, Object>();
		Iterator<Entry<String, JsonElement>>iter= src.entrySet().iterator();
		Entry<String, JsonElement>entry= null;
		JsonElement el =null;
		while(iter.hasNext())
		{
			entry =  iter.next();
			el = entry.getValue();
			if(el!=null&&!el.isJsonNull())
			{
				if(el.isJsonArray())
				{
					result.put(entry.getKey(), jsonObject2List(el.getAsJsonArray()));
				}
				else if(el.isJsonObject())
				{
					result.put(entry.getKey(), jsonObject2Map(el.getAsJsonObject()));
				}
				else
				{
					result.put(entry.getKey(),el.getAsString() );
				}
			}
		}
		return result;
	}
	
	
	/***
	 * 
	 * 将jsonObject转化为map结构
	 * @param src
	 * @return
	 */
	public static List<Map<String,Object>>jsonObject2List(JsonArray arr)
	{ 
		List<Map<String,Object>>result= new ArrayList<Map<String,Object>>();
	    if(arr!=null&&!arr.isJsonNull())
	    {
	    	Iterator<JsonElement>iter= arr.iterator();
	    	while(iter.hasNext())
	    	{
	    		 result.add(jsonObject2Map(iter.next().getAsJsonObject()));
	    	}
	    }
		return result;
	}
	
	
	/***
	 * 
	 * @param el
	 * @return
	 */
	public static Object getObject(JsonElement el)
	{
		if(el!=null&&!el.isJsonNull())
		{
			 if(el.isJsonArray())
			 {
				 return jsonObject2List(el.getAsJsonArray());
			 }
			 else if(el.isJsonObject())
			 {
				 return jsonObject2Map(el.getAsJsonObject());
			 }
			 return el.getAsString();
		}
		return null;
	}
}
