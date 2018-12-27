package com.front.dao.mapper;

import org.apache.ibatis.annotations.Param;

import com.front.model.UserRelation;

public interface UserRelationMapper {
    
	int deleteByPrimaryKey(Integer id);

    int insert(UserRelation record);

    int insertSelective(UserRelation record);

    UserRelation selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(UserRelation record);

    int updateByPrimaryKey(UserRelation record);
    
    /***
     *  拷贝父id的用户关系数据
     * @param parentId
     * @throws Exception
     */
    public void saveParentUserRelation(@Param("relation")UserRelation relation)throws Exception;
    
    /**
     * 通过用户Id查询直属上级
     * @param uid
     * @return
     */
    UserRelation selectParentByUid(Integer id);
}