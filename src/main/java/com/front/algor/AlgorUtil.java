package com.front.algor;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.front.common.MathUtils;
import com.front.common.StringUtils;
import com.front.constant.FrontCheckConstant;
import com.front.constant.FrontConstant;
import com.front.exception.LotteryBetsException;
import com.google.gson.Gson;

public class AlgorUtil extends AlgorBase {

	/**
	 * 复式通用算法  通用：四星	四星一码
	 * @return
	 */
	public static Integer Fu(int max_place, List<Object> data_sel){
		int tn = 1;
		int i = 0;
		for(i = 0; i < max_place ; i ++){
			List<Object> selList = (List<Object>)data_sel.get(i);
			if(selList.size() == 0){
				tn = 0;
				break;
			}
			tn *= selList.size();
		}
		return tn;
	}
	
	/**
	 * 判断是否是制定的任选模式
	 * @param str
	 * @param starNum
	 * @return
	 */
	public static boolean isRenXuan (String str , int starNum){
		int count=0;
		for(int i=0;i<str.length();i++){
			if("*".equals(String.valueOf(str.toCharArray()[i])) ){
				++count;
			}
		}
		if(count == starNum){
			return true;
		}else{
			return false;
		}
	}
	
	/**
	 * 解析任选玩法
	 * @param betsData
	 * @return
	 */
	public static Object renxuanParsing(String betsData , int starNum)throws LotteryBetsException{
		List<Object> dataList = new ArrayList<Object>();
		Pattern pattern = Pattern.compile("^\\d+$");
		String[] codeArr = betsData.split(",");
    	int starCount = 0;
    	boolean isNumber = true;
    	for(int i =0;i<codeArr.length;i++){
    		List<Object> sub_dataList = new ArrayList<Object>();
    		if(!codeArr[i].equals("*")){
    			String[] sub_code_arr = codeArr[i].split(" ");
        		for(int j =0; j < sub_code_arr.length;j++){
        			sub_dataList.add(sub_code_arr[j]);
        		}
        		dataList.add(sub_dataList);
    			String[] subList = codeArr[i].split(" ");
    			for(int j =0;j<subList.length;j++){
    				Matcher matcher = pattern.matcher(subList[j]);
    				if(!matcher.matches()){
    					isNumber = false;
    					break;
    				}
    			}
    			starCount++;
    		}else{
    			dataList.add(sub_dataList);
    		}
    	}
    	if(!isNumber){
    		return "投注内容含非数字";
    	}else if(starCount != starNum){
    		return "投注内容非法";
    	}else{
    		return dataList;
    	}
	}
	
	/**
	 * 解析任选玩法
	 * @param betsData
	 * @return
	 */
	public static Object renxuanDaXiaoDanShuangParsing(String betsData , int starNum)throws LotteryBetsException{
		List<Object> dataList = new ArrayList<Object>();
		String[] codeArr = betsData.split(",");
    	int starCount = 0;
    	for(int i =0;i<codeArr.length;i++){
    		List<Object> sub_dataList = new ArrayList<Object>();
    		if(!codeArr[i].equals("*")){
    			String[] sub_code_arr = codeArr[i].split(" ");
        		for(int j =0; j < sub_code_arr.length;j++){
        			sub_dataList.add(sub_code_arr[j]);
        		}
        		starCount++;
    		}
    		dataList.add(sub_dataList);
    	}
    	if(starCount != starNum){
    		return "投注内容非法";
    	}else{
    		return dataList;
    	}
	}
	
	/**
	 * 单式 通用算法
	 * @return
	 */
	public static String Dan(int num, List<Object> data_sel)throws LotteryBetsException{
		Pattern pattern = Pattern.compile("^\\d+$");
		for(int i = 0; i < data_sel.size();i++){
			String data = (String)data_sel.get(i);
			Matcher matcher = pattern.matcher(data);
			if(!matcher.matches()){
				return "投注内容含非数字";
			}
			if(data.length() != num){
				return "投注数据不合法";
			}
		}
		return String.valueOf(data_sel.size());
	}
	
