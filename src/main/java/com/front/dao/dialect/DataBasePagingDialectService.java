package com.front.dao.dialect;




 
/***
 * 
 * @author Administrator
 *
 */
public interface DataBasePagingDialectService {

	   public String generatePagingSQL(String rsSql)throws Exception;
	   
	   
	   public String generatePagingCountSQL(String rsSql)throws Exception;
}
