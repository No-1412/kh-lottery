package com.front.dao.mapper;

import com.front.model.User;


public interface UserMapper {
    
    public User findByUsername(String userName);
    
    public void createUser(User user);
    
    public User findById(Integer id);
    
    public void updateByPrimaryKeySelective(User user);
    
    public void updateByPrimaryKey(User user);
    
    public void updateUserOffline(User user);
    
    public User queryUserBetInfo(Integer userId);
    
}