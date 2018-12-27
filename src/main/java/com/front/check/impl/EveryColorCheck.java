package com.front.check.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.stereotype.Component;

import com.front.algor.AlgorUtil;
import com.front.check.AbstractBetsCheck;
import com.front.common.StringUtils;
import com.front.exception.LotteryBetsException;
import com.front.model.LotteryBets;
import com.google.gson.Gson;

@Component(value="EVERY_COLOR")
public class EveryColorCheck extends AbstractBetsCheck{

    public AlgorUtil algor = new AlgorUtil();
    @Override
    public void checkLotteryBetData(LotteryBets bets)throws LotteryBetsException 
    {
        String ruleFun = StringUtils.obj2String(bets.getBetCheckAttr("ruleFun", StringUtils.EMPTY));
        int amount = 0;
        String betsData = bets.getBetsData();
        //五星复式
        if(ruleFun.equals("5x_5xfs")){
            List<Object> dataList = new ArrayList<Object>();
            String[] codeArr = betsData.split(",");
            for(int i =0;i<codeArr.length;i++){
                String[] sub_code_arr = codeArr[i].split(" ");
                List<Object> sub_dataList = new ArrayList<Object>();
                for(int j =0; j < sub_code_arr.length;j++){
                    sub_dataList.add(sub_code_arr[j]);
                }
                dataList.add(sub_dataList);
            }
            amount = AlgorUtil.Fu(5, dataList);
            
        //任选二组选复式   
        }else if(ruleFun.equals("2xz_rx2zxfs")){
            List<Object> area_dataList = new ArrayList<Object>();
            List<Object> dataList = new ArrayList<Object>();
            for(int i =0;i<betsData.length();i++){
                dataList.add(betsData.charAt(i));
            }
            area_dataList.add(dataList);
            
            int obj = AlgorUtil.getPlan(2,bets.getBetsWeishu());
            
            String danResult = AlgorUtil.ZU_2(1, area_dataList);
            Pattern pattern = Pattern.compile("^\\d+$");
            Matcher matcher = pattern.matcher(danResult);
            if(matcher.matches()){
                amount = Integer.parseInt(danResult)* (Integer)obj;
            }else{
                throw new LotteryBetsException(40001, danResult);
            }
        //任选二组选单式 or 任选二单式
        }else if(ruleFun.equals("2xz_rx2zxds") || ruleFun.equals("2x_rx2ds")){
            List<Object> dataList = new ArrayList<Object>();
            String[] codeArr = betsData.split("\\|");
            for(int i =0;i<codeArr.length;i++){
                dataList.add(codeArr[i]);
            }
            int obj = AlgorUtil.getPlan(2,bets.getBetsWeishu());
           
            String danResult = AlgorUtil.Dan(2, dataList);
            Pattern pattern = Pattern.compile("^\\d+$");
            Matcher matcher = pattern.matcher(danResult);
            if(matcher.matches()){
                amount = Integer.parseInt(danResult) * obj;
            }else{
                throw new LotteryBetsException(40001, danResult);
            }
        //任选三混合组选 or 任选三单式
        }else if(ruleFun.equals("rxwf_rx3ds") || ruleFun.equals("sxzxR3h")){    
            List<Object> dataList = new ArrayList<Object>();
            String[] codeArr = betsData.split("\\|");
            for(int i =0;i<codeArr.length;i++){
                dataList.add(codeArr[i]);
            }
            int obj = AlgorUtil.getPlan(3,bets.getBetsWeishu());
         
            String danResult = AlgorUtil.Dan(3, dataList);
            Pattern pattern = Pattern.compile("^\\d+$");
            Matcher matcher = pattern.matcher(danResult);
            if(matcher.matches()){
                amount = Integer.parseInt(danResult) * obj;
            }else{
                throw new LotteryBetsException(40001, danResult);
            }
        //任选四单式 
        }else if(ruleFun.equals("rxwf_rx4ds")){
            List<Object> dataList = new ArrayList<Object>();
            String[] codeArr = betsData.split("\\|");
            for(int i =0;i<codeArr.length;i++){
                dataList.add(codeArr[i]);
            }
            int obj = AlgorUtil.getPlan(4,bets.getBetsWeishu());
         
            String danResult = AlgorUtil.Dan(4, dataList);
            Pattern pattern = Pattern.compile("^\\d+$");
            Matcher matcher = pattern.matcher(danResult);
            if(matcher.matches()){
                amount = Integer.parseInt(danResult) * obj;
            }else{
                throw new LotteryBetsException(40001, danResult);
            }
        //五星单式 or 前四单式 or 后四单式 or 前三单式 or 中三单式 or 后三单式 or 前二单式 or 后二单式 or 任选二单式 or 前二组选单式 or 后二组选单式  
        }else if(ruleFun.equals("5x_5xds") || ruleFun.equals("4x_q4ds") || 
            ruleFun.equals("4x_h4ds") || ruleFun.equals("3x_q3ds") || 
                ruleFun.equals("3x_h3ds") || ruleFun.equals("3x_z3ds") ||
                ruleFun.equals("2x_q2ds") || ruleFun.equals("2x_h2ds")||
                StringUtils.equals("2xz_q2zxds", ruleFun)){
            List<Object> dataList = new ArrayList<Object>();
            String[] codeArr = betsData.split("\\|");
            for(int i =0;i<codeArr.length;i++){
                dataList.add(codeArr[i]);
            }
            String danResult = "";
            if(ruleFun.equals("5x_5xds")){
                danResult = AlgorUtil.Dan(5, dataList);
            }else if(ruleFun.equals("4x_q4ds") || ruleFun.equals("4x_h4ds")){
                danResult = AlgorUtil.Dan(4, dataList);
            }else if(ruleFun.equals("3x_q3ds") || ruleFun.equals("3x_h3ds") || 
                    ruleFun.equals("3x_z3ds")){
                danResult = AlgorUtil.Dan(3, dataList);
            }else if(ruleFun.equals("2x_q2ds") || ruleFun.equals("2x_h2ds") || 
                     ruleFun.equals("2xz_q2zxds") || ruleFun.equals("2xz_h2zxds")){
                danResult = AlgorUtil.Dan(2, dataList);
            }
            
            Pattern pattern = Pattern.compile("^\\d+$");
            Matcher matcher = pattern.matcher(danResult);
            if(matcher.matches()){
                amount = Integer.parseInt(danResult);
            }else{
                throw new LotteryBetsException(40001, danResult);
            }
        //组选120
        }else if(ruleFun.equals("zx120")){
            List<Object> dataList = new ArrayList<Object>();
            String[] codeArr = betsData.split(" ");
            for(int i =0;i<codeArr.length;i++){
                dataList.add(codeArr[i]);
            }
            String danResult = AlgorUtil.ZU_120(dataList);
            Pattern pattern = Pattern.compile("^\\d+$");
            Matcher matcher = pattern.matcher(danResult);
            if(matcher.matches()){
                amount = Integer.parseInt(danResult);
            }else{
                throw new LotteryBetsException(40001, danResult);
            }
        //组选60
        }else if(ruleFun.equals("zx60")){
            List<Object> dataList = new ArrayList<Object>();
            String[] codeArr = betsData.split(",");
            for(int i =0;i<codeArr.length;i++){
                String[] sub_code_arr = codeArr[i].split(" ");
                List<Object> sub_dataList = new ArrayList<Object>();
                for(int j =0; j < sub_code_arr.length;j++){
                    sub_dataList.add(sub_code_arr[j]);
                }
                dataList.add(sub_dataList);
            }
            String danResult = AlgorUtil.ZU_60_30_20_10_5("WXZU60", dataList, new int[]{1,3});
            Pattern pattern = Pattern.compile("^\\d+$");
            Matcher matcher = pattern.matcher(danResult);
            if(matcher.matches()){
                amount = Integer.parseInt(danResult);
            }else{
                throw new LotteryBetsException(40001, danResult);
            }
        //组选30
        }else if(ruleFun.equals("zx30")){
            List<Object> dataList = new ArrayList<Object>();
            String[] codeArr = betsData.split(",");
            for(int i =0;i<codeArr.length;i++){
                String[] sub_code_arr = codeArr[i].split(" ");
                List<Object> sub_dataList = new ArrayList<Object>();
                for(int j =0; j < sub_code_arr.length;j++){
                    sub_dataList.add(sub_code_arr[j]);
                }
                dataList.add(sub_dataList);
            }
            String danResult = AlgorUtil.ZU_60_30_20_10_5("WXZU30", dataList, new int[]{2,1});
            Pattern pattern = Pattern.compile("^\\d+$");
            Matcher matcher = pattern.matcher(danResult);
            if(matcher.matches()){
                amount = Integer.parseInt(danResult);
            }else{
                throw new LotteryBetsException(40001, danResult);
            }
        //组选20
        }else if(ruleFun.equals("zx20")){
            List<Object> dataList = new ArrayList<Object>();
            String[] codeArr = betsData.split(",");
            for(int i =0;i<codeArr.length;i++){
                String[] sub_code_arr = codeArr[i].split(" ");
                List<Object> sub_dataList = new ArrayList<Object>();
                for(int j =0; j < sub_code_arr.length;j++){
                    sub_dataList.add(sub_code_arr[j]);
                }
                dataList.add(sub_dataList);
            }
            String danResult = AlgorUtil.ZU_60_30_20_10_5("WXZU20", dataList, new int[]{1,2});
            Pattern pattern = Pattern.compile("^\\d+$");
            Matcher matcher = pattern.matcher(danResult);
            if(matcher.matches()){
                amount = Integer.parseInt(danResult);
            }else{
                throw new LotteryBetsException(40001, danResult);
            }
        //组选10 or 组选5
        }else if(ruleFun.equals("zx10") || ruleFun.equals("zx5")){
            List<Object> dataList = new ArrayList<Object>();
            String[] codeArr = betsData.split(",");
            for(int i =0;i<codeArr.length;i++){
                String[] sub_code_arr = codeArr[i].split(" ");
                List<Object> sub_dataList = new ArrayList<Object>();
                for(int j =0; j < sub_code_arr.length;j++){
                    sub_dataList.add(sub_code_arr[j]);
                }
                dataList.add(sub_dataList);
            }
            String danResult = AlgorUtil.ZU_60_30_20_10_5("WXZU10", dataList, new int[]{1,1});
            Pattern pattern = Pattern.compile("^\\d+$");
            Matcher matcher = pattern.matcher(danResult);
            if(matcher.matches()){
                amount = Integer.parseInt(danResult);
            }else{
                throw new LotteryBetsException(40001, danResult);
            }
            
        //前四复式 or 后四复式
        }else if(ruleFun.equals("4x_q4fs") || ruleFun.equals("4x_h4fs")){
            List<Object> dataList = new ArrayList<Object>();
            String[] codeArr = betsData.split(",");
            for(int i =0;i<codeArr.length;i++){
                String[] sub_code_arr = codeArr[i].split(" ");
                List<Object> sub_dataList = new ArrayList<Object>();
                for(int j =0; j < sub_code_arr.length;j++){
                    sub_dataList.add(sub_code_arr[j]);
                }
                dataList.add(sub_dataList);
            }
            amount = AlgorUtil.Fu(4, dataList);

        //前三复式 or 中三复式 or 后三复式
        }else if(ruleFun.equals("3x_q3fs") || ruleFun.equals("3x_z3fs") || ruleFun.equals("3x_h3fs")){
            List<Object> dataList = new ArrayList<Object>();
            String[] codeArr = betsData.split(",");
            for(int i =0;i<codeArr.length;i++){
                String[] sub_code_arr = codeArr[i].split(" ");
                List<Object> sub_dataList = new ArrayList<Object>();
                for(int j =0; j < sub_code_arr.length;j++){
                    sub_dataList.add(sub_code_arr[j]);
                }
                dataList.add(sub_dataList);
            }
            amount = AlgorUtil.Fu(3, dataList);
            
        //前三组三 or 中三组三 or 后三组三
        }else if(ruleFun.equals("3xz_q3z3") || ruleFun.equals("3xz_z3z3") || ruleFun.equals("3xz_h3z3")){
        	List<Object> area_dataList = new ArrayList<Object>();
            List<Object> dataList = new ArrayList<Object>();
            String[] codeArr = betsData.split(" ");
            for(int i =0;i<codeArr.length;i++){
                dataList.add(codeArr[i]);
            }
            area_dataList.add(dataList);
            String danResult = AlgorUtil.SAN_3_FU(1, area_dataList);
            Pattern pattern = Pattern.compile("^\\d+$");
            Matcher matcher = pattern.matcher(danResult);
            if(matcher.matches()){
                amount = Integer.parseInt(danResult);
            }else{
                throw new LotteryBetsException(40001, danResult);
            }
            
        //前三组六 or 中三组六 or 后三组六
        }else if(ruleFun.equals("3xz_q3z6") || ruleFun.equals("3xz_z3z6") || ruleFun.equals("3xz_h3z6")){
        	List<Object> area_dataList = new ArrayList<Object>();
            List<Object> dataList = new ArrayList<Object>();
            String[] codeArr = betsData.split(" ");
            for(int i =0;i<codeArr.length;i++){
                dataList.add(codeArr[i]);
            }
            area_dataList.add(dataList);
            String danResult = AlgorUtil.SAN_6_FU(1, area_dataList);
            Pattern pattern = Pattern.compile("^\\d+$");
            Matcher matcher = pattern.matcher(danResult);
            if(matcher.matches()){
                amount = Integer.parseInt(danResult);
            }else{
                throw new LotteryBetsException(40001, danResult);
            }
        //前二复式 or 后二复式
        }else if(ruleFun.equals("2x_q2fs") || ruleFun.equals("2x_h2fs")){
            List<Object> dataList = new ArrayList<Object>();
            String[] codeArr = betsData.split(",");
            for(int i =0;i<codeArr.length;i++){
                String[] sub_code_arr = codeArr[i].split(" ");
                List<Object> sub_dataList = new ArrayList<Object>();
                for(int j =0; j < sub_code_arr.length;j++){
                    sub_dataList.add(sub_code_arr[j]);
                }
                dataList.add(sub_dataList);
            }
            amount = AlgorUtil.Fu(2, dataList);
            
        //任选二 复式
        }else if(ruleFun.equals("2x_rx2fs")){ 
        	amount =AlgorUtil.betOptional(betsData, 2);
        }else if(ruleFun.equals("rxwf_rx3fs")){
        	amount =AlgorUtil.betOptional(betsData, 3);
        }else if(ruleFun.equals("rxwf_rx4fs")){
        	amount =AlgorUtil.betOptional(betsData, 4);
        }
        else if(ruleFun.equals("2xz_q2zxfs") || ruleFun.equals("2xz_h2zxfs")){
            List<Object> area_dataList = new ArrayList<Object>();
            List<Object> dataList = new ArrayList<Object>();
            String[] codeArr = betsData.split(" ");
            for(int i =0;i<codeArr.length;i++){
                dataList.add(codeArr[i]);
            }
            area_dataList.add(dataList);
            String danResult = AlgorUtil.ZU_2(1, area_dataList);
            Pattern pattern = Pattern.compile("^\\d+$");
            Matcher matcher = pattern.matcher(danResult);
            if(matcher.matches()){
                amount = Integer.parseInt(danResult);
            }else{
                throw new LotteryBetsException(40001, danResult);
            }
        //定位胆
        }else if(ruleFun.equals("dwd_wxdwd")){
            String[] codeArr = betsData.split(",");
            String code = null;
            for(int i =0;i<codeArr.length;i++){
            	code = codeArr[i];
            	if(StringUtils.equals(code, "*"))
            	{
            		continue;
            	}
            	int length = StringUtils.length(StringUtils.tirmAll(code));
            	if(length>10)
            	{
            		throw LotteryBetsException.makeBetsDataAbnormal();
            	}
                amount+=length;                 
            }
        //前三一码 or 中三一码 or 后三一码 or 四星一码
        }else if(ruleFun.equals("bdw_q31m") || ruleFun.equals("bdw_z31m") || 
        	ruleFun.equals("bdw_h31m") || ruleFun.equals("bdw_4x1m")){
        	List<Object> area_dataList = new ArrayList<Object>();
            List<Object> dataList = new ArrayList<Object>();
            String[] codeArr = betsData.split(" ");
            for(int i =0;i<codeArr.length;i++){
                dataList.add(codeArr[i]);
            }
            area_dataList.add(dataList);
            amount = AlgorUtil.Fu(1, area_dataList);
        //前二大小单双 or 后二大小单双
        }else if(ruleFun.equals("dxds_q2dxds") || ruleFun.equals("dxds_h2dxds")){
        	List<Object> dataList = new ArrayList<Object>();
            String[] codeArr = betsData.split(",");
            for(int i =0;i<codeArr.length;i++){
               String[] sub_code_arr = codeArr[i].split(" ");
               List<Object> sub_dataList = new ArrayList<Object>();
               for(int j =0; j < sub_code_arr.length;j++){
                   sub_dataList.add(sub_code_arr[j]);
               }
               dataList.add(sub_dataList);
            }
            amount = AlgorUtil.Fu(2, dataList);
        //前三大小单双 or 后三大小单双
        }else if(ruleFun.equals("dxds_q3dxds") || ruleFun.equals("dxds_h3dxds")){
        	List<Object> dataList = new ArrayList<Object>();
            String[] codeArr = betsData.split(",");
            for(int i =0;i<codeArr.length;i++){
               String[] sub_code_arr = codeArr[i].split(" ");
               List<Object> sub_dataList = new ArrayList<Object>();
               for(int j =0; j < sub_code_arr.length;j++){
                   sub_dataList.add(sub_code_arr[j]);
               }
               dataList.add(sub_dataList);
            }
            amount = AlgorUtil.Fu(3, dataList);
        //任选大小单双
        }else if(ruleFun.equals("dxds_rxdxds")){
        	Object obj = AlgorUtil.renxuanDaXiaoDanShuangParsing(betsData , 2);
            if(obj instanceof String){
                throw new LotteryBetsException(40001, String.valueOf(obj) );
            }
            if(obj instanceof List){
                List<Object> dataList = (List<Object>)obj;
                String danResult = AlgorUtil.RX_ZXFS(2, 5, dataList, "RX2FS");
                Pattern pattern = Pattern.compile("^\\d+$");
                Matcher matcher = pattern.matcher(danResult);
                if(matcher.matches()){
                    amount = Integer.parseInt(danResult);
                }else{
                    throw new LotteryBetsException(40001, danResult);
                }
            }
        //前三二码 or 后三二码 or 四星二码 or 五星二码
        }else if(ruleFun.equals("bdw_q32m")||ruleFun.equals("bdw_h32m")||ruleFun.equals("bdw_4x2m")||ruleFun.equals("bdw_5x2m")){
        	List<Object> area_dataList = new ArrayList<Object>();
            List<Object> dataList = new ArrayList<Object>();
            String[] codeArr = betsData.split(" ");
            for(int i =0;i<codeArr.length;i++){
                dataList.add(codeArr[i]);
            }
            area_dataList.add(dataList);
            String danResult = AlgorUtil.ZU_2(1, area_dataList);
            Pattern pattern = Pattern.compile("^\\d+$");
            Matcher matcher = pattern.matcher(danResult);
            if(matcher.matches()){
                amount = Integer.parseInt(danResult);
            }else{
                throw new LotteryBetsException(40001, danResult);
            }
        //一帆风顺 or 好事成双 or 三星报喜 or 四季发财
        }else if(ruleFun.equals("qwwfyffs") || ruleFun.equals("qwwfhscs") || ruleFun.equals("qwwfsxbx") || ruleFun.equals("qwwfsjfc")){
        	List<Object> area_dataList = new ArrayList<Object>();
        	 List<Object> dataList = new ArrayList<Object>();
             String[] codeArr = betsData.split(" ");
             for(int i =0;i<codeArr.length;i++){
                 dataList.add(codeArr[i]);
             }
             area_dataList.add(dataList);
             amount = AlgorUtil.Fu(1, area_dataList);
        }else{
            throw new LotteryBetsException(40001, "不存在该玩法！");
        }
        
        if(bets.getBetsNum() != amount){
            throw new LotteryBetsException(40000, "投注数量提交错误");
        }
        //throw LotteryBetsException.makeBetsDataAbnormal();
        
    }
    
