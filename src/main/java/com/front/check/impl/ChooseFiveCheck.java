package com.front.check.impl;

import org.springframework.stereotype.Component;

import com.front.algor.AlgorUtil;
import com.front.check.AbstractBetsCheck;
import com.front.common.MathUtils;
import com.front.common.StringUtils;
import com.front.exception.LotteryBetsException;
import com.front.model.LotteryBets;

@Component(value="CHOOSE_FIVE")
//11选五校验
public class ChooseFiveCheck extends AbstractBetsCheck{

	@Override
	public void checkLotteryBetData(LotteryBets bets)throws LotteryBetsException 
	{
		String ruleFun = StringUtils.obj2String(bets.getBetCheckAttr("ruleFun", StringUtils.EMPTY));
		String betsData = bets.getBetsData();
		
		int amount = 0;
		if(ruleFun.equals("gd11x5Q2")){
			amount = MathUtils.NewN1ByStringCode(betsData, 2);	
			
		}else if(ruleFun.equals("gd11x5Q2z")){
			amount = MathUtils.C(betsData.split(" ").length, 2);
			
		}else if(ruleFun.equals("gd11x5Q3")){
			amount = MathUtils.NewN1ByStringCode(betsData, 3);
			
		}else if(ruleFun.equals("gd11x5Q3z")){
			amount = MathUtils.C(betsData.split(" ").length, 3);
			
		}else if(ruleFun.equals("gd11x5dwd")){
			amount = MathUtils.dwd(betsData);
			
		}else if(ruleFun.equals("gd11x5bdw")){
			amount = MathUtils.C(betsData.split(" ").length, 1);
			
		}else if(ruleFun.equals("gd11x5R1")){
			amount = MathUtils.C(betsData.split(" ").length, 1);
			
		}else if(ruleFun.equals("gd11x5R2")){
			amount = MathUtils.C(betsData.split(" ").length, 2);
			
		}else if(ruleFun.equals("gd11x5R3")){
			amount = MathUtils.C(betsData.split(" ").length, 3);
			
		}else if(ruleFun.equals("gd11x5R4")){
			amount = MathUtils.C(betsData.split(" ").length, 4);
			
		}else if(ruleFun.equals("gd11x5R5")){
			amount = MathUtils.C(betsData.split(" ").length, 5);
			
		}else if(ruleFun.equals("gd11x5R6")){
			amount = MathUtils.C(betsData.split(" ").length, 6);
			
		}else if(ruleFun.equals("gd11x5R7")){
			amount = MathUtils.C(betsData.split(" ").length, 7);
			
		}else if(ruleFun.equals("gd11x5R8")){
			amount = MathUtils.C(betsData.split(" ").length, 8);
			
		}else if(ruleFun.equals("rxwfQ2d") ||
				ruleFun.equals("rxwfH2d") ||
				ruleFun.equals("gd11x5R1ds") ||
				ruleFun.equals("gd11x5R2ds") ||
				ruleFun.equals("gd11x5R3ds") ||
				ruleFun.equals("gd11x5R4ds") ||
				ruleFun.equals("gd11x5R5ds") ||
				ruleFun.equals("gd11x5R6ds") ||
				ruleFun.equals("gd11x5R7ds") ||
				ruleFun.equals("gd11x5R8ds")){
			amount = betsData.split("\\|").length;
		}else if(ruleFun.equals("rxwfR2d")){	//任选二单式
			int obj = AlgorUtil.getPlan(2,bets.getBetsWeishu());
			amount = betsData.split("\\|").length*obj;
		}
		if(bets.getBetsNum() != amount){
			System.out.println(bets.getBetsNum()+ "  "+amount);
			throw LotteryBetsException.makeBetsDataAbnormal();
		}
		
	}

}
