package com.front.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.front.dao.mapper.PromotionLinkMapper;
import com.front.model.PromotionLinkVo;
import com.front.service.PromotionLinkService;

@Service
public class PromotionLinkServiceImpl implements PromotionLinkService {

	@Autowired
	private PromotionLinkMapper promotionLink;
	
	
	@Override
	public void addPromotionLink(PromotionLinkVo link) throws Exception {
		promotionLink.addPromotionLink(link);
	}

	@Override
	public void updatePromotionLink(PromotionLinkVo link) throws Exception {
		promotionLink.updatePromotionLink(link);
	}

	@Override
	public void delPromotionLink(PromotionLinkVo link) throws Exception {
		promotionLink.delPromotionLink(link);
	}

	@Override
	public PromotionLinkVo queryPromotionLink(int linkId) throws Exception {
		return promotionLink.queryPromotionLink(linkId);
	}

}
