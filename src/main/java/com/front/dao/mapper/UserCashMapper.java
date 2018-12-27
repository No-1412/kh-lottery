package com.front.dao.mapper;

import com.front.model.UserCash;

public interface UserCashMapper
{
	
    int deleteByPrimaryKey(Integer id);

    int doCash(UserCash record);

    int insertSelective(UserCash record);

    UserCash selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(UserCash record);

    int updateByPrimaryKey(UserCash record);
}