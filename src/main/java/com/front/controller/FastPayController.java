package com.front.controller;

import java.text.DecimalFormat; 
import java.util.Date; 
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap; 
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.front.common.DateUtils;
import com.front.common.MD5Util;
import com.front.common.OSUtil;
import com.front.common.StringUtils; 
import com.front.constant.PayConstant;
import com.front.service.UserChargeService;
import com.google.common.collect.Maps;
import com.google.gson.Gson; 

@Controller
public class FastPayController extends BaseController implements PayConstant {

	public static Logger logger = LoggerFactory.getLogger(FastPayController.class);

	@Autowired
	public UserChargeService userChargeService;

	@Value("${platform.pay.externalkey:''}")
	private String externalkey;
 

	@Value("${platform.pay.username:''}")
	private String username;

	@Value("${platform.pay.callback:''}")
	private String payBackurl;

	@Value("${platform.pay.frontUrl:''}")
	private String frontUrl;

	@Value("${platform.fastPay.subject:charge}")
	private String subject;

  

	@RequestMapping(value = "/content/charge/fastPay", method = { RequestMethod.POST, RequestMethod.GET })
	public void fastPay(HttpServletRequest req, HttpServletResponse response, ModelMap map) throws Exception {
		Map<String, Object> charge = this.reportService.querySingleResult("queryChargeDetail", this.buildQueryMap(req));
		// billno+【订单编号】+ currencytype +【币种】+ amount +【订单金额】+ date +【订单日期】 +
		// orderencodetype +【订单支付接口加密方式】+【商户内部证书字符串】
		DecimalFormat currentNumberFormat = new DecimalFormat("#0");
		String amount = currentNumberFormat.format(StringUtils.str2Double(charge.get("amount")) * 100);
		amount = StringUtils.leftPad(amount, 12, "0");

		String userId =StringUtils.obj2String(charge.get("chargeNum"));
		String chargeOrder = StringUtils.obj2String(charge.get("chargeOrder"));
		Map<String, Object> body = Maps.newHashMap();
		String reqTime = DateUtils.dateLongFormat.format(new Date());
		String sign = this.createFastPayMd5(reqTime, chargeOrder, amount,userId);
		Map<String, Object> head = Maps.newHashMap();
		  
		body.put("userId", userId);
	    body.put("frontUrl", frontUrl);
	    body.put("notifyUrl", payBackurl);
	    body.put("orderCode", chargeOrder);
	    body.put("orderTime", reqTime);
	    body.put("totalAmount", amount);
	    body.put("body", subject);
	    body.put("subject", subject);
		
		head.put("version", "1.0");
		head.put("method", "sandPay.fastPay.quickPay.index");
		head.put("productId", "00000016");
		head.put("mid", username);
		head.put("reqTime", reqTime);
		head.put("channelType", "07");
  
		Map<String, Object> data = Maps.newHashMap();
		data.put("head", head);
		data.put("body", body); 


		StringBuilder sb = new StringBuilder();
		sb.append("<body onload=\"document.forms['payform'].submit()\">");
		sb.append("<form id='payform' name='payform' action='").append(QUICKPAY_PAY_URL).append("' method='post' >");
		sb.append("<input type='hidden' name='charset' value='utf-8'/>");
		sb.append("<input type='hidden' name='signType' value='01'/>");
		sb.append("<input type='hidden' name='data' value='" + new Gson().toJson(data) + "'/>");
		sb.append("<input type='hidden' name='sign' value='"
				+ encoder.encodeToString(MD5Util.MD5(sign).getBytes("utf-8")) + "'/>");
		sb.append("<input type='hidden' name='extend' value=''>");
		sb.append("</body>");

		this.renderPage(response, sb.toString());
	}

 

	
	/**
	 * 
	 * @param reqTime
	 * @param chargeOrder
	 * @param amount
	 * @param txnTimeOut
	 * @return
	 */
	private String createFastPayMd5(String reqTime, Object chargeOrder, String amount,String userId) {
		StringBuilder str = new StringBuilder();
		str.append("ve_" + externalkey + "_rsion").append("1.0");
		str.append("method").append("sandPay.fastPay.quickPay.index");
		str.append("productId").append("00000016");
		str.append("mid").append(username);
		str.append("channelType").append("07");
		str.append("reqTime").append(reqTime);
		str.append("orderCode").append(chargeOrder);
		str.append("totalAmount").append(amount);
		str.append("userId").append(userId);
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
