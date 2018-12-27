package com.front.controller;

import java.io.IOException;
import java.sql.Timestamp;
import java.text.MessageFormat;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.front.annotation.LoginRule;
import com.front.common.DateUtils;
import com.front.common.JsonUtil;
import com.front.common.MD5Util;
import com.front.common.NumberTools;
import com.front.common.SiteUtil;
import com.front.common.StringUtils;
import com.front.constant.FrontConstant;
import com.front.exception.FrontException;
import com.front.exception.LotteryBetsException; 
import com.front.model.LotteryBets;
import com.front.model.User;
import com.front.service.LotteryBetService;
import com.google.common.collect.Maps;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
  
/***
 * 
 * @author huang
 *
 */
@Controller
public class LotteryController extends BaseController {

	@Autowired
	public LotteryBetService lotteryBetService;
	
	@Value("${platform.bet.externalkey}")
	private String crypt;

	/***
	 *  根据彩票的id，时间获取彩票的开奖期号
	 * @param lotteryId
	 * @return
	 * @throws Exception
	 */
	private Map<String, Object> getCurrentLottery(Integer lotteryId) throws Exception {
		Date date = new Date();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("lottery_id", lotteryId);
		map.put("lottery_time", DateUtils.getTimeString(date));
		Map<String, Object> currentLottery = reportService.querySingleResult("getCurrentLottery", map);
		currentLottery.put("lottery_date", DateUtils.getDateString(date));
		currentLottery.put("curr_time",((Timestamp) currentLottery.get("curr_time")).getTime());
		return currentLottery;
	}


	@RequestMapping(value = "/content/lottery/{type}/{ssc}", method = RequestMethod.GET)
	public void contentLottery(@PathVariable("type") String type,@PathVariable("ssc")String ssc,HttpServletResponse resp) throws Exception 
	{  
		Map<String,Object>result= Maps.newHashMap();
		Map<String,Object>param= Maps.newHashMap();
		param.put("hash", type+ "/" + ssc);
		List<Map> data = (List<Map>)this.reportService.getReportResult("getLotteryByHash", param);
		Map<String,Object>lottery = data.get(0); 
	    result.put("lottery", lottery);
		Map currentLottery = getCurrentLottery(StringUtils.str2Int(lottery.get("id")+""));
		result.put("currentLottery", currentLottery);
		//result.put("user_fandian", this.getLoginUserObject().getFandian());
		this.renderMsg(resp, FrontConstant.SUCCESS_CODE, StringUtils.EMPTY,result);
	}

	/**
	 * 根据玩法组获取该玩法组下的所有玩法
	 * 
	 * @param req
	 * @param resp
	 * @throws Exception
	 */
	@RequestMapping(value = "/lottery/play", method = RequestMethod.GET)
	public void getPlays(HttpServletRequest req, HttpServletResponse resp)throws Exception
	{
		Map<String, Object> playsMap = Maps.newHashMap();
		playsMap.put("retcode", 0);
		playsMap.put("data", reportService.getReportResult("getPlayByGroupId", this.buildQueryMap(req)));
		this.renderJson(resp, new Gson().toJson(playsMap));
	}
 
	/**
	 * 获取到当前彩票时间
	 */
	@RequestMapping(value = "/lottery/currenttime", method = RequestMethod.GET)
	public void getCurrentLotteryTime(HttpServletRequest req,HttpServletResponse resp) throws Exception 
	{
		Map<String, Object> errInfo = Maps.newHashMap();
		String lotteryId = req.getParameter("lotteryId");
		Integer lotteryId_int = StringUtils.str2Int(lotteryId);
		Map currentLottery = getCurrentLottery(lotteryId_int); 
		errInfo.put("retcode", 0);
		errInfo.put("data", currentLottery);
		this.renderJson(resp, new Gson().toJson(errInfo));
	}

	@RequestMapping(value = "/lottery/submit", method = RequestMethod.POST)
	@LoginRule
	public void bet(HttpServletRequest req, HttpServletResponse resp) throws Exception
    {
		String data = req.getParameter("betsData");  
		String betsData =new String(Base64.getDecoder().decode(data.getBytes("utf-8")),"utf-8");
		List<LotteryBets> lotteryBets = JsonUtil.str2List(betsData, LotteryBets.class);
		User user = super.getLoginUserObject();
		Map<String, Object> errInfo = Maps.newHashMap();
		if (lotteryBets != null) {
			LotteryBets bet =null;
	        String sb = null;
			Date betDate = new Date();
			String betsAddr = SiteUtil.getIpAddr(req);
			for (int i = 0; i < lotteryBets.size(); i++) {
				bet = lotteryBets.get(i);
				bet.setBetsIsdelete(FrontConstant.LOTTERY_BETS_NORMAL);
				bet.setUid(user.getUid());
				bet.setUname(user.getLoginName());
				bet.setBetsTime(betDate);
				bet.setBetsAddr(betsAddr);
				sb=MessageFormat.format(crypt, new Object[]{
						bet.getBetsIdentification(),
						bet.getBetsData(),
						NumberTools.formatNum(bet.getBetsAmount(),"######0.0000"),
						NumberTools.formatNum(bet.getBetsMode(),"######0.0000"),
						NumberTools.formatNum(bet.getBetsBonusprop(),"######0.0000"),
						NumberTools.formatNum(bet.getBetsFandian(),"######0.0000"),
						bet.getLotteryPlayid(),
						bet.getLotteryNo(),
						bet.getBetsWeishu(),
						bet.getLotteryId()});
				if(!StringUtils.equalsIgnoreCase(MD5Util.MD5(sb), bet.getCheckSum()))
				{
					throw LotteryBetsException.makeBetsDataAbnormal();
				} 
			}
			try {
				lotteryBetService.saveLotteryBets(user,lotteryBets);
				errInfo.put("retcode", 0);
			} catch (LotteryBetsException e) {
				errInfo.put("retcode",  e.getMessage()==null?e.getErrorCode():e.getMessage());
			} catch (Exception e) {
				errInfo.put("retcode",  "您已经投注成功， 请勿重复投注！");
			}
		}
		this.renderJson(resp, new Gson().toJson(errInfo));
	}

