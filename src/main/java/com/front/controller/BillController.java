package com.front.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import com.front.common.StringUtils;
import com.front.constant.FrontConstant;
import com.front.model.PageModel;
import com.front.model.User;

/**
 * 帐变报表
 * 
 * @author GusonYang
 * 
 */
@Controller
public class BillController extends BaseController {

	@RequestMapping("/content/bill/info")
	public String Info(ModelMap modelMap) throws Exception {
		return "bill/billinfo";
	}

	@RequestMapping("/bill/pagingBillInfo")
	public void pagingBillInfo(HttpServletRequest req,HttpServletResponse response, ModelMap map) throws Exception 
	{ 
	    try
   	    {
	     Map<String,Object>param = this.buildQueryMap(req);	
	  	 User user = super.getLoginUserObject(); 
	  	 param.put("uid", user.getId());
	  	 PageModel pg = new PageModel();
	  	 pg.setList(this.reportService.getReportResult("pagingBillInfo", param));
         pg.setTotalItem(1);
         pg.setPageIndex(1);
   	     this.renderMsg(response, FrontConstant.SUCCESS_CODE, StringUtils.EMPTY, pg.toMap());
   	    }catch (Exception e) 
   	    {
   	 	 this.renderMsg(response, FrontConstant.FAILED_CODE, e.getMessage(), StringUtils.EMPTY);
		}
	}
}
