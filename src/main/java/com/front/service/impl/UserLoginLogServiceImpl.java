package com.front.service.impl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.front.dao.mapper.UserLoginLogMapper;
import com.front.model.UserLoginLog;
import com.front.service.UserLoginLogService;

@Service
public class UserLoginLogServiceImpl implements UserLoginLogService
{
    @Autowired
    private UserLoginLogMapper userLoginLogMapper;
 

    @Override
    public void recordLoginLog(UserLoginLog record)
    {
        userLoginLogMapper.recordLoginLog(record);
    }


	@Override
	public void recordLogOut(UserLoginLog log) {
      	this.userLoginLogMapper.recordLogOut(log);
	}


}
