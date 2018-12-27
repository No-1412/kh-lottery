package com.front.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.front.common.SiteUtil;
import com.front.constant.UserCoinConstant;
import com.front.dao.mapper.UserCashMapper;
import com.front.model.User;
import com.front.model.UserCash;
import com.front.model.UserCoinLog;
import com.front.service.ReportService;
import com.front.service.UserCashService;
import com.front.service.UserCoinLogService;
import com.front.service.UserService;

@Service
public class UserCashServiceImpl implements UserCashService
{
    @Autowired
    private UserCashMapper userCashMapper;
    
    @Autowired
	private UserCoinLogService userCoinlogService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private ReportService reportService;

    public int doCash(User vo,UserCash record) throws Exception{ 
    	if(vo.getCoin()<0)
    	{
    		return -1;
    	}
    	String cachOrder =reportService.queryCmsSeq("WITHDRAW_CASH");
		UserCoinLog log = new UserCoinLog();
		log.setUid(vo.getId());
		log.setUname(vo.getLoginName());
		log.setCoinOrder(cachOrder);
		log.setCoin(record.getAmount());
		log.setFcoin(vo.getFcoin()==null?0:vo.getFcoin()); 
		log.setUserCoin(vo.getCoin()==null?0:vo.getCoin());
		log.setLiqType(UserCoinConstant.USER_TOCASH);
		log.setActionAddr(SiteUtil.getIpAddr());
		log.setRemark(UserCoinConstant.USER_TOCASH_STR);
		log.setActionUid(vo.getId());
		log.setUserId(vo.getUid());
		
		vo.setCoin(vo.getCoin() - record.getAmount());
		vo.setFcoin((double)record.getAmount());
		userService.updateUserCoin(vo);
		userCoinlogService.addUserCoinLog(log);
    	
		record.setApplyOrder(cachOrder);
    	return userCashMapper.doCash(record);
    }
}
