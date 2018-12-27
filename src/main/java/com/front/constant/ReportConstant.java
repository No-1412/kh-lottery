package com.front.constant;

public abstract interface ReportConstant
{
    public static final String BETS_ORDER = "BET_ORDER";//投注单号
  
    public static final String USER = "USER";//用户id
    
    public static final String RECHARGE="RECHARGE";//充值订单号
    
	public static final String QUERY_CMS_SEQ="SELECT NEXTVAL(:catalog)as cmsOrder";
	
	public static final String QUERY_CMS_PARAM ="catalog";
	
    public static final String CMS_ORDER_KEY="cmsOrder";
    
	public static final String QUERY_CMS_CONF="SELECT fn_getCmsConfig(:catalog)as conf";
	
	public static final String QUERY_CMS_REPCODE="queryCmsConf";
	
	public static final String QUERY_CMS_CONF_PARAM ="catalog";
	
    public static final String CMS_CONF_KEY="conf";
    
    public static final String DIFFERENCE="DIFFERENCE";//上下级返点最小差值
    
    public static final String MAX_BETS_BONUS="BETTING_BONUS";//最大中奖奖金
    
    public static final String MAX_BETS_NUM="BETTING_LIMITS";//最大投注数量
    
    public static final String CHECK_CODE="checkCode";//校验代码 
    
    public static final String CHECK_MSG="checkMsg";//校验信息
    
    public static final String CHECK_SQL_EX="CHECK_SQL_EX";//校验sql异常
    
    public static final String CHECK_FAIL_EX="CHECK_FAIL_EX";//校验失败
    
    public static final String MIN_REBATE="MIN_REBATE";//代理最低返点
    
    //需要缓存的数据
    public static final String REPORT_CACHE_SQL="SELECT REP_CODE,REP_NAME,REP_SQL,REP_HANDLER,CACHE_HANDLER FROM TR_REP_CONF ";
    
    public static final String REPORT_REP_SQL="REP_SQL";
    
    public static final String REPORT_REP_HANDLER="REP_HANDLER";
    
    public static final String REPORT_CACHE_HANDLER="CACHE_HANDLER";
    
    public static final String FEEDBACK="FEEDBACK";//平台赠送金额
    
    public static final String RECHARGE_LOWER="RECHARGE_LOWER";//最低充值
    
    public static final String RECHARGE_UPPER="RECHARGE_UPPER";//最高充值
    
    public static final String CASH_LOWER="CASH_LOWER";//最低提现
    
    public static final String CASH_UPPER="CASH_UPPER";//最高提现
    
    public static final String CASH_TIME="CASH_TIME";//提现次数
    
    public static final String CASH_BTIME="CASH_BTIME";//提现开始时间
    
    public static final String CASH_ETIME="CASH_ETIME";//提现结束时间
    
    public static final String CUSTOMER_SERVICE_LINK="CUSTOMER_SERVICE_LINK";//在线客服链接
    
    public static final String CLOSING_SWITCH="CLOSING_SWITCH";//网站运行开关
    
    public static final String CLOSING_AN="CLOSING_AN";//网站关闭后提示
}