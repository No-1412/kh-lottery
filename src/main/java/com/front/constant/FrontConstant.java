package com.front.constant;

public interface FrontConstant {
	
	public static final String CONTEXT_PATH = "base";
	
	public static final String CONTEXT_CACHE = "cache"; 
	
	public static final String FRONT_TITLE="title";
	
	public static final String COMPANY_TITLE="company.title";
	  
	public static final String PAGE_INDEX="pageIndex";
	
	public static final String PAGE_SIZE="pageSize";
	
	public static final String PAGE_START_INDEX="pageStartIndex";
	
	public static final String PAGE_END_INDEX="pageEndIndex";
	
	public static final String PROPERTY_CONFIGURER="propertyConfigurer";
	
	public static final String USER_ENABLE_STATUS="normal";
	
	public static final String USER_DISENABLE_STATUS="stop";
	
	public static final String CURRENT_USER="user";
	
    public static final String FAIL_STATUS="1";
	
    public static final String SUCCESS_STATUS ="0";

    public static final String STATUS ="STATUS";
    
    public static final String MSG ="MSG";
    
    public static final String SESSION_FORCE_LOGOUT_KEY = "session.force.logout";
    
    /** 点号分隔符 */
    public static final String DOT = ".";

    /** 逗号分隔符 */
    public static final String SPLIT = ",";

    /** 冒号分隔符 */
    public static final String COLON = ":";

    /** 分号分隔符 */
    public static final String SEMICOLON = ";";

    /** 保存 标识 */
    public static final String SAVE = "save";

    /** 修改标识  */
    public static final String UPDATE = "update";

    /** 删除标识  */
    public static final String DELETE = "delete";

    /** 根据id删除标识 */
    public static final String DELETE_BY_ID = "deleteById";

    /** 根据id查询标识 */
    public static final String FIND_BY_ID = "findById";

    /** 根据查询所有标识 */
    public static final String FIND_ALL = "findAll";

    /** 根据缓存key更新 */
    public static final String UPDATE_BY_CACHE_KEY = "updateByCacheKey";

    /** 根据缓存key删除标识 */
    public static final String DELETE_BY_CACHE_KEY = "deleteByCacheKey";

    /** 根据缓存KEY查询标识 */
    public static final String FIND_BY_CACHE_KEY = "findByCacheKey";

    /**
     * 用户登录存放到Session中的key
     */
    public static final String USER_SESSION_KEY = "USER_SESSION_KEY";
    
    /**彩种、投注错误码集合  start*/
    public static final Object[] INVALID_FORMAT_ERR = { 
    	       1001 , "Invalid format"//格式异常
    	       }; 
    
    /**彩种、投注错误码集合  end*/
    
    public static final int LOTTERY_BETS_NORMAL =0;
    
    public static final int LOTTERY_BETS_DELETE =1;
    
    //repCode校验成功
    public static final String REP_VERIFICATION_S="0";

    //repCode校验失败
    public static final String REP_VERIFICATION_F="1";
    
    //repCode校验信息
    public static final String REP_VERIFICATION_MSG="0";
    
    //成功消息的状态码
    public static final int SUCCESS_CODE = 0;
    
    public static final int BUZ_FAILED_CODE = -2;
   
    //失败消息的状态码
    public static final int FAILED_CODE = -1;
    
	public static final String CATALOG_NAME="CATALOG_NAME";
	
	public static final String CATALOG_CODE= "loadDictByCatalog";
	
	public static final String USER_BANK = "USER_BANK";
	
	//用户投注(追号)
	public static final int LOTTERY_BET_APPEND=1;
	
	//系统环境的模式   product 生成开启缓存策略  wip 在制品不开启缓存策略
    public static final String PLATFORM_CACHE_MODE="platform.cache.mode";
	
    public static final String PLATFORM_CACHE_WIP="wip";
    
    public static final String PLATFORM_CACHE_PRODUCT="product";
    
    public static final String  PLATFORM_CACHE_EXPIRE="platform.cache.expire";
    
    public static final String PLATFORM_BET_EXTERNALKEY="platform.bet.externalkey";
    
}
