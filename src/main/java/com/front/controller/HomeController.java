package com.front.controller;

import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.front.common.StringUtils;
import com.front.constant.FrontConstant;
import com.front.constant.ReportConstant; 
import com.google.common.collect.Maps;
import com.google.gson.Gson;

@Controller
public class HomeController extends BaseController {

	@RequestMapping(value = "/home")
	public String home(HttpServletRequest req, ModelMap modelMap) throws Exception {
		modelMap.put("user", super.getLoginUserObject());
		modelMap.put("customerLink", this.reportService.queryCmsConf(ReportConstant.CUSTOMER_SERVICE_LINK));
		modelMap.put("colorList", reportService.getReportResult("queryColorList", Maps.newHashMap()));
		return "home";
	}

	@RequestMapping(value = "/sscList")
	public void sscList(HttpServletRequest req, HttpServletResponse response) throws Exception {
		Object obj = reportService.getReportResult("queryColorList", Maps.newHashMap());
		this.renderMsg(response, FrontConstant.SUCCESS_CODE, StringUtils.EMPTY, obj);
	}

	@RequestMapping(value = "/home/queryAwardList")
	public void queryAwardList(HttpServletRequest req, HttpServletResponse response) throws Exception {
		try { 
			this.renderMsg(response, FrontConstant.SUCCESS_CODE, StringUtils.EMPTY, this.reportService.getReportResult("queryAwardList", Maps.newHashMap()));
		} catch (Exception e) {
			this.renderMsg(response, FrontConstant.FAILED_CODE, e.getMessage(), StringUtils.EMPTY);
		}
	}

	/**
	 * 查询少量彩种
	 * 
	 * @throws SystemDBException
	 * @throws IOException
	 */
	@RequestMapping(value = "/home/queryLittleLottery", method = RequestMethod.GET)
	public void queryLittleLottery(HttpServletRequest req, HttpServletResponse resp) throws Exception {
		Map<String, Object> errInfo = new HashMap<String, Object>();
		try { 
			errInfo.put("retcode", 0);
			errInfo.put("retmsg", "ok");
			errInfo.put("data", reportService.getReportResult("queryHomePageLotteryData", Maps.newHashMap()));
		} catch (Exception e) {
			errInfo.put("retcode", -1);
			errInfo.put("retmsg", e.getMessage());
		}
		this.renderJson(resp, new Gson().toJson(errInfo));
	}
}
