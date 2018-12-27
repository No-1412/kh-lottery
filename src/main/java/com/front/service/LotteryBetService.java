package com.front.service;

import java.util.List;

import com.front.model.LotteryBets;
import com.front.model.User;

public interface LotteryBetService
{
	/****
	 * @desc 批量投注
	 * @param lotteryBets
	 * @return
	 */
	public void saveLotteryBets(User user,List<LotteryBets> lotteryBets)throws Exception;
	
	
	/****
	 * @desc 投注撤单 
	 * @param lotteryBets
	 * @return
	 */
	public void cancelLotteryBets(User vo,int lotteryBetId)throws Exception;
}
