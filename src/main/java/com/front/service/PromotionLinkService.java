package com.front.service;

import com.front.model.PromotionLinkVo;

public interface PromotionLinkService {

	/**
	 * 
	 * @param link
	 * @throws Exception
	 */
	public void addPromotionLink(PromotionLinkVo link)throws Exception;
	
	
	/**
	 * 
	 * @param link
	 * @throws Exception
	 */
	public void updatePromotionLink(PromotionLinkVo link)throws Exception;
	
	
	
	/**
	 * 
	 * @param link
	 * @throws Exception
	 */
	public void delPromotionLink(PromotionLinkVo link)throws Exception;
	
	
	/**
	 * 
	 * @param link
	 * @throws Exception
	 */
	public PromotionLinkVo queryPromotionLink(int linkId)throws Exception;
	
}
