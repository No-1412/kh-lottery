package com.front.constant;

public interface PayConstant {

	 public static final String EXTERNAL_KEY="platform.pay.externalkey";//加密的密钥
	 
	 public static final String PAY_CALLBACK="platform.pay.callback";//支付成功的回调地址
	 
	 public static final String PAY_URL="platform.pay.url";
	 
	 public static final String PAY_USER_NAME="platform.pay.username";
	 
	 public static final String PAY_PASSWORD="platform.pay.password";
	 
	 public static final String CHARGE_IS_NOTHANDLE = "-1";//充值订单处理
	 
	 public static final String SERVER_TO_SERVER = "1";//返回方式
	 
	 public static final String SERVER_TO_BROWSER = "-1";//充值订单处理
	 
	 public static final String MD5_WITH_RSA="16";
	 
	 public static final String MD5="17";
	 
	 public static final String ORDERENCODE_TYPE="5";
	 
	 public static final int CHARGE_NORMAL = 0;//充值订单正常
	 
	 public static final int CHARGE_IS_DELETE = 1;//充值订单已删除
	 
	 public static final int CHARGE_TYPE_OFFLINE =0;//线下充值
	 
	 public static final int CHARGE_TYPE_ONLINE =1;//在线充值
	 
	 public static final String WECHAT_PAY_CODE = "00000050";
	 
	 public static final String ALIPAY_PAY_CODE = "00000060";
	 
	 public static final String ALIPAY_WECHAT_PAY_URL = "http://www.bolpays.com/wp_recharge.do";
	 
	 public static final String QUICKPAY_PAY_URL = "http://www.bolpays.com/bl_quickPay.do";
}
