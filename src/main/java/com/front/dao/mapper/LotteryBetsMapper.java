package com.front.dao.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Param;
 
import com.front.model.LotteryBets;

public interface LotteryBetsMapper {
	
	/***
	 * 用户投注
	 * @param record
	 * @return
	 */
	public int insertLotteryBets(@Param("LotteryBets")List<LotteryBets> lotteryBets)throws Exception;
	
	/**
	 * 根据id获取投注记录
	 * @param id
	 * @return
	 */
	public LotteryBets queryLotteryBetsById(@Param("lotteryBetId")int lotteryBetId);
	
	
	/**
	 *  获取用户的投注单号
	 * @return
	 */
	public String getLotteryBetsOrder();
	
	
	/***
	 * 撤单
	 * @param lotteryBetId
	 */
	public void cancelLotteryBet(@Param("bets")LotteryBets bets)throws Exception;
	
}