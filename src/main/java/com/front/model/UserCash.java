package com.front.model;

import java.util.Date;

public class UserCash {
    private Integer id;

    private String applyOrder;
    
    private String uid;

    private String uname;

    private Date applyTime;

    private String bankName;

    private String bankAccount;

    private String bankUsername;

    private String depositBank;

    private Integer amount;

    private Integer status;

    private String remark;

    private Date aduitTime;

    private Integer aduitId;
    
    private String identification;//提现唯一的标识
    
    public void setIdentification(String identification) {
		this.identification = identification;
	}
    
    public String getIdentification() {
		return identification;
	}
    
    public void setApplyOrder(String applyOrder) {
		this.applyOrder = applyOrder;
	}
    
    public String getApplyOrder() {
		return applyOrder;
	}

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public Date getApplyTime() {
        return applyTime;
    }

    public void setApplyTime(Date applyTime) {
        this.applyTime = applyTime;
    }

    public String getBankName() {
        return bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName == null ? null : bankName.trim();
    }

    public String getBankAccount() {
        return bankAccount;
    }

    public void setBankAccount(String bankAccount) {
        this.bankAccount = bankAccount == null ? null : bankAccount.trim();
    }

    public String getBankUsername() {
        return bankUsername;
    }

    public void setBankUsername(String bankUsername) {
        this.bankUsername = bankUsername == null ? null : bankUsername.trim();
    }

    public String getDepositBank() {
        return depositBank;
    }

    public void setDepositBank(String depositBank) {
        this.depositBank = depositBank == null ? null : depositBank.trim();
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark == null ? null : remark.trim();
    }

    public Date getAduitTime() {
        return aduitTime;
    }

    public void setAduitTime(Date aduitTime) {
        this.aduitTime = aduitTime;
    }

    public Integer getAduitId() {
        return aduitId;
    }

    public void setAduitId(Integer aduitId) {
        this.aduitId = aduitId;
    }
}