    public static void main(String [] args) throws LotteryBetsException{
    	//[2,5,[["5"],["4","6","7"],[],[],[]],"RX2FS"]
       //"单,小 双,*,*,*"
    	Object obj = AlgorUtil.renxuanDaXiaoDanShuangParsing("5,4 6 7,*,*,*" , 3);
        if(obj instanceof String){
            throw new LotteryBetsException(40001, String.valueOf(obj) );
        }
        //List<Object> dataList1 = new ArrayList<Object>();
        List<Object> dataList = (List<Object>)obj;
        //dataList1.add(dataList);
        String s1 = new Gson().toJson(dataList);
        
        String danResult = AlgorUtil.RX_ZXFS(2, 5, dataList, "RX2FS");
        System.out.println(danResult);
        
        String str="8 9,7 8 9,*,*,*";
        StringUtils.split(str, ",");
        
//      List<Object> dataList = new ArrayList<Object>();
//      String[] codeArr = "*,1 3 5 7 9,1 3 5 7 9,*,*".split(",");
//      int starCount = 0;
//      Pattern pattern = Pattern.compile("^\\d+$");
//      boolean isNumber = true;
//      for(int i =0;i<codeArr.length;i++){
//          List<Object> sub_dataList = new ArrayList<Object>();
//          if(!codeArr[i].equals("*")){
//              String[] sub_code_arr = codeArr[i].split(" ");
//              for(int j =0; j < sub_code_arr.length;j++){
//                  sub_dataList.add(sub_code_arr[j]);
//              }
//              dataList.add(sub_dataList);
//              String[] subList = codeArr[i].split(" ");
//              for(int j =0;j<subList.length;j++){
//                  Matcher matcher = pattern.matcher(subList[j]);
//                  if(!matcher.matches()){
//                      isNumber = false;
//                      break;
//                  }
//              }
//              starCount++;
//          }else{
//              dataList.add(sub_dataList);
//          }
//      }
//      if(!isNumber){
//          throw new LotteryBetsException(40001, "投注内容含非数字");
//      }else if(starCount != 2){
//          throw new LotteryBetsException(40001, "投注内容非法");
//      }else{
//          String danResult = AlgorUtil.RX_ZXFS(2, 5, dataList, "RX2FS");
//          System.out.println(danResult);
//      }
//      
        //List<Object> s= (List<Object>)dataList.get(0);
        //String [] s = (String[])dataList.toArray();
        //String s1 = new Gson().toJson(dataList);
        //String zhushu = AlgorUtil.Dan(5, dataList);
        //EveryColorCheck color = new EveryColorCheck();
        //color.checkLotteryBetData(new LotteryBets());
    }
}
