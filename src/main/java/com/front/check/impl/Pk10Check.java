package com.front.check.impl;

import org.springframework.stereotype.Component;

import com.front.check.AbstractBetsCheck;
import com.front.common.MathUtils;
import com.front.common.StringUtils;
import com.front.exception.LotteryBetsException;
import com.front.model.LotteryBets;

@Component(value="PK10")
public class Pk10Check extends AbstractBetsCheck{

	@Override
	public void checkLotteryBetData(LotteryBets bets)throws LotteryBetsException 
	{
		String ruleFun = StringUtils.obj2String(bets.getBetCheckAttr("ruleFun", StringUtils.EMPTY));
		String betsData = bets.getBetsData();
		
		int amount = 0;
		if(ruleFun.equals("kjq1")){
			amount = betsData.split(" ").length;
		}else if(ruleFun.equals("dwd10x")){
			int count = 0;
			String [] codeArr = betsData.split(",");
			for(int i = 0; i < codeArr.length; i++){
				if(!codeArr[i].equals("*")){
					count += codeArr[i].split(" ").length;
				}
			}
			amount = count;
		}else if(ruleFun.equals("kjq2")){
			amount = MathUtils.NewN1ByStringCode(betsData, 2);	
		}
		if(bets.getBetsNum() != amount){
			System.out.println(bets.getBetsNum()+ "  "+amount);
			throw LotteryBetsException.makeBetsDataAbnormal();
		}
	}

}
