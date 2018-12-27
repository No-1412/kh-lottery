package com.front.service;

import java.util.List;
import java.util.Map;

import com.front.exception.FrontException;
import com.front.model.PageModel;
 

public interface ReportService {

	 /***
	  * 
	  * @param repCode
	  * @param param
	  * @return
	  */
	 public Object getReportResult(String repCode,Map<String,Object>param)throws Exception;
	 
	 
	 /***
	  * 
	  * @param repCode
	  * @param param
	  * @return
	  * @throws SystemDBException
	  */
	 public PageModel pagingReportResult(String repCode,Map<String,Object>param)throws Exception;
	 
	
	 /**
	  * @desc 根据RepCode校验
	  * @param repCode
	  * @param param
	  * @return
	  * @throws SystemDBException
	  */
	 public boolean verification(String repCode,Map<String,Object>param)throws Exception;
	 
	 
	 /**
	  * 
	  * @param catalog
	  * @return
	  */
	 public Map<String,Object> querySingleResult(String repCode,Map<String,Object>param)throws Exception;
	 
	 
	 
	 /**
	  * 
	  * @param catalog
	  * @return
	  */
	 public String queryCmsSeq(String catalog);
	 
	 /**
	  * 
	  * @param catalog
	  * @return
	  */
	 public String queryCmsConf(String catalog)throws Exception;
}
