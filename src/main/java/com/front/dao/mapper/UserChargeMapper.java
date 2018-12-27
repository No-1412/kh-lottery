package com.front.dao.mapper;

import com.front.model.UserCharge;

public interface UserChargeMapper {

    void insert(UserCharge record)throws Exception;

    void onLineCharge(UserCharge record)throws Exception;

    UserCharge queryUserCharge(String chargeOrder);
}