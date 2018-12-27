package com.front.service;

import com.front.model.User;

/***
 * 用户代理服务
 * @author huang
 *
 */
public interface UserProxyService {

	  /***
	   *  添加代理
	   * @param user
	   * @throws Exception
	   */
	  public void createProxy(User user)throws Exception;
	  
	  
	  /***
	   *  添加代理
	   * @param user
	   * @throws Exception
	   */
	  public void register(User parent,User user)throws Exception;
	  
	  
	  
	  /***
	   * 为下级代理充值
	   * @param user
	   * @throws Exception
	   */
	  public void chargeSubProxy(User parent,User user,double coin)throws Exception;
}
