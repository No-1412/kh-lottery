package com.front.service;

import com.front.model.UserCharge;

public interface UserChargeService
{
	// 保存充值订单
	public void insert(UserCharge record) throws Exception;
	
	// 充值
	public void charge(UserCharge record) throws Exception;
	
	//根据订单号获取用户的充值记录
	public UserCharge queryUserCharge(String chargeOrder) throws Exception;
}
