package com.front.model;

import java.util.Date;


/***
 * @desc
 *    用户帐变记录流水
 * @author huang
 *
 */
public class UserCoinLog extends BaseModel{

	private int id;

	private int lotteryId;

	private int playId;
	
	private String lotteryNo;
	
	private String betsMode;//投注模式

	private String coinOrder;//帐变订单号
	
	private int uid;

	private String userId;

	private String uname;

	private double coin;

	private double userCoin;

	private double fcoin;

	private String liqType;//类型

	private String remark;

	private int actionUid;

	private Date actionDate;

	private String actionAddr;
	
	private String extendfield1;
	
	private String extendfield2;
	
	private String extendfield3;
	 
	
	public void setLotteryNo(String lotteryNo) {
		this.lotteryNo = lotteryNo;
	}
	
	public String getLotteryNo() {
		return lotteryNo;
	}
	
    public void setBetsMode(String betsMode) {
		this.betsMode = betsMode;
	}
    
    public String getBetsMode() {
		return betsMode;
	}
	
	public String getExtendfield1() {
		return extendfield1;
	}

	public void setExtendfield1(String extendfield1) {
		this.extendfield1 = extendfield1;
	}

	public String getExtendfield2() {
		return extendfield2;
	}

	public void setExtendfield2(String extendfield2) {
		this.extendfield2 = extendfield2;
	}

	public String getExtendfield3() {
		return extendfield3;
	}

	public void setExtendfield3(String extendfield3) {
		this.extendfield3 = extendfield3;
	}

	public void setCoinOrder(String coinOrder) {
		this.coinOrder = coinOrder;
	}

	public String getCoinOrder() {
		return coinOrder;
	}


	public int getLotteryId() {
		return lotteryId;
	}

	public void setLotteryId(int lotteryId) {
		this.lotteryId = lotteryId;
	}

	public int getPlayId() {
		return playId;
	}

	public void setPlayId(int playId) {
		this.playId = playId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getUserId() {
		return userId;
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

	public String getUname() {
		return uname;
	}

	public void setUname(String uname) {
		this.uname = uname;
	}

	public double getCoin() {
		return coin;
	}

	public void setCoin(double coin) {
		this.coin = coin;
	}

	public double getUserCoin() {
		return userCoin;
	}

	public void setUserCoin(double usercoin) {
		this.userCoin = usercoin;
	}

	public double getFcoin() {
		return fcoin;
	}

	public void setFcoin(double fcoin) {
		this.fcoin = fcoin;
	}

	public String getLiqType() {
		return liqType;
	}

	public void setLiqType(String liqType) {
		this.liqType = liqType;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public int getActionUid() {
		return actionUid;
	}

	public void setActionUid(int actionUid) {
		this.actionUid = actionUid;
	}

	public Date getActionDate() {
		return actionDate;
	}

	public void setActionDate(Date actionDate) {
		this.actionDate = actionDate;
	}

	public String getActionAddr() {
		return actionAddr;
	}

	public void setActionAddr(String actionAddr) {
		this.actionAddr = actionAddr;
	} 
}
