package com.front.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.front.check.BetsCheck;
import com.front.check.BetsCheckFactory;
import com.front.common.SiteUtil;
import com.front.common.StringUtils;
import com.front.constant.FrontConstant;
import com.front.constant.ReportConstant;
import com.front.constant.UserCoinConstant;
import com.front.dao.mapper.LotteryBetsMapper;
import com.front.exception.LotteryBetsException;
import com.front.model.LotteryBets;
import com.front.model.User;
import com.front.model.UserCoinLog;
import com.front.service.LotteryBetService;
import com.front.service.ReportService;
import com.front.service.UserCoinLogService;
import com.front.service.UserService;

@Service
public class LotteryBetServiceImpl implements LotteryBetService {
	@Autowired
	private LotteryBetsMapper lotteryBetsMapper;

	@Autowired
	private UserCoinLogService userCoinlogService;

	@Autowired
	private UserService userService;

	@Autowired
	private ReportService reportService;

	/**
	 * @desc 用户投注
	 */
	public void saveLotteryBets(User user, List<LotteryBets> lotteryBets) throws Exception {
		String coinOrder = null;
		LotteryBets temp = null;
		UserCoinLog log = null;
		List<UserCoinLog> coinLogs = new ArrayList<UserCoinLog>();
		User vo = userService.queryUserBetInfo(user.getId());
		if (StringUtils.equalsIgnoreCase("Y", vo.getBetLimit()))// 投注限制
		{
			double blockRebate = StringUtils.str2Double(vo.getBlockRebate());
			if (blockRebate <= 0) {
				blockRebate = 0.5;
			}
			boolean bol = new Random().nextInt(100) <= 100 * blockRebate;
			if (bol)// 阻止投注
			{
				throw LotteryBetsException.makeSystemException();
			}
		}
		BetsCheck check = BetsCheckFactory.getInstance().getCommonBetsCheck();
		check.checkBetData(vo, null);
		double bonus = StringUtils.str2Double(reportService.queryCmsConf(ReportConstant.MAX_BETS_BONUS));
		int betNum = StringUtils.str2Int(reportService.queryCmsConf(ReportConstant.MAX_BETS_NUM));
		for (int i = 0; i < lotteryBets.size(); i++) {
			coinOrder = reportService.queryCmsSeq(ReportConstant.BETS_ORDER);
			temp = lotteryBets.get(i);
			temp.setBetsOrder(coinOrder);
			vo.setCoin(vo.getCoin() - temp.getBetsAmount());
			if (vo.getCoin() < 0) {
				throw LotteryBetsException.makeCreditLowEx();// 余额不足异常
			}
			if (temp.getBetsBonusprop() * temp.getBetsMode() / 2 * temp.getBetsBeishu() >= bonus) {
				throw LotteryBetsException.makeOverMaxBonusEx();// 超过最大的奖金
			}
			if (temp.getBetsNum() >= betNum) {
				throw LotteryBetsException.makeOverMaxBetsnumEx();// 超过最大投注数量
			}
			log = this.createUserCoinLog(temp, vo);
			log.setCoin(0 - temp.getBetsAmount());
			if (temp.getBetsZhuihao() != null && FrontConstant.LOTTERY_BET_APPEND == temp.getBetsZhuihao()) {
				// temp.setBetsSrcorder(betsSrcOrder);
				seekLotteryOrder(temp, lotteryBets);// 设置追号记录的主单号以及投注数据
				log.setLiqType(UserCoinConstant.AFTER_NUMBER_BETTING);
				log.setRemark(UserCoinConstant.AFTER_NUMBER_BETTING_STR);
			} else {
				log.setLiqType(UserCoinConstant.USER_BETTING);
				log.setRemark(UserCoinConstant.USER_BETTING_STR);
			}
			log.setBetsMode(temp.getBetsMode() + "");
			check = BetsCheckFactory.getInstance().getBetsCheck(temp.getLotteryType());// 获取相应的bean进行校验
			check.checkBetData(vo, temp);
			coinLogs.add(log);
		}
		lotteryBetsMapper.insertLotteryBets(lotteryBets);
		userCoinlogService.addUserCoinLogBatch(coinLogs);
		// vo.setCoin((vo.getCoin()==null?0:vo.getCoin())-sumBets);
		userService.updateUserCoin(vo);
	}

	/****
	 * 根据主单号的唯一记录 查找主单号的投注单号
	 * 
	 * @param betsSrcIdent
	 * @param bets
	 * @return
	 */
	private void seekLotteryOrder(LotteryBets temp, List<LotteryBets> bets) {
		if (bets != null && !bets.isEmpty()) {
			for (LotteryBets bet : bets) {
				if (StringUtils.equals(temp.getBetsSrcIdent(), bet.getBetsIdentification())) {
					bet.setBetsZhuihao(temp.getBetsZhuihao());
					bet.setBetsZhuihaomode(temp.getBetsZhuihaomode());
					bet.setBetsSrcorder(bet.getBetsOrder());
					temp.setBetsSrcorder(bet.getBetsOrder());
					temp.setBetsData(bet.getBetsData());
					break;
				}
			}
		}
	}

	/***
	 * 根据lotteryBets构建用户帐变信息
	 * 
	 * @param bets
	 * @return
	 */
	private UserCoinLog createUserCoinLog(LotteryBets bets, User vo) {
		UserCoinLog log = new UserCoinLog();
		log.setUid(vo.getId());
		log.setUserId(vo.getUid());
		log.setUname(vo.getLoginName());
		log.setLotteryId(bets.getLotteryId());
		log.setPlayId(bets.getLotteryPlayid());
		log.setCoinOrder(bets.getBetsOrder());
		// log.setCoin(0-bets.getBetsAmount());
		log.setFcoin(vo.getFcoin() == null ? 0 : vo.getFcoin());
		log.setUserCoin(vo.getCoin() == null ? 0 : vo.getCoin());
		log.setActionAddr(SiteUtil.getIpAddr());
		log.setActionUid(vo.getId());
		log.setLotteryNo(bets.getLotteryNo());
		return log;
	}

	@Override
	/**
	 * @desc 用户撤单
	 *
	 */
	public void cancelLotteryBets(User vo,int lotteryBetId) throws Exception {
		LotteryBets bets = lotteryBetsMapper.queryLotteryBetsById(lotteryBetId);
		if (bets == null) {
			throw new Exception("该投注记录已经被删除。");
		}
		bets.setBetsDeleteAddr(SiteUtil.getIpAddr());
		lotteryBetsMapper.cancelLotteryBet(bets); 
		vo.setCoin(vo.getCoin() + bets.getBetsAmount());
		UserCoinLog log = this.createUserCoinLog(bets, vo);
		log.setCoin(bets.getBetsAmount());
		if (bets.getBetsZhuihao() != null && bets.getBetsZhuihao() == FrontConstant.LOTTERY_BET_APPEND)// 追号
		{
			log.setLiqType(UserCoinConstant.STOP_SIGNAL);
			log.setRemark(UserCoinConstant.STOP_SIGNAL_STR);
		} else// 非追号
		{
			log.setLiqType(UserCoinConstant.BETTING_CANCELLATION);
			log.setRemark(UserCoinConstant.BETTING_CANCELLATION_STR);
		}
		log.setBetsMode(bets.getBetsMode() + "");
		userService.updateUserCoin(vo);
		userCoinlogService.addUserCoinLog(log);
	}
}
