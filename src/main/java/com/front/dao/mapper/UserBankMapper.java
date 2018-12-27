package com.front.dao.mapper;

import java.util.List;

import com.front.model.UserBank;

/**
 * 用户银行数据层接口
 * UserBankMapper.java
 * <p>Copyright: Copyright (c) 2015 <p> 
 * <p>Company: xinghuo</p>
 *  @author    SeanXiao
 *  @version   1.0
 */
public interface UserBankMapper {

    int insert(UserBank record);

    UserBank selectByPrimaryKey(Integer id);
    
    UserBank selectByKeyAndUid(UserBank userBank);
    
    List<UserBank> selectUserBankByUserId(String userId);
    
    List<UserBank> selectByUserId(String userId);

    int updateByPrimaryKey(UserBank record);
}