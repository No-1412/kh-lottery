package com.front.service;

import java.util.List;

import com.front.model.BankList;

public interface BankListService
{
    int deleteByPrimaryKey(Integer id);

    int insert(BankList record);

    BankList selectByPrimaryKey(Integer id);
    
    List<BankList> selectAllBank();

    int updateByPrimaryKey(BankList record);
}
