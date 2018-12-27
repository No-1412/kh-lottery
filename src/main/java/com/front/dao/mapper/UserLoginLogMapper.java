package com.front.dao.mapper;


import com.front.model.UserLoginLog;

public interface UserLoginLogMapper {
  
    /**
     * 新增日志
     * @param record
     * @return
     */
    void recordLoginLog(UserLoginLog record);
    
    /**
     * 
     * @param log
     */
	public void recordLogOut(UserLoginLog log);
    
}