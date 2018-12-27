package com.front.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.front.common.SiteUtil;
import com.front.constant.ReportConstant;
import com.front.constant.UserCoinConstant;
import com.front.dao.mapper.UserRelationMapper;
import com.front.model.User; 
import com.front.model.UserCoinLog;
import com.front.model.UserRelation;
import com.front.service.ReportService; 
import com.front.service.UserCoinLogService;
import com.front.service.UserProxyService;
import com.front.service.UserService;

@Service
public class UserProxyServiceImpl implements UserProxyService {

	@Autowired
	private UserRelationMapper userRelationMapper;

	@Autowired
	private UserService userService;

	@Autowired
	private ReportService reportService;

	@Autowired
	private UserCoinLogService userCoinLogService;

	@Override
	public void createProxy(User user) throws Exception {
		String userId = this.reportService.queryCmsSeq(ReportConstant.USER);
		User superiorProxy = SiteUtil.getLoginUserObject();
		user.setUid(userId);
		userService.createUser(user);// 添加用户
		Date date = new Date();
		UserRelation relation = new UserRelation();
		relation.setIsParent(0);
		relation.setPuid(superiorProxy.getUid());
		relation.setPid(superiorProxy.getId());
		relation.setUid(user.getId());
		relation.setUuid(userId);
		relation.setCreateUser(superiorProxy.getId());
		relation.setModifyUser(superiorProxy.getId());
		relation.setCreateDate(date);
		relation.setModifyDate(date);
		userRelationMapper.insert(relation);
		userRelationMapper.saveParentUserRelation(relation);
	}

	@Override
	public void chargeSubProxy(User currentUser, User user, double coin) throws Exception {
		currentUser.setCoin(currentUser.getCoin() - coin);
		this.userService.updateUserCoin(currentUser);
		user.setCoin(user.getCoin() + coin);
		this.userService.updateUserCoin(user);
		String coinOrder = this.reportService.queryCmsSeq(ReportConstant.RECHARGE);
		List<UserCoinLog> coinLogs = new ArrayList<UserCoinLog>();
		UserCoinLog src = new UserCoinLog();// 当前用户的帐变信息
		UserCoinLog target = new UserCoinLog();// 目标用户的帐变信息
		src.setCoinOrder(coinOrder);
		src.setCoin(0 - coin);
		src.setLiqType(UserCoinConstant.SUB_PROXY_DEDUCTION);
		src.setRemark("为下级会员[“" + user.getUid() + "”]" + UserCoinConstant.SUB_PROXY_DEDUCTION_STR);
		src.setUserCoin(currentUser.getCoin());
		initUserCoinLog(currentUser, currentUser, src);
		initUserCoinLog(user, currentUser, target);
		coinLogs.add(src);
		target.setCoinOrder(coinOrder);
		target.setCoin(coin);
		target.setLiqType(UserCoinConstant.HIGHER_RECHARGE);
		target.setRemark("上级代理[“" + currentUser.getUid() + "”]" + UserCoinConstant.HIGHER_RECHARGE_STR);
		target.setUserCoin(user.getCoin());
		coinLogs.add(target);
		userCoinLogService.addUserCoinLogBatch(coinLogs);

	}

	/***
	 * 初始化用户账单信息
	 * 
	 * @param target
	 * @param currentUser
	 * @param src
	 */
	private void initUserCoinLog(User target, User currentUser, UserCoinLog src) {
		src.setFcoin(target.getFcoin());
		src.setUid(target.getId());
		src.setUname(target.getLoginName());
		src.setUserId(target.getUid());
		src.setActionUid(currentUser.getId());
		src.setActionAddr(SiteUtil.getIpAddr());
		src.setActionDate(new Date());
	}

	@Override
	public void register(User superiorProxy, User user) throws Exception {
		String userId = this.reportService.queryCmsSeq(ReportConstant.USER);
		user.setUid(userId);
		userService.createUser(user);// 添加用户
		if (superiorProxy == null) {
			return;
		}
		Date date = new Date();
		UserRelation relation = new UserRelation();
		relation.setIsParent(0);
		relation.setPuid(superiorProxy.getUid());
		relation.setPid(superiorProxy.getId());
		relation.setUid(user.getId());
		relation.setUuid(userId);
		relation.setCreateUser(superiorProxy.getId());
		relation.setModifyUser(superiorProxy.getId());
		relation.setCreateDate(date);
		relation.setModifyDate(date);
		userRelationMapper.insert(relation);
		userRelationMapper.saveParentUserRelation(relation);

	}
}
