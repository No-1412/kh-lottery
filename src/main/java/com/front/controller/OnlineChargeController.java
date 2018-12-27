package com.front.controller;

import java.text.DecimalFormat; 
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.front.common.DateUtils;
import com.front.common.MD5Util;
import com.front.common.OSUtil;
import com.front.common.StringUtils;
import com.front.constant.FrontConstant;
import com.front.constant.PayConstant;
import com.front.service.UserChargeService;
import com.google.common.collect.Maps;
import com.google.gson.Gson;

@Controller
public class OnlineChargeController extends BaseController implements PayConstant {

	public static Logger logger = LoggerFactory.getLogger(OnlineChargeController.class);

	@Autowired
	public UserChargeService userChargeService;

	@Value("${platform.pay.externalkey:''}")
	private String externalkey;

	@Value("${platform.pay.url:''}")
	private String payUrl;

	@Value("${platform.pay.username:''}")
	private String username;

	@Value("${platform.pay.callback:''}")
	private String payBackurl;

	@Value("${platform.pay.frontUrl:''}")
	private String frontUrl;

	@Value("${platform.pay.subject:''}")
	private String subject;


	@RequestMapping(value = "/content/bank/online_recharge/{chargeId}", method = RequestMethod.GET)
	public String contentOnlineRechargeSubmit(HttpServletRequest req, HttpServletResponse resp, ModelMap modelMap,
			@PathVariable("chargeId") String charge_id) throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("id", charge_id);
		modelMap.put("charge", this.reportService.querySingleResult("queryChargeDetail", map));
		modelMap.put("chargeDate", DateUtils.getShortDateString(new Date()));
		modelMap.put("id", charge_id);
		modelMap.put("url", payUrl);
		return "bank/content-recharge-online";
	}

	@RequestMapping(value = "/content/online_recharge/{chargeId}", method = RequestMethod.GET)
	public void toOnlineRechargeSubmit(HttpServletRequest req, HttpServletResponse resp,
			@PathVariable("chargeId") String charge_id) throws Exception {
		Map<String, Object> result = Maps.newHashMap();
		Map<String, Object> map = Maps.newHashMap();
		map.put("id", charge_id);
		result.put("charge", this.reportService.querySingleResult("queryChargeDetail", map));
		result.put("chargeDate", DateUtils.getShortDateString(new Date()));
		result.put("id", charge_id);
		result.put("url", payUrl);
		this.renderMsg(resp, FrontConstant.SUCCESS_CODE, "", result);
	}

	@RequestMapping(value = "/content/charge/onlineCharge", method = { RequestMethod.POST, RequestMethod.GET })
	public void onlineCharge(HttpServletRequest req, HttpServletResponse response, ModelMap map) throws Exception {
		Map<String, Object> charge = this.reportService.querySingleResult("queryChargeDetail", this.buildQueryMap(req));
		// billno+【订单编号】+ currencytype +【币种】+ amount +【订单金额】+ date +【订单日期】 +
		// orderencodetype +【订单支付接口加密方式】+【商户内部证书字符串】
		DecimalFormat currentNumberFormat = new DecimalFormat("#0");
		String amount = currentNumberFormat.format(StringUtils.str2Double(charge.get("amount")) * 100);
		amount = StringUtils.leftPad(amount, 12, "0");

		String code = StringUtils.obj2String(charge.get("code"));
		String chargeOrder = StringUtils.obj2String(charge.get("chargeOrder"));
		Map<String, Object> body = null;
		String reqTime = DateUtils.dateLongFormat.format(new Date());
		String txnTimeOut = DateUtils.dateLongFormat.format(new Date(new Date().getTime() + 3600 * 24 * 1000));
		String sign = null;
		Map<String, Object> head = Maps.newHashMap();
		String subUrl = ALIPAY_WECHAT_PAY_URL;
		if (StringUtils.equalsIgnoreCase(code, WECHAT_PAY_CODE)
				|| StringUtils.equalsIgnoreCase(code, ALIPAY_PAY_CODE)) {
			body = this.createAliWeChatPay(chargeOrder, amount, StringUtils.obj2String(charge.get("chargeNum")));
			sign = this.createAliWeChatPayMd5(reqTime, chargeOrder, amount,code);
			head.put("productId", code);
		} else {
			body = this.createUnionPay(chargeOrder, amount, code, txnTimeOut);
			sign = this.createUnionPayMd5(reqTime, chargeOrder, amount, txnTimeOut);
			head.put("productId", "00000007");
			subUrl =payUrl;
		}

		
		head.put("version", "1.0");
		head.put("method", "sandpay.trade.pay");
		head.put("mid", username);
		head.put("reqTime", reqTime);
		head.put("channelType", "07");

		Map<String, Object> data = Maps.newHashMap();
		data.put("head", head);
		data.put("body", body); 


		StringBuilder sb = new StringBuilder();
		sb.append("<body onload=\"document.forms['payform'].submit()\">");
		sb.append("<form id='payform' name='payform' action='").append(subUrl).append("' method='post' >");
		sb.append("<input type='hidden' name='charset' value='utf-8'/>");
		sb.append("<input type='hidden' name='data' value='" + new Gson().toJson(data) + "'/>");
		sb.append("<input type='hidden' name='sign' value='"
				+ encoder.encodeToString(MD5Util.MD5(sign).getBytes("utf-8")) + "'/>");
		sb.append("<input type='hidden' name='extend' value=''>");
		sb.append("</body>");

		this.renderPage(response, sb.toString());
	}

	
	 /**
	  * 
	  * 获取（支付宝，微信）支付参数
	  * @param orderCode
	  * @param amount
	  * @param body
	  * @return
	  */
	private Map<String, Object> createAliWeChatPay(Object orderCode, String amount, String body) {
		Map<String, Object> param = Maps.newHashMap();
		param.put("orderCode", orderCode);
		param.put("totalAmount", amount);
		param.put("subject", subject);
		param.put("body", body);
		param.put("clientIp", OSUtil.getIp());
		param.put("notifyUrl", payBackurl);
		param.put("frontUrl", frontUrl); 
		return param;
	}
	
	
	/**
	 * 
	 * @desc 获取银联支付（非支付宝，微信）
	 * @param orderCode
	 * @param amount
	 * @param code
	 * @param txnTimeOut
	 * @return
	 */
	private Map<String, Object> createUnionPay(Object orderCode, String amount, String code, String txnTimeOut) {
		Map<String, Object> body = Maps.newHashMap();
		body.put("orderCode", orderCode);
		body.put("totalAmount", amount);
		body.put("subject", subject);
		body.put("txnTimeOut", txnTimeOut);
		body.put("payMode", "bank_pc");
		body.put("clientIp", OSUtil.getIp());
		body.put("notifyUrl", payBackurl);
		body.put("frontUrl", frontUrl);
		body.put("payExtra", "{'payType':1,'bankCode':'" + code + "'}");
		return body;
	}
	
	
	/**
	 * 
	 * @param reqTime
	 * @param chargeOrder
	 * @param amount
	 * @param txnTimeOut
	 * @return
	 */
	private String createAliWeChatPayMd5(String reqTime, Object chargeOrder, String amount,String productId) {
		StringBuilder str = new StringBuilder();
		str.append("ve_" + externalkey + "_rsion").append("1.0");
		str.append("method").append("sandpay.trade.pay");
		str.append("productId").append(productId);
		str.append("mid").append(username);
		str.append("channelType").append("07");
		str.append("reqTime").append(reqTime);
		str.append("orderCode").append(chargeOrder);
		str.append("totalAmount").append(amount);
		str.append("clientIp").append(OSUtil.getIp());
		str.append("notifyUrl").append(payBackurl);
		return str.toString();
	}

	/**
	 * 
	 * @param reqTime
	 * @param chargeOrder
	 * @param amount
	 * @param txnTimeOut
	 * @return
	 */
	private String createUnionPayMd5(String reqTime, Object chargeOrder, String amount, String txnTimeOut) {
		StringBuilder str = new StringBuilder();
		str.append("ve_" + externalkey + "_rsion").append("1.0");
		str.append("method").append("sandpay.trade.pay");
		str.append("productId").append("00000007");
		str.append("mid").append(username);
		str.append("channelType").append("07");
		str.append("reqTime").append(reqTime);
		str.append("orderCode").append(chargeOrder);
		str.append("totalAmount").append(amount);
		str.append("txnTimeOut").append(txnTimeOut);
		str.append("payMode").append("bank_pc");
		str.append("clientIp").append(OSUtil.getIp());
		str.append("notifyUrl").append(payBackurl);
		return str.toString();
	}
}
