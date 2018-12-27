package com.front.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import com.front.constant.ReportConstant;
import com.front.service.ReportService;

/**
 * 在线客服帮助
 * @author GusonYang
 *
 */
@Controller
public class OnlineCustomerController extends BaseController{

	@Autowired
	private ReportService reportService;
	
    @RequestMapping("/online/customer")
    public String onlineCustomer(ModelMap modelMap)  throws Exception{
        modelMap.put("customerLink", this.reportService.queryCmsConf(ReportConstant.CUSTOMER_SERVICE_LINK));
        return "onlineCustomer/onlineCustomer";
    }
}
