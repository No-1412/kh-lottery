package com.front.model;

import java.util.Date;

/**
 * 会员登录日志表
 * UserLoginLog.java
 * <p>Copyright: Copyright (c) 2015 <p> 
 * <p>Company: xinghuo</p>
 *  @author    SeanXiao
 *  @version   1.0
 */
public class UserLoginLog {
    
    /**
     * id
     */
    private Integer id;

    /**
     * 用户ID
     */
    private String uid;

    /**
     * 用户名
     */
    private String uname;

    /**
     * 操作系统
     */
    private String operationSystem;

    /**
     * 浏览器
     */
    private String navigator;

    /**
     * 登录地址
     */
    private String loginAddress;

    /**
     * 登录时间
     */
    private Date loginDate;
    
    
    private String sessionId;
    
    
    private Date logOutDate;
    
    
    public void setLogOutDate(Date logOutDate) {
		this.logOutDate = logOutDate;
	}
    
    
    public Date getLogOutDate() {
		return logOutDate;
	}
    
    public void setSessionId(String sessionId) {
		this.sessionId = sessionId;
	}
    
    public String getSessionId() {
		return sessionId;
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

    public String getOperationSystem() {
        return operationSystem;
    }

    public void setOperationSystem(String operationSystem) {
        this.operationSystem = operationSystem == null ? null : operationSystem.trim();
    }

    public String getNavigator() {
        return navigator;
    }

    public void setNavigator(String navigator) {
        this.navigator = navigator == null ? null : navigator.trim();
    }

    public String getLoginAddress() {
        return loginAddress;
    }

    public void setLoginAddress(String loginAddress) {
        this.loginAddress = loginAddress == null ? null : loginAddress.trim();
    }

    public Date getLoginDate() {
        return loginDate;
    }

    public void setLoginDate(Date loginDate) {
        this.loginDate = loginDate;
    }
}