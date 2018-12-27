package com.front.report;

import java.util.List;
import java.util.Map;

 
/****
 * 
 * @author hongwu.huang
 *
 */
public interface RepDataHandlerService {

	  public Object handlerRepData(List<Map<String, Object>>srcData,Map<String,Object>query)throws Exception;
}
