package com.front.enums;

public enum LotteryBetsExceptionEnum {
 
	CreditLow(20000,"余额不足"),
	
	OverMaxBonus(20001,"超过最大奖金"),
	
	OverMaxBetsNum(20002,"超过最大注数"),
	 
	StopSell(20003,"彩票停售"),
	
	BetsDataAbnormal(20004,"投注数据异常"),
	  
	BetsAmountAbnormal(20008,"投注金额数据异常"),
	
	BetsSwitchOff(20005,"总投注功能开关已经关闭"),
	
	ProxySwitchOff(20006,"代理投注开关已经关闭"),
	
	LotteryNoStopSell(20007,"彩票期号已经停售"),
	
	UserRebateLimit(20008,"直属代理无法投注"),
	
	BetModeEx(20009,"投注模式异常"),
	
	BetModeAward(20010,"投注奖金异常"),
	
	BetModeRebate(20011,"投注返点异常"),
	
	SystemException(20012,"系统异常，请刷新重试");
	
	private String tips;
	
	private int errorCode;
	
	private LotteryBetsExceptionEnum(int error,String msg)
	{
		this.errorCode = error;
	    this.tips = msg;
	}
	
	/**
	 *  获取提示信息
	 * @return
	 */
	public String getTips()
	{
		return this.tips;
	}
	
	/**
	 * 
	 * @return
	 */
	public int getErrorCode()
	{
		return this.errorCode;
	}
}
