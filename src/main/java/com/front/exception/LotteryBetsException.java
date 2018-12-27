package com.front.exception;

import java.text.MessageFormat;

import com.front.enums.LotteryBetsExceptionEnum;

public class LotteryBetsException extends FrontException
{
	private int error;
	
    public LotteryBetsException(LotteryBetsExceptionEnum en)
    {
	   super(en.getTips());
	   this.error=en.getErrorCode(); 
    } 
    
    /***
     * 
     * 
     * @param error
     * @param msg
     */
    public LotteryBetsException(int error,String msg)
    {
	   super(msg);
	   this.error=error;
    }
    
    
    public int getError()
    {
    	return this.error;
    }
    
    /***
     *  余额不足
     * @return
     */
    public static LotteryBetsException makeCreditLowEx()
    {
    	LotteryBetsExceptionEnum en =LotteryBetsExceptionEnum.CreditLow;
    	LotteryBetsException ex = new LotteryBetsException(en);
    	return ex;
    }
    
    /***
     * 彩票停售
     * @return
     */
    public static LotteryBetsException makeStopSellEx()
    {
    	LotteryBetsExceptionEnum en =LotteryBetsExceptionEnum.StopSell;
    	LotteryBetsException ex = new LotteryBetsException(en);
    	return ex;
    }
    
    /***
     * 超过设置的最大奖金
     * @return
     */
    public static LotteryBetsException makeOverMaxBonusEx()
    {
    	LotteryBetsExceptionEnum en =LotteryBetsExceptionEnum.OverMaxBonus;
    	LotteryBetsException ex = new LotteryBetsException(en);
    	return ex;
    }
    
    /***
     * 超过设置的最大投注注数
     * @return
     */
    public static LotteryBetsException makeOverMaxBetsnumEx()
    {
    	LotteryBetsExceptionEnum en =LotteryBetsExceptionEnum.OverMaxBetsNum;
    	LotteryBetsException ex = new LotteryBetsException(en);
    	return ex;
    }
    
    
    /***
     * 总体投注开关关闭
     * @return
     */
    public static LotteryBetsException makeBetsSwitchOff()
    {
    	LotteryBetsExceptionEnum en =LotteryBetsExceptionEnum.BetsSwitchOff;
    	LotteryBetsException ex = new LotteryBetsException(en);
    	return ex;
    }
     
    /***
     * 代理投注开关关闭
     * @return
     */
    public static LotteryBetsException makeProxySwitchOff()
    {
    	LotteryBetsExceptionEnum en =LotteryBetsExceptionEnum.ProxySwitchOff;
    	LotteryBetsException ex = new LotteryBetsException(en);
    	return ex;
    }
    
    /***
     *  投注金额数据异常
     * @return
     */
    public static LotteryBetsException makeBetsAmountAbnormal()
    {
    	LotteryBetsExceptionEnum en =LotteryBetsExceptionEnum.BetsAmountAbnormal;
    	LotteryBetsException ex = new LotteryBetsException(en);
    	return ex;
    }
    
    
    /***
     * 投注组选数据校验异常
     * @return
     */
    public static LotteryBetsException makeGroupSelection()
    {
    	LotteryBetsExceptionEnum en =LotteryBetsExceptionEnum.BetsDataAbnormal;
    	LotteryBetsException ex = new LotteryBetsException(en);
    	return ex;
    }
    
    
    
    /***
     * 投注数据异常
     * @return
     */
    public static LotteryBetsException makeBetsDataAbnormal()
    {
    	LotteryBetsExceptionEnum en =LotteryBetsExceptionEnum.BetsDataAbnormal;
    	LotteryBetsException ex = new LotteryBetsException(en);
    	return ex;
    }
    
    /***
     * 用户返点限制
     * @return
     */
    public static LotteryBetsException makeRebatebnormal(double minRebate,double maxRebate)
    {
    	LotteryBetsExceptionEnum en =LotteryBetsExceptionEnum.UserRebateLimit;
    	LotteryBetsException ex = new LotteryBetsException(en.getErrorCode(),MessageFormat.format(en.getTips(), minRebate,maxRebate));
    	return ex;
    }
    
    
    /***
     *  投注金额数据异常
     * @return
     */
    public static LotteryBetsException makeBetsModeEx()
    {
    	LotteryBetsExceptionEnum en =LotteryBetsExceptionEnum.BetModeEx;
    	LotteryBetsException ex = new LotteryBetsException(en);
    	return ex;
    }
    
    
    /***
     *  投注奖金异常
     * @return
     */
    public static LotteryBetsException makeBetsModeAward()
    {
    	LotteryBetsExceptionEnum en =LotteryBetsExceptionEnum.BetModeAward;
    	LotteryBetsException ex = new LotteryBetsException(en);
    	return ex;
    }
    
    
    /***
     *  投注返点异常
     * @return
     */
    public static LotteryBetsException makeBetsModeRebate()
    {
    	LotteryBetsExceptionEnum en =LotteryBetsExceptionEnum.BetModeRebate;
    	LotteryBetsException ex = new LotteryBetsException(en);
    	return ex;
    }
    
    /***
     *  投注返点异常
     * @return
     */
    public static LotteryBetsException makeSystemException()
    {
    	LotteryBetsExceptionEnum en =LotteryBetsExceptionEnum.SystemException;
    	LotteryBetsException ex = new LotteryBetsException(en);
    	return ex;
    }
}
