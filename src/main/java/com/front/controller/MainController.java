package com.front.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import com.front.common.StringUtils;
import com.front.constant.ReportConstant;

@Controller
public class MainController extends BaseController {

	@RequestMapping(value = "/index")
	public String index(HttpServletRequest req, ModelMap map) throws Exception {
//		String colsingSwitch = this.reportService.queryCmsConf(ReportConstant.CLOSING_SWITCH);
//		if (StringUtils.equals(colsingSwitch, "N")) {
//			map.put("closingAn", this.reportService.queryCmsConf(ReportConstant.CLOSING_AN));
//			return "index-ex";
//		}
		return "index";
	}
}
