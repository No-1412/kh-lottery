package com.front.service;

import com.front.model.User;


/**
 * 
 * UserServiceImpl.java
 * <p>Copyright: Copyright (c) 2015 <p> 
 * <p>Company: xinghuo</p>
 *  @author    SeanXiao
 *  @version   1.0
 */

public interface UserService
{

   /***
    * 根据用户查询
    * @param userName
    * @return
    */
    public User findByUserName(String userName);
    
    /***
     * 根据id查询
     * @param id
     * @return
     */
    public User findByID(Integer id);
    
    /**
     * 创建用户
     * @param user
     */
    public void createUser(User user);
    
    /**
     * 更新用户数据
     * @param user
     */
    public void updateUser(User user);
    
    /***
     *  更新用户账户余额 
     * @param user
     * @throws Exception
     */
    public void updateUserCoin(User user)throws Exception;
    
    
    /**
     *  根据用户改变用户在线状态
     * @param user
     * @param userStatus
     */
    public void updateUserOnline(User user);
    
    
    /**
     *  根据用户改变用户在线状态
     * @param user
     * @param userStatus
     */
    public void updateUserOffline(User user);
    
    /**
     * 
     * @param loginName
     * @return
     */
    public User queryUserBetInfo(int id);
    
}
