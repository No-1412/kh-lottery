package com.front.enums;

public enum DataBaseDialectEnum {

	 MySQL("MySQL"),Oracle("Oracle"),SqlServer("SqlServer");
	 
    
	 private DataBaseDialectEnum(String dbType)
	 {
	 }
	 
	 public static DataBaseDialectEnum getDbType(String text)
	 {
		 return valueOf(text);
	 }

}
