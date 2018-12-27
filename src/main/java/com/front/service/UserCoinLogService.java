package com.front.service;

import java.util.List;

import com.front.model.UserCoinLog;

 

public interface UserCoinLogService {

	 /**
	  *  添加用户帐变记录
	  * @param log
	  * @throws SystemDBException
	  */
	 public void addUserCoinLog(UserCoinLog log)throws Exception;
	 
	 /***
	  * 批量添加用户帐变信息
	  * @param log
	  * @throws SystemDBException
	  */
	 public void addUserCoinLogBatch(List<UserCoinLog> logs)throws Exception;
}