	@RequestMapping(value = "/lottery_bets/detail", method = RequestMethod.GET)
	@LoginRule
	public @ResponseBody Map rechargeSubmit(HttpServletRequest req, HttpServletResponse resp, ModelMap modelMap) throws Exception 
	{
		return reportService.querySingleResult("getLotteryBetDetail", this.buildQueryMap(req));
	}

	/**
	 * 获取最近的彩票记录
	 * 
	 * @param req
	 * @param resp
	 * @throws Exception
	 */
	@RequestMapping(value = "/lottery/history", method = RequestMethod.GET)
	public void getHistory(HttpServletRequest req, HttpServletResponse resp)throws Exception
	{
		User user = super.getLoginUserObject();
		Map<String, Object> errInfo =  Maps.newHashMap();
		Map<String, Object> map =  Maps.newHashMap();
		map.put("user_id", user.getUid()); 
		errInfo.put("retcode", 0);
		errInfo.put("data", reportService.getReportResult("getLotteryHistory", map));
		this.renderJson(resp, new GsonBuilder().setDateFormat("HH:mm:ss").create().toJson(errInfo));
	}

	/**
	 * 判断当前时间是否在开奖间隔时间之内
	 * 
	 * @param req
	 * @param resp
	 * @throws Exception
	 */
	@RequestMapping(value = "/lottery/distance", method = RequestMethod.GET)
	public void isCurrentLotteryTimeDistance(HttpServletRequest req,
			HttpServletResponse resp) throws Exception {
		Map<String, Object> errInfo =  Maps.newHashMap();
		Map<String, Object> map = Maps.newHashMap();
		String lotteryId = req.getParameter("lotteryId");
		map.put("lottery_id", lotteryId); 
		errInfo.put("retcode", 0);
		errInfo.put("data", reportService.getReportResult("isCurrentLotteryTimeDistance", map));
		this.renderJson(resp, new Gson().toJson(errInfo));
	}


	/**
	 * 追号查询
	 * 
	 * @param req
	 * @param resp
	 * @throws Exception
	 */
	@RequestMapping(value = "/lottery/appendbet", method = RequestMethod.GET)
	public void queryAppendBet(HttpServletRequest req, HttpServletResponse resp)
			throws Exception {
		Map<String, Object> errInfo =  Maps.newHashMap();
		Map<String,Object>param = this.buildQueryMap(req);  
		errInfo.put("retcode", 0);
		errInfo.put("data", reportService.getReportResult("queryAppendBet",param ));
		this.renderJson(resp, new Gson().toJson(errInfo));
	}

	/**
	 * @desc 撤单
	 * @param req
	 * @param resp
	 * @throws Exception
	 */
	@RequestMapping(value = "/lottery/cancelLotteryBets", method = RequestMethod.GET)
	@LoginRule
	public void cancelLotteryBets(HttpServletRequest req,
			HttpServletResponse resp) throws Exception {
		Map<String, Object> errInfo = Maps.newHashMap();
		User vo = super.getLoginUserObject(true);
		String lotteryBetsId = req.getParameter("lotteryBetsId");// 校验是否超过撤单时间
		try {
			this.reportService.verification("verificationCancelBet", this.buildQueryMap(req));
			this.lotteryBetService.cancelLotteryBets(vo,StringUtils.str2Int(lotteryBetsId));
			errInfo.put("retcode", 0);
		} 
		catch (FrontException e) {
			errInfo.put("retcode", e.getErrorCode());
			errInfo.put("retmsg", e.getMessage());
		} 
		catch (Exception e) {
			errInfo.put("retcode", "-1");
			errInfo.put("retmsg", e.getMessage());
		}
		this.renderJson(resp, new Gson().toJson(errInfo));
	}
 
	/** 
	 * 查询历史开奖数据
	 * @throws SystemDBException
	 * @throws IOException
	 */
	@RequestMapping(value = "/lottery/queryHistoryLotteryData", method = RequestMethod.GET)
	public void queryHistoryLotteryData(HttpServletRequest req, HttpServletResponse resp) throws Exception 
	{
		Map<String, Object> param = this.buildQueryMap(req);
		this.renderMsg(resp, FrontConstant.SUCCESS_CODE, StringUtils.EMPTY, this.reportService.getReportResult("queryHistoryLotteryData", param));
	}
	
	
	/** 
	 * 根据彩票Id以及期数判断是否可以投注
	 * @throws SystemDBException
	 * @throws IOException
	 */
	@RequestMapping(value = "/lottery/betCheck", method = RequestMethod.GET)
	public void betCheckLimit(HttpServletRequest req, HttpServletResponse resp) throws Exception 
	{
		Map<String, Object> param = this.buildQueryMap(req);
		try
		{
			boolean bol =this.reportService.verification("checkLotteryBetsNo", param);
			if(bol)
			{
				this.renderMsg(resp, FrontConstant.SUCCESS_CODE, StringUtils.EMPTY, StringUtils.EMPTY);
			}
		}catch (FrontException e) {
			this.renderMsg(resp, FrontConstant.FAILED_CODE,e.getMessage() , StringUtils.EMPTY);
		}
	}
}
