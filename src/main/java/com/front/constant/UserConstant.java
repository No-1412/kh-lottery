package com.front.constant;

public interface UserConstant {

	  public static final int USER_NORMAL_STATUS=0;//用户正常启用状态
	  
	  public static final int USER_STOP_STATUS=1;//用户停用状态
	  
	  public static final int USER_PROXY_TYPE=0;//代理
	  
	  public static final int USER_MEMBER_TYPE=1;//会员
	  
	  public static final int NON_VIRTUAL_ACCOUNT=0;//非虚拟账号
	  
	  public static final int VIRTUAL_ACCOUNT=1;//虚拟账号
	  
	  public static final int USER_ON_LINE=0;//用户在线
	  
	  public static final int USER_OFF_LINE=1;//用户离线
	  
	  public static final String CREATE_PROXY="createProxy";
 
	  public static final String UPDATE_PROXY="updateProxy";
	  
	  public static final String PROXY_OPERATION_TYPE="OpType";
	  
	  public static final String PROXY_REBATE_LIMIT_EX="您的{0}配额不足！";
}
