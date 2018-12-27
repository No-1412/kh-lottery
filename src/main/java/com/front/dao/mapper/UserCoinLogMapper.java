package com.front.dao.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.front.model.UserCoinLog;

 

 

public interface UserCoinLogMapper { 
	 /**
	  *  添加用户帐变记录
	  * @param log
	  * @throws SystemDBException
	  */ 
	 public void addUserCoinLog(@Param("coin")UserCoinLog log)throws Exception;
	 
	 
	 /***
	  * 批量添加用户帐变信息
	  * @param log
	  * @throws SystemDBException
	  */
	 public void addUserCoinLogBatch(@Param("coins")List<UserCoinLog> logs)throws Exception;
}
