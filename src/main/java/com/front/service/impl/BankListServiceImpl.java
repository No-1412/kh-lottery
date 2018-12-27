package com.front.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.front.dao.mapper.BankListMapper;
import com.front.model.BankList;
import com.front.service.BankListService;

/**
 * 
 * BankListServiceImpl.java
 * <p>Copyright: Copyright (c) 2015 <p> 
 * <p>Company: xinghuo</p>
 *  @author    SeanXiao
 *  @version   1.0
 */
@Service
public class BankListServiceImpl implements BankListService
{
    @Autowired
    private BankListMapper bankListMapper;
    
    public int deleteByPrimaryKey(Integer id)
    {
        return bankListMapper.deleteByPrimaryKey(id);
    }

    public int insert(BankList record)
    {
        return bankListMapper.insert(record);
    }

    public BankList selectByPrimaryKey(Integer id)
    {
        return bankListMapper.selectByPrimaryKey(id);
    }
    
    public List<BankList> selectAllBank()
    {
        return bankListMapper.selectAllBank();
    }

    public int updateByPrimaryKey(BankList record)
    {
        return bankListMapper.updateByPrimaryKey(record);
    }
}
