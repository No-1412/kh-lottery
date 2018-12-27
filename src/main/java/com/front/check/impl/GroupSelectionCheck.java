package com.front.check.impl;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import org.springframework.stereotype.Component;
import com.front.common.StringUtils;
import com.front.constant.FrontCheckConstant;
import com.front.exception.LotteryBetsException;
import com.front.model.LotteryBets;

@Component("groupSelectionCheck")
public class GroupSelectionCheck {

	/***
	 * @desc 组选校验 判断判断投注数据是否存在重复数据
	 * @param betData
	 * @throws LotteryBetsException
	 */
	public void checkLotteryBetData(LotteryBets betsData)
			throws LotteryBetsException {
		String lotteryType = betsData.getLotteryType();
		if (!StringUtils.isBlank(lotteryType)) {
			String data = betsData.getBetsData();
			if (!StringUtils.isBlank(data)) {
				if (StringUtils.equals(lotteryType, FrontCheckConstant.LOTTERY_TYPE_CHOOSE_FIVE))// 十一选五
				{
					checkChooseFiveLottery(betsData);
				} else if (StringUtils.equals(lotteryType, FrontCheckConstant.LOTTERY_TYPE_EVERY_COLOR)
						|| StringUtils.equals(lotteryType, FrontCheckConstant.LOTTERY_TYPE_SYSTEM_LOTTERY))// 时时彩,系统彩
				{
					checkSystemLottery(betsData);
				} else if (StringUtils.equals(lotteryType, FrontCheckConstant.LOTTERY_TYPE_PK10))// pk10
				{
					checkPK10Lottery(betsData);
				}
			}
		}
	}

	/***
	 * 校验系统彩数据
	 * 
	 * @param betsData
	 * @throws LotteryBetsException
	 */
	private void checkSystemLottery(LotteryBets bets)
			throws LotteryBetsException {
		String ruleFun = StringUtils.obj2String(bets.getBetCheckAttr("ruleFun",
				StringUtils.EMPTY));
		String betsData = bets.getBetsData(); 
			if (StringUtils.equals(ruleFun, "zx120")// 组选120
					|| StringUtils.equals(ruleFun, "3xz_q3z3")// 前三组三
					|| StringUtils.equals(ruleFun, "3xz_q3z6")// 前三组六
					|| StringUtils.equals(ruleFun, "3xz_h3z6")// 后三组六
					|| StringUtils.equals(ruleFun, "3xz_h3z3")// 后三组三
					|| StringUtils.equals(ruleFun, "3xz_z3z6")// 中三组六
					|| StringUtils.equals(ruleFun, "3xz_z3z3")// 中三组三
					|| StringUtils.equals(ruleFun, "qwwfsjfc")// 四季发财
					|| StringUtils.equals(ruleFun, "qwwfsxbx")// 三星报喜
					|| StringUtils.equals(ruleFun, "qwwfhscs")// 好事成双
					|| StringUtils.equals(ruleFun, "qwwfyffs")// 一帆风顺
					|| StringUtils.equals(ruleFun, "bdw_q31m")// 前三一码
					|| StringUtils.equals(ruleFun, "bdw_z31m")// 中三一码
					|| StringUtils.equals(ruleFun, "bdw_h31m")// 后三一码
					|| StringUtils.equals(ruleFun, "bdw_q32m")// 前三二码
					|| StringUtils.equals(ruleFun, "bdw_h32m")// 后三二码
					|| StringUtils.equals(ruleFun, "bdw_5x2m")// 后三二码
					|| StringUtils.equals(ruleFun, "bdw_4x2m")// 四星二码
					|| StringUtils.equals(ruleFun, "bdw_4x1m")// 四星一码
					|| StringUtils.equals(ruleFun, "2xz_q2zxfs")// 前二组选复式
					|| StringUtils.equals(ruleFun, "2xz_h2zxfs")// 后二组选复式
			) {
				String[] arr = betsData.split("\\s");
				Set<String> set = new HashSet<String>(Arrays.asList(arr));
				if (arr.length != set.size()) {
					throw LotteryBetsException.makeGroupSelection();
				}

			} else if (StringUtils.equals(ruleFun, "2xz_rx2zxfs"))// 任选二组选复式
			{
				String betsNum = StringUtils.substringAfter(betsData, ":");
				Set<String> set = new HashSet<String>(Arrays.asList(StringUtils
						.split(betsNum)));
				if (StringUtils.length(betsNum) != set.size()) {
					throw LotteryBetsException.makeGroupSelection();
				}
			}  
	}

	/***
	 * 校验十一选五数据
	 * 
	 * @param betsData
	 * @throws LotteryBetsException
	 */
	private void checkChooseFiveLottery(LotteryBets bets)
			throws LotteryBetsException {
		String ruleFun = StringUtils.obj2String(bets.getBetCheckAttr("ruleFun",
				StringUtils.EMPTY));
		String betsData = bets.getBetsData(); 
		if (StringUtils.equals(ruleFun, "gd11x5Q2z")// 前二组选
				|| StringUtils.equals(ruleFun, "gd11x5R8")// 任选八中五
				|| StringUtils.equals(ruleFun, "gd11x5R7")// 任选七中五
				|| StringUtils.equals(ruleFun, "gd11x5R6")// 任选六中五
				|| StringUtils.equals(ruleFun, "gd11x5R5")// 任选五中五
				|| StringUtils.equals(ruleFun, "gd11x5R4")// 任选四中四
				|| StringUtils.equals(ruleFun, "gd11x5R3")// 任选三中三
				|| StringUtils.equals(ruleFun, "gd11x5R2")// 任选二中二
				|| StringUtils.equals(ruleFun, "gd11x5R1")// 任选一中一
				|| StringUtils.equals(ruleFun, "gd11x5Q3z")// 前三组选
		)
		{
			String[] arr = betsData.split("\\s");
			Set<String> set = new HashSet<String>(Arrays.asList(arr));
			if (arr.length != set.size()) {
				throw LotteryBetsException.makeGroupSelection();
			}
		}
	}

	/***
	 * 校验Pk10数据
	 * 
	 * @param betsData
	 * @throws LotteryBetsException
	 */
	private void checkPK10Lottery(LotteryBets bets)
			throws LotteryBetsException {
		String ruleFun = StringUtils.obj2String(bets.getBetCheckAttr("ruleFun",
				StringUtils.EMPTY));
		String betsData = bets.getBetsData(); 
		if(StringUtils.equals("kjq1", ruleFun))
		{
			String[] arr = betsData.split("\\s");
			Set<String> set = new HashSet<String>(Arrays.asList(arr));
			if (arr.length != set.size()) {
				throw LotteryBetsException.makeGroupSelection();
			}
		}
	}

	public static void main(String[] args) {
		boolean bol = "0 1 2 3 4 5 6 7 8 9".matches("(?!\\d*(\\d)\\d*\\1\\d*)");
		System.out.println("0 1 2 3 4 5 6 7 8 9".split("\\s")[0]);
	}
}
