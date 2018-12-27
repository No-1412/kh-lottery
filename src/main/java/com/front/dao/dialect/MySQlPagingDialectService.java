package com.front.dao.dialect;

import com.front.constant.FrontConstant;



 


/***
 * 
 * @author hongwu.huang
 *
 */
public class MySQlPagingDialectService implements DataBasePagingDialectService {
	


	@Override
	public String generatePagingSQL(String rsSql) throws Exception {
		StringBuilder sb = new StringBuilder();
		sb.append(" SELECT * FROM (");
		sb.append(rsSql).append(" )TEMP LIMIT :").append(FrontConstant.PAGE_START_INDEX);
		sb.append(",");
		sb.append(":").append(FrontConstant.PAGE_END_INDEX);
		return sb.toString();
	}

	@Override
	public String generatePagingCountSQL(String rsSql) throws Exception {
		StringBuilder sb = new StringBuilder();
		sb.append(" SELECT COUNT(0) AS COUNT FROM (");
		sb.append(rsSql).append(" )TEMP ");
		return sb.toString();
	}


}
