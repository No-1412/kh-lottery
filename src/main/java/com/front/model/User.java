package com.front.model;

import java.io.Serializable;
import java.util.Date;

/**
 * 用户表
 * User.java
 * <p>Copyright: Copyright (c) 2015 <p> 
 * <p>Company: xinghuo</p>
 *  @author    Sean
 *  @version   1.0
 */
public class User implements Serializable
{

    /**
     * 
     */
    private static final long serialVersionUID = 670442433702308868L;

    private Integer id;

    /**
     * 用户id 与用户id一一对应
     */
    private String uid;
    
    /**
     * 登陆名
     */
    private String loginName;

    /**
     * 称昵
     */
    private String userName;
    
    private String userPhone ; // 用户手机号码 
    
    private String userEmail ; // 用户电子邮件 

    /**
     * 用户性别
     */
    private transient String userSex;

    /**
     * 用户密码
     */
    private transient String userPassword;

    /**
     * 资金密码
     */
    private transient  String coinPassword;

    /**
     * 用户类型 0代理 1会员
     */
    private Integer userType;

    /**
     * 个人财产
     */
    private Double coin;

    /**
     * 冻结财产
     */
    private Double fcoin;

    /**
     * 返点数
     */
    private Double fandian;

    /**
     * 状态 0 可用 1 停用
     */
    private transient Integer status;

    /**
     * 0 在线 1 离线
     */
    private transient  Integer isOnline;

    /**
     * 最后登录时间
     */
    private  Date lastLogindate;
    
    private String lastLoginAddr ; // 最后登录的IP地址 

    /**
     * 用户QQ
     */
    private transient String userQq;

    /**
     * 0  实体账号 1 虚拟账号
     */
    private Integer virtualAccount;

    /**
     * 注册地址
     */
    private transient  String registerAddr;

    /**
     * 注册时间
     */
    private transient  Date registerDate;

    /**
     * 创建用户
     */
    private transient  Integer createUser;

    /**
     * 修改时间
     */
    private transient  Date modifyDate;

    /**
     * 修改用户
     */
    private Integer modifyUser;
    
    // session
    private transient  String sessionId;
    
    private String betLimit;
     
    private String blockRebate;
    
    
    public String getBetLimit() {
		return betLimit;
	}

	public void setBetLimit(String betLimit) {
		this.betLimit = betLimit;
	}

	public String getBlockRebate() {
		return blockRebate;
	}

	public void setBlockRebate(String blockRebate) {
		this.blockRebate = blockRebate;
	}

	public void setSessionId(String sessionId) {
		this.sessionId = sessionId;
	}
    
    public String getSessionId() {
		return sessionId;
	}

    public void setUid(String uid) {
		this.uid = uid;
	}
    
    public String getUid() {
		return uid;
	}

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getLoginName() {
        return loginName;
    }

    public void setLoginName(String loginName) {
        this.loginName = loginName == null ? null : loginName.trim();
    }

 
    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName == null ? null : userName.trim();
    }

    public String getUserSex() {
        return userSex;
    }

    public void setUserSex(String userSex) {
        this.userSex = userSex == null ? null : userSex.trim();
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword == null ? null : userPassword.trim();
    }

    public String getCoinPassword() {
        return coinPassword;
    }

    public void setCoinPassword(String coinPassword) {
        this.coinPassword = coinPassword == null ? null : coinPassword.trim();
    }
    
    public Integer getUserType() {
        return userType;
    }

    public void setUserType(Integer userType) {
        this.userType = userType;
    }

    public Double getCoin() {
        return coin;
    }

    public void setCoin(Double coin) {
        this.coin = coin;
    }

    public Double getFcoin() {
        return fcoin;
    }

    public void setFcoin(Double fcoin) {
        this.fcoin = fcoin;
    }

    public Double getFandian() {
        return fandian;
    }

    public void setFandian(Double fandian) {
        this.fandian = fandian;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Integer getIsOnline() {
        return isOnline;
    }

    public void setIsOnline(Integer isOnline) {
        this.isOnline = isOnline;
    }

    public Date getLastLogindate() {
        return lastLogindate;
    }

    public void setLastLogindate(Date lastLogindate) {
        this.lastLogindate = lastLogindate;
    }

    public String getUserQq() {
        return userQq;
    }

    public void setUserQq(String userQq) {
        this.userQq = userQq == null ? null : userQq.trim();
    }

    public Integer getVirtualAccount() {
        return virtualAccount;
    }

    public void setVirtualAccount(Integer virtualAccount) {
        this.virtualAccount = virtualAccount;
    }

    public String getRegisterAddr() {
        return registerAddr;
    }

    public void setRegisterAddr(String registerAddr) {
        this.registerAddr = registerAddr == null ? null : registerAddr.trim();
    }

    public Date getRegisterDate() {
        return registerDate;
    }

    public void setRegisterDate(Date registerDate) {
        this.registerDate = registerDate;
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
    
    public void setLastLoginAddr(String lastLoginAddr) {
		this.lastLoginAddr = lastLoginAddr;
	}
    
    public String getLastLoginAddr() {
		return lastLoginAddr;
	}

    public void setModifyUser(Integer modifyUser) {
        this.modifyUser = modifyUser;
    }

	public String getUserPhone() {
		return userPhone;
	}

	public void setUserPhone(String userPhone) {
		this.userPhone = userPhone;
	}

	public String getUserEmail() {
		return userEmail;
	}

	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	} 
}