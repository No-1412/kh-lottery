package com.front.check;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import com.front.check.impl.GroupSelectionCheck;
import com.front.common.MathUtils;
import com.front.common.StringUtils;
import com.front.conf.SpringUtils;
import com.front.constant.FrontCheckConstant;
import com.front.exception.FrontException;
import com.front.exception.LotteryBetsException; 
import com.front.model.LotteryBets;
import com.front.model.User;
import com.front.service.ReportService;

/***
 * 
 * 
 * @author huang
 * 
 */
public abstract class AbstractBetsCheck implements BetsCheck {

	@Autowired
	private ReportService reportService;

	/***
	 * 校验投注期号是否已经封单
	 * 
	 * @throws LotteryBetsException
	 */
	protected void checkLotteryBetsNo(Map<String, Object> ver)
			throws LotteryBetsException {
		try {
			reportService.verification("checkLotteryBetsNo", ver);
		} catch (FrontException e) {
			throw new LotteryBetsException(20007, e.getMessage());
		} catch (Exception e) {
			throw new LotteryBetsException(20007, e.getMessage());
		}
	}



	/***
	 * Desc 检验彩种是否停售
	 * 
	 * @param bets
	 */
	protected void checkLotteryInfo(User vo,LotteryBets bets, Map<String, Object> ver) throws LotteryBetsException,Exception
	{
		try 
		{
			double betsMode = bets.getBetsMode();
			if(betsMode!=2.0&&betsMode!=0.2&&betsMode!=0.02&&betsMode!=0.002)//元 模式  角模式 分模式
			{
				throw LotteryBetsException.makeBetsModeEx();
			} 
			
			//校验投注金额
			double betsAmount = new BigDecimal(bets.getBetsMode()+"").multiply(new BigDecimal(bets.getBetsBeishu())).multiply(new BigDecimal(bets.getBetsNum())).doubleValue();
			if(betsAmount!=bets.getBetsAmount()) 
			{
				throw LotteryBetsException.makeBetsAmountAbnormal();//投注金额数据计算异常
			}
			double betsBonusprop = bets.getBetsBonusprop();//投注的奖金返点
			Map<String, Object> map = this.reportService.querySingleResult("checkLotteryInfo", ver);
			bets.addBetCheckAttr(map);
			double fanDian = vo.getFandian();//当前用户的返点数
			if(fanDian*100<bets.getBetsFandian()||bets.getBetsFandian()<0)
			{
				throw LotteryBetsException.makeBetsModeRebate();
			}
			double dc =(13-fanDian*100)/13;
			double bonusProp = StringUtils.str2Double(map.get("bonusProp"));//玩法的最高奖金
			double bonusPropBase = StringUtils.str2Double(map.get("bonusPropBase"));//玩法的最低奖金
			double bonus= bonusProp -(betsBonusprop-bonusPropBase)*dc;//当前返点的最高奖金
			if(betsBonusprop<bonusPropBase||betsBonusprop>Math.ceil(bonus))
			{
				throw LotteryBetsException.makeBetsModeAward();//投注奖金异常
			}
			String lotteryTypeStatus = StringUtils.obj2String("lotteryTypeStatus");
			if(StringUtils.equals(lotteryTypeStatus, "N"))
			{
				throw new LotteryBetsException(FrontCheckConstant.LOTTERY_PLAY_GROUP_STOP, 
						 new StringBuilder().append(map.get("lotteryType"))
						.append("已经暂停销售。")
						.toString());
			}
			String lotteryStatus = StringUtils.obj2String(map.get("lotteryStatus"));
			if(StringUtils.equals(lotteryStatus, "N"))
			{
				throw new LotteryBetsException(FrontCheckConstant.LOTTERY_PLAY_GROUP_STOP, 
						new StringBuilder().append(map.get("lotteryName"))
						.append("已经暂停销售。")
						.toString());
			}
			String pgStatus =StringUtils.obj2String(map.get("pgStatus"));
			if(StringUtils.equals(pgStatus, "N"))
			{
				throw new LotteryBetsException(FrontCheckConstant.LOTTERY_PLAY_GROUP_STOP, new StringBuilder().append(map.get("groupName"))
						.append("已经关闭。")
						.toString());
			}
			String playStatus = StringUtils.obj2String(map.get("playStatus"));
			if(StringUtils.equals(playStatus, "N"))
			{
				throw new LotteryBetsException(FrontCheckConstant.LOTTERY_PLAY_GROUP_STOP, new StringBuilder().append(map.get("playName"))
						.append("已经关闭。")
						.toString());
			}
		    String groupSelectCheck =StringUtils.obj2String(map.get("groupSelectCheck"));
			if(StringUtils.equals(groupSelectCheck, "Y"))
			{
			      this.checkGroupSelection(bets);
			}
		  
		}  catch (Exception e) {
			throw new LotteryBetsException(
					FrontCheckConstant.LOTTERY_CHECK_SQL_EX, e.getMessage());
		}
	}

	/***
	 * 校验组选的投注数据是否合法
	 * 
	 * @param bets
	 */
	protected void checkGroupSelection(LotteryBets bets) throws LotteryBetsException
	{
			 GroupSelectionCheck check = (GroupSelectionCheck) SpringUtils.getBean("groupSelectionCheck");
			 check.checkLotteryBetData(bets);
		
	}

	/***
	 * @desc 校验投注数据是否合法
	 * 
	 * 
	 */
	public void checkBetData(User user,LotteryBets bets) throws LotteryBetsException,Exception {
		Map<String, Object> ver = new HashMap<String, Object>();
		ver.put("id", bets.getLotteryId());// 投注的彩票id
		ver.put("playId", bets.getLotteryPlayid());// 投注的玩法id
		ver.put("betsData", bets.getBetsData());// 投注的数据
		ver.put("lotteryNo", bets.getLotteryNo());// 投注的期号

		checkLotteryInfo(user,bets, ver);// 校验彩票停售状态

		checkLotteryBetsNo(ver);// 校验投注期号是否能继续投注

		checkLotteryBetData(bets);
	}

	/***
	 * 具体的彩种实现自己的校验方法
	 * 
	 * @param bets
	 * @throws LotteryBetsException
	 */
	public abstract void checkLotteryBetData(LotteryBets bets)
			throws LotteryBetsException;
}
