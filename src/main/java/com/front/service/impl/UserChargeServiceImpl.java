package com.front.service.impl;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.front.common.SiteUtil;
import com.front.common.StringUtils;
import com.front.constant.UserCoinConstant;
import com.front.dao.mapper.UserChargeMapper;
import com.front.model.User;
import com.front.model.UserCharge;
import com.front.model.UserCoinLog;
import com.front.service.ReportService;
import com.front.service.UserChargeService;
import com.front.service.UserCoinLogService;
import com.front.service.UserService;

@Service
public class UserChargeServiceImpl implements UserChargeService
{
	@Autowired
    private UserChargeMapper userChargeMapper;
    
    @Autowired
	private UserCoinLogService userCoinlogService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private ReportService reportService;
	
    public void insert(UserCharge record) throws Exception{
    	 userChargeMapper.insert(record);
    }

	@Override
	public void charge(UserCharge record) throws Exception {
		  User user = userService.findByUserName(record.getUname());
		  String rate = reportService.queryCmsConf("TOP_GIFT");
		  UserCoinLog coinLog = new UserCoinLog();
		  Date date = new Date();
		  double coin =  record.getActualAccount()*(1+StringUtils.str2Double(rate)/100);
		  coinLog.setCoin(coin);
		  user.setCoin(user.getCoin()+coin);
		  coinLog.setUserCoin(user.getCoin());
		  coinLog.setFcoin(user.getFcoin());
		  coinLog.setUid(user.getId());
		  coinLog.setUname(user.getLoginName());
		  coinLog.setUserId(user.getUid());
		  coinLog.setActionAddr(SiteUtil.getIpAddr());
		  coinLog.setLiqType(UserCoinConstant.USER_ONLINE_RECHARGE);
		  coinLog.setRemark(UserCoinConstant.USER_ONLINE_RECHARGE_STR);
		  coinLog.setCoinOrder(record.getChargeOrder());
		  coinLog.setActionDate(date);
		  
		  record.setActualAccount(coin);
		  record.setSuccessDate(date);
		  record.setStatus("1");
		  userChargeMapper.onLineCharge(record);//修改用户充值订单状态
		  
	      userService.updateUserCoin(user);//修改用户余额
		  
		  userCoinlogService.addUserCoinLog(coinLog);//添加帐变记录
	}

	@Override
	public UserCharge queryUserCharge(String chargeOrder) throws Exception {
		return userChargeMapper.queryUserCharge(chargeOrder);
	}
    
 
}
