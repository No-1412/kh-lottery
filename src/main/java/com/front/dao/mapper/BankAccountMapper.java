package com.front.dao.mapper;

import com.front.model.BankAccount;

public interface BankAccountMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(BankAccount record);

    int insertSelective(BankAccount record);

    BankAccount selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(BankAccount record);

    int updateByPrimaryKey(BankAccount record);
}