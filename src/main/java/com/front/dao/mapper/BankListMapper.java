package com.front.dao.mapper;

import java.util.List;

import com.front.model.BankList;

public interface BankListMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(BankList record);

    BankList selectByPrimaryKey(Integer id);
    
    List<BankList> selectAllBank();

    int updateByPrimaryKey(BankList record);
}