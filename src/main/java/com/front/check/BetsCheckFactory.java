package com.front.check;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
 

import com.front.conf.SpringUtils;
import com.front.exception.LotteryBetsException;

public class BetsCheckFactory {

	
	   private static BetsCheckFactory factory = null;
	
	   private  Map<String, BetsCheck>cacheMap = null;
	   
	   private static Object lock =new Object();
	   
	   private BetsCheckFactory()
	   {
		    cacheMap= new  HashMap<String, BetsCheck>();
		    cacheMap.put("CHOOSE_FIVE", (BetsCheck)SpringUtils.getBean("CHOOSE_FIVE"));
		    cacheMap.put("EVERY_COLOR", (BetsCheck)SpringUtils.getBean("EVERY_COLOR"));
		    cacheMap.put("PK10", (BetsCheck)SpringUtils.getBean("PK10"));
		    cacheMap.put("SYSTEM_LOTTERY", (BetsCheck)SpringUtils.getBean("SYSTEM_LOTTERY"));
	   }
	   
	   /***
	    * 
	    * @return
	    */
	   public static BetsCheckFactory getInstance()
	   {
		    if(factory==null)
		    {
		    	synchronized (lock) {
		    		factory = new BetsCheckFactory();
				}
		    }
		    return factory;
	   }
	   
	   /**
	    *  获取通用的投注校验
	    * @return
	    */
	   public BetsCheck getCommonBetsCheck()
	   {
		   return SpringUtils.getBean("commonBetCheck");
	   }
	   
	   /***
	    * 
	    * @param lotteryType
	    * @return
	    */
	   public BetsCheck getBetsCheck(String lotteryType)throws LotteryBetsException
	   {
		    if(this.cacheMap.containsKey(lotteryType))
		    {
		    	return this.cacheMap.get(lotteryType);
		    }
		    throw LotteryBetsException.makeBetsDataAbnormal();
	   }
	   
	   
	   public static void main(String[] args)throws Exception {
 
		//5Lit5Y2O5Lq65rCR5YWx5ZKM5Zu9
		//5Lit5Y2O5Lq65rCR5YWx5ZKM5Zu9
		//String str =base64.encode("中华人民共和国".getBytes("gbk"))+"";
		System.out.println(new String(Base64.getEncoder().encode("中华人民共和国".getBytes("utf-8"))));
        
		System.out.println(new String(Base64.getDecoder().decode("5Lit5Y2O5Lq65rCR5YWx5ZKM5Zu9".getBytes("utf-8"))));
	}
}