	/**
	 * 组选120
	 * @return
	 */
	public static String ZU_120(List<Object> data_sel)throws LotteryBetsException{
		Pattern pattern = Pattern.compile("^\\d+$");
		for(int i = 0;i<data_sel.size();i++){
			String data = (String)data_sel.get(i);
			Matcher matcher = pattern.matcher(data);
			if(!matcher.matches()){
				return "投注内容含非数字";
			}
		}
		int nums = 0;
		int s = data_sel.size();
		if(s > 4){
			nums += MathUtils.Com(s, 5);
		}
		return String.valueOf(nums);
	}
	
	/**
	 * 组选60 30 20 10 5
	 * @param mname
	 * @param data_sel
	 * @param minchosen
	 * @return
	 */
	public static String ZU_60_30_20_10_5(String mname , List<Object> data_sel , int[] minchosen){
		int tmp_nums =1;
		int nums = 0;
		if(((List<Object>)data_sel.get(0)).size() >= minchosen[0] && ((List<Object>)data_sel.get(1)).size() >= minchosen[1]){
			int h = MathUtils.intersect(((List<Object>)data_sel.get(0)).toArray(), ((List<Object>)data_sel.get(1)).toArray()).size();
			tmp_nums = MathUtils.Com(((List<Object>)data_sel.get(0)).toArray().length, minchosen[0]) * MathUtils.Com(((List<Object>)data_sel.get(1)).toArray().length, minchosen[1]);
			if(h > 0){
				if(mname.equals("WXZU60")){	//五星组选60
					tmp_nums -= MathUtils.Com(h,1) * MathUtils.Com(((List<Object>)data_sel.get(1)).size() -1 , 2);
				}else if(mname.equals("WXZU30")){	//五星组选30
					tmp_nums -= MathUtils.Com(h ,2) * MathUtils.Com(2, 1);
					if(((List<Object>)data_sel.get(0)).size() - h > 0){
						tmp_nums -= MathUtils.Com(h,1) * MathUtils.Com(((List<Object>)data_sel.get(0)).size() - h , 1);
					}
				}else if(mname.equals("WXZU20")){	//五星组选20
					tmp_nums -= MathUtils.Com(h ,1) * MathUtils.Com(((List<Object>)data_sel.get(1)).size() -1 , 1);
				}else if(mname.equals("WXZU10") || mname.equals("WXZU5")){
					tmp_nums -= MathUtils.Com(h, 1);
				}
			}
			nums += tmp_nums;
		}
		return String.valueOf(nums);
	}
	
	/**
	 * 通用： 五星：五星组合 ZH5 ;四星 四星组合 ZH4;后三 后三组合 ZH3;前三 前三组合 ZH3
	 * @param n
	 * @param max_place
	 * @param data_sel
	 * @return
	 */
	public static Integer ZH(int n , int max_place , String[] data_sel){
		int tmp_nums = 1;
		for(int i = 0; i < max_place ; i ++){
			if(data_sel[i].length() == 0){
				tmp_nums = 0;
				break;
			}
			tmp_nums *= data_sel[i].length();
		}
		return tmp_nums * n;
	}
	
	/**
	 * 后三|前三|任选三 组三复式
	 * 
	 * @param max_place
	 * @param data_sel
	 * @returns {Number}
	 */
	public static String SAN_3_FU(int max_place,List<Object> data_sel){
		int nums = 0;
		for(int i =0;i< max_place ;i++){
			int s = ((List<Object>)data_sel.get(i)).size();
			if(s > 1){
				nums += s * (s - 1);
			}
		}
		return String.valueOf(nums);
	}
	
	/**
	 * 后三|前三 组六复式
	 * 
	 * @param max_place
	 * @param data_sel
	 * @returns {Number}
	 */
	public static String SAN_6_FU(int max_place,List<Object> data_sel){
		int nums = 0;
		for(int i =0;i< max_place;i++){
			int s = ((List<Object>)data_sel.get(i)).size();
			if (s > 2) {
				nums += s * (s - 1) * (s - 2) / 6;
			}
		}
		return String.valueOf(nums);
	}

