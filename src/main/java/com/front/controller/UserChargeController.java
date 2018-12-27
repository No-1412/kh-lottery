package com.front.controller;

import java.util.Date;
import java.util.HashMap; 
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.front.annotation.LoginRule;
import com.front.common.SiteUtil;
import com.front.common.StringUtils;
import com.front.constant.FrontConstant;
import com.front.constant.PayConstant;
import com.front.constant.ReportConstant;
import com.front.model.User;
import com.front.model.UserCharge;
import com.front.service.UserChargeService;
import com.google.common.collect.Maps;

/***
 * 
 * @author huang
 * 
 */
@Controller
public class UserChargeController extends BaseController {
	@Autowired
	private UserChargeService userChargeService;

	@RequestMapping(value = "/content/bank/recharge_submit/{chargeId}", method = RequestMethod.GET)
	public String contentRechargeSubmit(HttpServletRequest req,
			HttpServletResponse resp, ModelMap modelMap,
			@PathVariable("chargeId") String charge_id) throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("id", charge_id);
		modelMap.put("charge",
				this.reportService.querySingleResult("queryChargeDetail", map));
		return "bank/content-recharge_submit";
	}

	@RequestMapping("/content/bank/recharge")
	public String contentRecharge(ModelMap modelMap) throws Exception { 
		modelMap.put("bankList", reportService.getReportResult("queryBankList",null));
		modelMap.put("rechargeLower",reportService.queryCmsConf(ReportConstant.RECHARGE_LOWER));
		modelMap.put("rechargeUpper",reportService.queryCmsConf(ReportConstant.RECHARGE_UPPER));
		return "bank/content-recharge";
	}
	
	
	@RequestMapping("/content/toRecharge")
	public void toRecharge(HttpServletRequest req, HttpServletResponse resp) throws Exception {
		Map<String, Object>result = Maps.newHashMap();
		result.put("bankList", reportService.getReportResult("queryBankList",null));
		result.put("rechargeLower",reportService.queryCmsConf(ReportConstant.RECHARGE_LOWER));
		result.put("rechargeUpper",reportService.queryCmsConf(ReportConstant.RECHARGE_UPPER));
		this.renderMsg(resp, FrontConstant.SUCCESS_CODE, "", result);
	}
	
	
	@RequestMapping(value = "/content/recharge_submit/{chargeId}", method = RequestMethod.GET)
	@LoginRule
	public void rechargeSubmit(HttpServletRequest req,
			HttpServletResponse resp,  
			@PathVariable("chargeId") String charge_id) throws Exception {
		Map<String, Object> map = Maps.newHashMap();
		map.put("id", charge_id);
		this.renderMsg(resp, FrontConstant.SUCCESS_CODE, "", this.reportService.querySingleResult("queryChargeDetail", map) );  
	}

	@RequestMapping(value = "/bank/recharge_submit", method = RequestMethod.POST)
	public void rechargeSubmit(HttpServletRequest req, HttpServletResponse resp,ModelMap modelMap) throws Exception {
		String bank_id = req.getParameter("bank_id");
		double amount = StringUtils.str2Double(req.getParameter("amount"));
		double rechargeLower=StringUtils.str2Double(reportService.queryCmsConf(ReportConstant.RECHARGE_LOWER));
		double rechargeUpper=StringUtils.str2Double(reportService.queryCmsConf(ReportConstant.RECHARGE_UPPER));
		if(amount<rechargeLower||amount>rechargeUpper)
		{
			this.renderMsg(resp, FrontConstant.FAILED_CODE, "", "");
			return;
		}
		String onlinePayment = req.getParameter("onlinePayment");
		User user = getLoginUserObject();
		UserCharge userCharge = new UserCharge();
		userCharge.setChargeType(StringUtils.equals(onlinePayment, "Y") ? PayConstant.CHARGE_TYPE_ONLINE:PayConstant.CHARGE_TYPE_OFFLINE);
		userCharge.setUid(user.getUid());
		userCharge.setUname(user.getLoginName());
		userCharge.setAccount(amount);
		userCharge.setStatus("-1");
		userCharge.setRemark("用户充值");
		userCharge.setChargeDate(new Date());
		userCharge.setChargeIp(SiteUtil.getIpAddr());
		userCharge.setChargeAccount(Integer.valueOf(bank_id));
		userCharge.setIsDelete(0);
		userChargeService.insert(userCharge);
		this.renderMsg(resp, FrontConstant.SUCCESS_CODE, "", userCharge);
	}

}
