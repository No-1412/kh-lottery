package com.front.service;

import java.util.List;

import com.front.model.UserBank;

/**
 * 用户银行业务层接口
 * UserBankService.java
 * <p>Copyright: Copyright (c) 2015 <p> 
 * <p>Company: xinghuo</p>
 *  @author    SeanXiao
 *  @version   1.0
 */
public interface UserBankService
{
 
	
   public List<UserBank> selectUserBankByUserId(String userId);

    /**
     * 新增用户银行记录
     * @param record
     * @return
     */
    void bindUserBank(UserBank record,boolean userCoin)throws Exception;

    /**
     * 通过id查询银行记录
     * @param id
     * @return
     */
    UserBank selectByPrimaryKey(Integer id);
    
    /**
     * 通过id和用户id查询银行记录
     * @param id
     * @return
     */
    UserBank selectByKeyAndUid(UserBank userBank);
    
    /**
     * 通过用户Id查询用户银行列表
     * @param userId
     * @return
     */
    List<UserBank> selectByUserId(String userId);

    /**
     * 通过Id修改银行数据
     * @param record
     * @return
     */
    int updateByPrimaryKey(UserBank record);
}