	/**
	 * 通用：任四|任三|任二直选 直选复式
	 * @param max_place
	 * @param data_sel
	 * @returns
	 */
	public static String RX_ZXFS(int n , int max_place,List<Object> data_sel , String mname){
		
		int _c = 0;
		int _dL = data_sel.size();
		for(int i =0;i<_dL;i++){
			if( ((List<Object>)data_sel.get(i)).size() > 0){
				_c ++;
			}
		}
		//任选二复式 任选大小单双
		if("RX2FS".equals(mname)){	
			if(_c > 2) return "请选择2位数字！";
		}
		//任选三复式
		if("RX3FS".equals(mname)){
			if(_c > 3) return "请选择3位数字！";
		}
		//任选四复式
		if("RX4FS".equals(mname)){
			if(_c > 4) return "请选择4位数字！";
		}
		
		List<Integer> aCodePosition = new ArrayList<Integer>();
		for (int i = 0; i < max_place; i++) {
			int codelen = ((List<Object>)data_sel.get(i)).size();
			if (codelen > 0) {
				aCodePosition.add(i);
			}
		}
		int sellen = n;
		java.lang.Integer[]arr =new Integer[aCodePosition.size()];
		String[] aPositionCombo = MathUtils.getRs(aCodePosition, sellen);

		int iComboLen = aPositionCombo.length;
		int iLen = 0;
		int tmpNums = 1;
		int nums = 0;
		
		for (int j = 0; j < iComboLen; j++) {
			String [] aCombo = aPositionCombo[j].split(",");
			iLen = aCombo.length;
			tmpNums = 1;
			for (int h = 0; h < iLen; h++) {
				tmpNums *= ((List<Object>)data_sel.get(Integer.parseInt(aCombo[h]) )).size();
			}
			nums += tmpNums;
		}
		return String.valueOf(nums);
	}
	/**
	 * 组选24
	 * 
	 * @param data_sel
	 * @returns {Number} 注数
	 */
	public static String ZU_24(List<Object> data_sel){
		int nums = 0;
		int s = ((List<Object>)data_sel.get(0)).size();
		if(s > 3){
			nums += MathUtils.Com(s, 4);
		}
		return String.valueOf(nums);
	}

	/**
	 * 后二|前二|任二 组选复式 通用：后三二码、前三二码 四星二码 五星二码 算法
	 */
	public static String ZU_2(int max_place,List<Object> data_sel){
		int nums = 0;
		for(int i=0;i<max_place;i++){
			int s = ((List<Object>)data_sel.get(0)).size();
			if(s > 1){
				nums += s * (s -1) /2;
			}
		}
		return String.valueOf(nums);
	}

	/**
	 * 定位胆
	 */
	public static String DWD(int max_place,List<Object> data_sel){
		int nums = 0;
		for(int i=0;i<max_place;i++){
			nums += ((List<Object>)data_sel.get(i)).size();
		}
		return String.valueOf(nums);
	}
	
	/***
	 *  任选方案的校验
	 * @param betsData 投注数据
	 * @param count 2，3，4 代表 任选二....
	 * @return
	 * @throws LotteryBetsException
	 */
	public static int betOptional(String betsData,int count)throws LotteryBetsException
	{
		  String[]arr = StringUtils.split(betsData.replaceAll("\\s*", ""), ",");
          int index = 0;
          List<Integer>zuhe =  new ArrayList<Integer>();
          for(String temp:arr)
          {
          	 if(StringUtils.equals(temp, "*"))
          	 {
          		 continue;
          	 }
          	 index++;
          	 zuhe.add(temp.replaceAll("\\s*", "").length());
          }
          if(index<count)
          {
          	throw LotteryBetsException.makeBetsDataAbnormal();
          } 
          Integer[]array = new Integer[zuhe.size()];
          zuhe.toArray(array);
          return new Combination().mn(array, count);
	}
	
	/**
	 * 获取方案
	 */
	public static int getPlan(int n,String pos)throws LotteryBetsException{
		int _posLen = pos.split(",").length;
		if(_posLen == 0 ){
			throw new LotteryBetsException(FrontCheckConstant.LOTTERY_PLAN_EXCEPTION, "投注方案不合法");
		}else{
			return MathUtils.Com(_posLen, n);
		}
	}
}
