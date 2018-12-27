package com.front.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.front.common.SiteUtil;
import com.front.common.StringUtils;
import com.front.constant.ReportConstant;
import com.front.constant.UserCoinConstant;
import com.front.dao.mapper.UserBankMapper;
import com.front.model.User;
import com.front.model.UserBank;
import com.front.model.UserCoinLog;
import com.front.service.ReportService;
import com.front.service.UserBankService;
import com.front.service.UserCoinLogService;
import com.front.service.UserService;
import com.google.common.collect.Maps;

@Service
public class UserBankServiceImpl implements UserBankService
{
    @Autowired
    private UserBankMapper userBankMapper;
    
    @Autowired
    private UserCoinLogService coinLogService;

    @Autowired
    private ReportService reportService;
    
    @Autowired
    private UserService userService;
    
    
    public void bindUserBank(UserBank record,boolean userCoin)throws Exception
    {   
    	Map<String,Object>param =Maps.newHashMap();
    	param.put("id",record.getId());
    	param.put("account", record.getAccount());
    	this.reportService.verification("verBindUserBank", param);
    	userBankMapper.insert(record);
    	if(userCoin)
    	{
        	param.put("bankId", record.getBankid());
    	    Map<String,Object>bankInfo= this.reportService.querySingleResult("queryBindBankInfo", param);
    	    String giftMoney =  StringUtils.obj2String(bankInfo.get("giftMoney"));
    	    if(StringUtils.equals(giftMoney, "Y"))
    	    {
    	    	double money = StringUtils.str2Double(bankInfo.get("gifts")+"");
    	    	if(money>0)
    	    	{
    	    		User user =  SiteUtil.getLoginUserObject();
    	    		user.setCoin(user.getCoin()+money);
    	    		UserCoinLog coinLog = new UserCoinLog();
    	    		coinLog.setActionAddr(SiteUtil.getIpAddr());
    	    		coinLog.setUid(user.getId());
    	    		coinLog.setUserId(user.getUid());
    	    		coinLog.setUname(user.getLoginName());
    	    		coinLog.setCoin(money);
    	    		coinLog.setUserCoin(user.getCoin());
    	    		coinLog.setFcoin(user.getFcoin());
    	    		coinLog.setActionAddr(SiteUtil.getIpAddr());
    	    		coinLog.setActionUid(user.getId());
    	    	    coinLog.setLiqType(UserCoinConstant.FEEDBACK);
    	    	    coinLog.setRemark(UserCoinConstant.FEEDBACK_STR);
    	    	    coinLog.setCoinOrder(this.reportService.queryCmsSeq(ReportConstant.FEEDBACK));
    	    		userService.updateUserCoin(user);
    	        	coinLogService.addUserCoinLog(coinLog);
    	    	}
    	    }
    	  	
    	}
    }

    public UserBank selectByPrimaryKey(Integer id)
    {
        return userBankMapper.selectByPrimaryKey(id);
    }

    public List<UserBank> selectByUserId(String userId)
    {
        return userBankMapper.selectByUserId(userId);
    }
    
    public List<UserBank> selectUserBankByUserId(String userId)
    {
        return userBankMapper.selectUserBankByUserId(userId);
    }


    public int updateByPrimaryKey(UserBank record)
    {
        return userBankMapper.updateByPrimaryKey(record);
    }
    
    public UserBank selectByKeyAndUid(UserBank userBank)
    {
    	 return userBankMapper.selectByKeyAndUid(userBank);
    }

}
