package com.front.model;

import java.util.Date;

public class UserBank {
    
    /**
     * id
     */
    private Integer id;

    /**
     * 用户ID
     */
    private String uid;

    /**
     * 用户名称
     */
    private String uname;

    /**
     * 银行ID
     */
    private String bankid;

    /**
     * 银行名称
     */
    private String bankname;

    /**
     * 持卡人姓名
     */
    private String username;

    /**
     * 开户行名称
     */
    private String openingname;

    /**
     * 账号
     */
    private String account;

    /**
     * 状态 Y 启用 N 停用
     */
    private String status;

    /**
     * Y 默认银行 N 否
     */
    private String isDefault;
    
    
    private String giftMoney;
    
    private String icon;
    
    public void setIcon(String icon) {
		this.icon = icon;
	}
    
    public String getIcon() {
		return icon;
	}

    public void setGiftMoney(String giftMoney) {
		this.giftMoney = giftMoney;
	}
    
    public String getGiftMoney() {
		return giftMoney;
	}
    
    /**
     * 创建时间
     */
    private Date createDate;

    /**
     * 创建者
     */
    private Integer createUser;

    /**
     * 修改时间
     */
    private Date modifyDate;

    /**
     * 修改者
     */
    private Integer modifyUser;

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

    public String getBankid() {
        return bankid;
    }

    public void setBankid(String bankid) {
        this.bankid = bankid == null ? null : bankid.trim();
    }

    public String getBankname() {
        return bankname;
    }

    public void setBankname(String bankname) {
        this.bankname = bankname == null ? null : bankname.trim();
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username == null ? null : username.trim();
    }

    public String getOpeningname() {
        return openingname;
    }

    public void setOpeningname(String openingname) {
        this.openingname = openingname == null ? null : openingname.trim();
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account == null ? null : account.trim();
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status == null ? null : status.trim();
    }

    public String getIsDefault() {
        return isDefault;
    }

    public void setIsDefault(String isDefault) {
        this.isDefault = isDefault == null ? null : isDefault.trim();
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Integer getCreateUser() {
        return createUser;
    }

    public void setCreateUser(Integer createUser) {
        this.createUser = createUser;
    }

    public Date getModifyDate() {
        return modifyDate;
    }

    public void setModifyDate(Date modifyDate) {
        this.modifyDate = modifyDate;
    }

    public Integer getModifyUser() {
        return modifyUser;
    }

    public void setModifyUser(Integer modifyUser) {
        this.modifyUser = modifyUser;
    }
}