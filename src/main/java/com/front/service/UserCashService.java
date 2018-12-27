package com.front.service;

import com.front.model.User;
import com.front.model.UserCash;

public interface UserCashService
{
	public int doCash(User user,UserCash record) throws Exception;
}
