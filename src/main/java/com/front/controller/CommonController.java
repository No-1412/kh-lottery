package com.front.controller;

 
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller; 
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.front.common.StringUtils;
import com.front.constant.FrontConstant; 

@Controller
public class CommonController extends BaseController{

	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping(value = { "/common/{repCode}" }, method = { RequestMethod.GET })
	public void common(HttpServletRequest req, HttpServletResponse resp,
			 @PathVariable("repCode") String repCode) throws Exception { 
		Map param =  buildQueryMap(req); 
		renderMsg(resp, FrontConstant.SUCCESS_CODE, StringUtils.EMPTY, this.reportService.getReportResult(repCode, param));
	}
}
