package com.front.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.front.dao.mapper.UserCoinLogMapper;
import com.front.model.UserCoinLog;
import com.front.service.UserCoinLogService;

@Service
public class UserCoinLogServiceImpl implements UserCoinLogService{

	@Autowired
	private UserCoinLogMapper userCoinlogMapper;
	
	
	@Override
	public void addUserCoinLog(UserCoinLog log) throws Exception {
		userCoinlogMapper.addUserCoinLog(log);
	}


	@Override
	public void addUserCoinLogBatch(List<UserCoinLog> logs) throws Exception {
      userCoinlogMapper.addUserCoinLogBatch(logs);		
	}

}
