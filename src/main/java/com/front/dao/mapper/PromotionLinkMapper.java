package com.front.dao.mapper;

import org.apache.ibatis.annotations.Param;

import com.front.model.PromotionLinkVo;

public interface PromotionLinkMapper {

	public void addPromotionLink(@Param("link")PromotionLinkVo link) throws Exception;

	public void updatePromotionLink(@Param("link")PromotionLinkVo link) throws Exception;

	public void delPromotionLink(@Param("link")PromotionLinkVo link) throws Exception;
	
	public PromotionLinkVo queryPromotionLink(int id);
}
