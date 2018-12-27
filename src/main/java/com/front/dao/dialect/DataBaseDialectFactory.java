package com.front.dao.dialect;

import com.front.enums.DataBaseDialectEnum; 



 

 
/***
 * 
 * @author hongwu.huang
 *
 */
public class DataBaseDialectFactory {

	 private static DataBaseDialectFactory instance= new DataBaseDialectFactory();
	 
	 /***
	  * 
	  */
	 private DataBaseDialectFactory()
	 {
		 
	 }
	 
	 public static DataBaseDialectFactory getInstance()
	 {
		 return instance;
	 }

	 /****
	  * 
	  * @param dbType
	  * @return
	  * @throws SystemDBException
	  */
	 public DataBasePagingDialectService createDialectService(DataBaseDialectEnum dbType)throws Exception
	 {
		  DataBasePagingDialectService service = null;
		  if(dbType==DataBaseDialectEnum.MySQL)
		  {
			  service= new MySQlPagingDialectService();
		  }
		  else
		  {
			  throw new Exception("unspport the dbType,please reisgter the PagingDialectService");
		  }
		  return service;
	 }
}
