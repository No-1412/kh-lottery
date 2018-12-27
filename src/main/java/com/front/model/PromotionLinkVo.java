package com.front.model;

import java.util.Date;

public class PromotionLinkVo implements java.io.Serializable{

	private int id ;
	
	private int uid ;
	
	private String userId ;
	
	private String promotionLinkName; //推广名称
	
	private int userType;  // 用户注册类型
	
	private double userRebate; // 用户的点数
	
	private int frequency ; // 最大使用次数 
	
	private String expire; // 到期时间
	
	private String promotionLink;
	
	private Date createDate;
	
	private int createUser;
	
	private Date modifyDate;
	
	private int modifyUser;
	
	
	
	public int getFrequency() {
		return frequency;
	}

	public void setFrequency(int frequency) {
		this.frequency = frequency;
	}

	public String getExpire() {
		return expire;
	}

	public void setExpire(String expire) {
		this.expire = expire;
	}

	public void setPromotionLinkName(String promotionLinkName) {
		this.promotionLinkName = promotionLinkName;
	}
	
	public String getPromotionLinkName() {
		return promotionLinkName;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getUid() {
		return uid;
	}

	public void setUid(int uid) {
		this.uid = uid;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public int getUserType() {
		return userType;
	}

	public void setUserType(int userType) {
		this.userType = userType;
	}

	public double getUserRebate() {
		return userRebate;
	}

	public void setUserRebate(double userRebate) {
		this.userRebate = userRebate;
	}

	public String getPromotionLink() {
		return promotionLink;
	}

	public void setPromotionLink(String promotionLink) {
		this.promotionLink = promotionLink;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public int getCreateUser() {
		return createUser;
	}

	public void setCreateUser(int createUser) {
		this.createUser = createUser;
	}

	public Date getModifyDate() {
		return modifyDate;
	}

	public void setModifyDate(Date modifyDate) {
		this.modifyDate = modifyDate;
	}

	public int getModifyUser() {
		return modifyUser;
	}

	public void setModifyUser(int modifyUser) {
		this.modifyUser = modifyUser;
	}
	
	
}
