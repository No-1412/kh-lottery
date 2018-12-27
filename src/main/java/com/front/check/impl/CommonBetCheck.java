package com.front.check.impl;

import java.util.Collections;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.front.check.BetsCheck;
import com.front.common.SiteUtil;
import com.front.common.StringUtils;
import com.front.constant.FrontCheckConstant;
import com.front.constant.UserConstant;
import com.front.exception.LotteryBetsException;
import com.front.model.LotteryBets;
import com.front.model.User;
import com.front.service.ReportService;

@Component(value="commonBetCheck")
public class CommonBetCheck implements BetsCheck{

	
	@Autowired
	private ReportService reportService;
	
	@Override
	public void checkBetData(User user,LotteryBets bets) throws LotteryBetsException, Exception 
	{
		  checkBetsSitchOnOff();
	}

	
	/**
	 * 代理投注的开关
	 * 
	 * @throws LotteryBetsException
	 */
	private void checkBetsSitchOnOff() throws LotteryBetsException,Exception {
		try 
		{
			User user = SiteUtil.getLoginUserObject();
			Map<String, Object> map = this.reportService.querySingleResult("checkBetsSitchOnOff", Collections.EMPTY_MAP);
			String betsLimit= StringUtils.obj2String(map.get(FrontCheckConstant.BETTING_LIMIT));
			if(StringUtils.equals(betsLimit, "Y"))//启用了投注限制
			{
				double minRebate = StringUtils.str2Double(map.get(FrontCheckConstant.BETTING_LIMIT_MIN_REBATE)+"");
				double maxRebate = StringUtils.str2Double(map.get(FrontCheckConstant.BETTING_LIMIT_MAX_REBATE)+"");
				if(user.getFandian()*100>=minRebate&&user.getFandian()*100<=maxRebate)//用户返点在限制区间
				{
					throw LotteryBetsException.makeRebatebnormal(minRebate, maxRebate);
				}
			}
			String betsSitchOnOff = StringUtils.obj2String(map.get(FrontCheckConstant.BETTING)); // 总体的投注开关
			if (StringUtils.equals(betsSitchOnOff, "N")) {
				throw LotteryBetsException.makeBetsSwitchOff();
			}
			if (user != null) {
				if (UserConstant.USER_PROXY_TYPE == user.getUserType()) {
					String agent = StringUtils.obj2String(map.get(FrontCheckConstant.AGENT));// 代理投注开关
					if (StringUtils.equals(agent, "N")) {
						throw LotteryBetsException.makeProxySwitchOff();
					}
				}
			}
			else
			{
				 throw new LotteryBetsException(FrontCheckConstant.CHECK_NOT_LOGIN, FrontCheckConstant.CHECK_NOT_LOGIN_STR);
			}
		} catch (Exception e) {
			throw new LotteryBetsException(
					FrontCheckConstant.LOTTERY_CHECK_SQL_EX, e.getMessage());
		}
	}
 

}
