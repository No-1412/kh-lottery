package com.front.controller;

import java.math.BigDecimal;
import java.math.RoundingMode;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.fastjson.JSONObject;
import com.front.common.MD5Util;
import com.front.common.StringUtils;
import com.front.constant.PayConstant;
import com.front.model.UserCharge;
import com.front.redis.RedisService;
import com.front.service.UserChargeService; 

@Controller
public class OnlinePaySuccessController extends BaseController implements PayConstant {
	
	public static Logger logger = LoggerFactory.getLogger(OnlinePaySuccessController.class);
	
	@Autowired
	public UserChargeService userChargeService;
 
	@Value("${platform.pay.externalkey:''}")
	private String externalkey;
	
	@RequestMapping(value = "/content/charge/chargeSuccess")
	public void chargeSuccess(HttpServletRequest request, HttpServletResponse repson, ModelMap map) throws Exception {
		String data = request.getParameter("data");
		String sign = request.getParameter("sign");
		JSONObject dataMap = JSONObject.parseObject(data);
		JSONObject head = dataMap.getJSONObject("head");
		JSONObject body = dataMap.getJSONObject("body");
		String respCode = head.getString("respCode");
		String billno = body.getString("orderCode");
		String amount = body.getString("totalAmount");
		String cryption = this.createRespMd5(
				head.getString("respTime"),
				respCode, 
				body.getString("orderCode"), 
				body.getString("totalAmount"),
				body.getString("orderStatus"),
				body.getString("traceNo"),
				body.getString("buyerPayAmount"),
				body.getString("discAmount"),
				body.getString("payTime"),
				body.getString("clearDate")); 
 		logger.info("chargeSuccess.sign:{}",sign);
		if (StringUtils.equalsIgnoreCase(encoder.encodeToString(MD5Util.MD5(cryption).getBytes()), sign)) {
			if (StringUtils.equalsIgnoreCase(respCode, "000000")&&StringUtils.equalsIgnoreCase(body.getString("orderStatus"), "1")) //交易成功
			{
				long result = RedisService.getRedisService().incr(billno, 120);
				if(result==1)
				{
					UserCharge charge = userChargeService.queryUserCharge(billno);
					if (charge != null)// 该订单已经删除了
					{
						if (charge.getIsDelete() == PayConstant.CHARGE_NORMAL) {
							if (StringUtils.equals(charge.getStatus(), PayConstant.CHARGE_IS_NOTHANDLE))// 未支付的订单
							{
								charge.setActualAccount(new BigDecimal(amount).divide(new BigDecimal(100)).setScale(2, RoundingMode.DOWN).doubleValue());
								userChargeService.charge(charge);
								super.renderPage(repson, "交易成功");
								return;
							}
						}
					}
				} 
			} else {
				super.renderPage(repson, "验证失败");
			}
		}
	}
	
	
    /**
     * 
     * @param respTime
     * @param respCode
     * @param orderCode
     * @param totalAmount
     * @param orderStatus
     * @param traceNo
     * @param buyerPayAmount
     * @param discAmount
     * @param payTime
     * @param clearDate
     * @return
     */
	private String createRespMd5(String respTime, String respCode,Object orderCode,String totalAmount,String orderStatus,String traceNo,String buyerPayAmount, String discAmount,String payTime,String clearDate) 
	{
		StringBuilder str = new StringBuilder();
		str.append("ve_" + externalkey + "_rsion").append("1.0");
		str.append("respTime").append(respTime);
		str.append("respCode").append(respCode);
		str.append("orderCode").append(orderCode);
		str.append("totalAmount").append(totalAmount);
		str.append("orderStatus").append(orderStatus);
		str.append("traceNo").append(traceNo); 
		str.append("buyerPayAmount").append(buyerPayAmount);
		str.append("discAmount").append(discAmount);
		str.append("payTime").append(payTime);
		str.append("clearDate").append(clearDate);
		logger.info("createRespMd5.str:{}",str);
		return str.toString(); 
	}
}
