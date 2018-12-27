package com.front.service;


import com.front.model.UserLoginLog;

/**
 * 会员登陆日志接口
 * UserLoginLogService.java
 * <p>Copyright: Copyright (c) 2015 <p> 
 * <p>Company: daoyi</p>
 *  @author    SeanXiao
 *  @version   1.0
 */
public interface UserLoginLogService
{
 
    
    /**
     * 新增会员日志
     * @param record
     * @return
     */
    public void recordLoginLog(UserLoginLog record);
    
    /**
     * 修改会员退出时间
     * @param log
     */
    public void recordLogOut(UserLoginLog log);
 
 
}
