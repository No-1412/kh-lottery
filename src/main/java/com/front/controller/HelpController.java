package com.front.controller;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;


/**
 * 在线帮助
 * @author huang
 *
 */
@Controller
public class HelpController extends BaseController {

	@RequestMapping("/help/index")
	public String main(ModelMap modelMap) throws Exception {
		//this.reportService.querySingleResult("", param)
		return "help/helpMain";
	}

	@RequestMapping("/help/detail")
	public String helpDetail(HttpServletRequest req,HttpServletResponse response, ModelMap map) throws Exception 
	{ 
		return "help/helpMain";
	}
}
