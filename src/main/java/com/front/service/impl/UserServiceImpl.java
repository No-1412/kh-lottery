package com.front.service.impl;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.front.common.MD5Util;
import com.front.common.StringUtils;
import com.front.constant.FrontConstant;
import com.front.constant.UserConstant; 
import com.front.dao.mapper.UserMapper;
import com.front.model.User;
import com.front.model.UserLoginLog;
import com.front.service.UserLoginLogService;
import com.front.service.UserService;

@Service
public class UserServiceImpl implements UserService {
	
	
	@Autowired
	private UserMapper userMapper;

    @Autowired
    private UserLoginLogService userLoginService;

	public User findByUserName(String userName) {
		return userMapper.findByUsername(userName);
	}

	/**
	 * 创建用户
	 * 
	 * @param user
	 */
	public void createUser(User user) {
		// 加密密码
		user.setUserPassword(MD5Util.MD5(user
				.getUserPassword()));
		userMapper.createUser(user);
	}

	@Override
	public User findByID(Integer id) {
		return userMapper.findById(id);
	}

	@Override
	public void updateUser(User user) {
		userMapper.updateByPrimaryKeySelective(user);
	}

	/***
	 * 更新用户账户余额
	 * 
	 * @param user
	 * @throws Exception
	 */
	public void updateUserCoin(User user) throws Exception {
		userMapper.updateByPrimaryKeySelective(user);
	}

	@Override
	public void updateUserOnline(User user) {
		user.setLastLogindate(new Date());
		user.setIsOnline(UserConstant.USER_ON_LINE);
		userMapper.updateByPrimaryKeySelective(user);
	}

	@Override
	public void updateUserOffline(User user) {
		user.setIsOnline(UserConstant.USER_OFF_LINE);
        userMapper.updateUserOffline(user);
        UserLoginLog log = new UserLoginLog();
        log.setSessionId(user.getSessionId());
        this.userLoginService.recordLogOut(log);
	}

	@Override
	public User queryUserBetInfo(int id) {
		return userMapper.queryUserBetInfo(id);
	}
}
