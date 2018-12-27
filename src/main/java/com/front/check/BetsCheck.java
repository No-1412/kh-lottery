package com.front.check;

import com.front.exception.LotteryBetsException;
import com.front.model.LotteryBets;
import com.front.model.User;

/***
 *  投注校验
 * @author huang
 *
 */
public interface BetsCheck {
	  
	  /***
	   * 校验投注数据是否异常
	   * @param bets
	   * @throws LotteryBetsException
	   */
	  public void checkBetData(User user,LotteryBets bets)throws LotteryBetsException,Exception;
}
