package com.front.model;

import java.util.Date;

public class UserCharge {
	
    private Integer id;

    private String chargeOrder;

    private Integer chargeNum;

    private String uid;

    private String uname;

    private Double account;

    private Date chargeDate;

    private String chargeIp;

    private Integer chargeAccount;

    private Double actualAccount;

    private String status;

    private String remark;
    
    private int chargeType;

    private Integer isDelete;

    private Date successDate;

    
    public void setChargeType(int chargeType) {
		this.chargeType = chargeType;
	}
    
    public int getChargeType() {
		return chargeType;
	}
    
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getChargeOrder() {
        return chargeOrder;
    }

    public void setChargeOrder(String chargeOrder) {
        this.chargeOrder = chargeOrder == null ? null : chargeOrder.trim();
    }

    public Integer getChargeNum() {
        return chargeNum;
    }

    public void setChargeNum(Integer chargeNum) {
        this.chargeNum = chargeNum;
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid == null ? null : uid.trim();
    }

    public String getUname() {
        return uname;
    }

    public void setUname(String uname) {
        this.uname = uname == null ? null : uname.trim();
    }

    public Double getAccount() {
        return account;
    }

    public void setAccount(Double account) {
        this.account = account;
    }

    public Date getChargeDate() {
        return chargeDate;
    }

    public void setChargeDate(Date chargeDate) {
        this.chargeDate = chargeDate;
    }

    public String getChargeIp() {
        return chargeIp;
    }

    public void setChargeIp(String chargeIp) {
        this.chargeIp = chargeIp == null ? null : chargeIp.trim();
    }

    public Integer getChargeAccount() {
        return chargeAccount;
    }

    public void setChargeAccount(Integer chargeAccount) {
        this.chargeAccount = chargeAccount;
    }

    public Double getActualAccount() {
        return actualAccount;
    }

    public void setActualAccount(Double actualAccount) {
        this.actualAccount = actualAccount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status == null ? null : status.trim();
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark == null ? null : remark.trim();
    }

    public Integer getIsDelete() {
        return isDelete;
    }

    public void setIsDelete(Integer isDelete) {
        this.isDelete = isDelete;
    }

    public Date getSuccessDate() {
        return successDate;
    }

    public void setSuccessDate(Date successDate) {
        this.successDate = successDate;
    }
}