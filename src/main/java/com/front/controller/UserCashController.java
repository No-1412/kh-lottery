package com.front.controller;

import java.text.MessageFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.front.annotation.LoginRule;
import com.front.common.DateUtils;
import com.front.common.MD5Util;
import com.front.common.StringUtils;
import com.front.constant.FrontConstant;
import com.front.constant.ReportConstant;
import com.front.constant.UserConstant; 
import com.front.exception.FrontException;
import com.front.model.User;
import com.front.model.UserCash;
import com.front.service.UserCashService;
import com.google.common.collect.Maps;

@Controller
public class UserCashController extends BaseController{

	@Autowired
	public UserCashService userCashService;
	 
    @RequestMapping("/content/bank/tocash")
    @LoginRule
    public void tocash(HttpServletResponse resp)  throws Exception{
    	Map<String,Object> map = Maps.newHashMap();
    	User user = getLoginUserObject(true);
    	map.put("uid", user.getUid());
    	List bankList =(List<Map>)reportService.getReportResult("queryUserBanks", map);
    	if(bankList==null||bankList.isEmpty())
    	{
    		 //modelMap.put("errorMsg", "Y"); 
    		 this.renderMsg(resp, FrontConstant.BUZ_FAILED_CODE, "您暂未绑定银行卡，暂时无法提现！", FrontConstant.BUZ_FAILED_CODE);
    		 return;
    	}
    	Map<String,Object>result = Maps.newHashMap();
    	result.put("cashLower",reportService.queryCmsConf(ReportConstant.CASH_LOWER));
    	result.put("cashUpper",reportService.queryCmsConf(ReportConstant.CASH_UPPER));
    	result.put("cashTime",reportService.queryCmsConf(ReportConstant.CASH_TIME));
    	result.put("user", user);
    	result.put("bankList", bankList);//获取会员绑定的默认银行信息 
    	result.putAll(this.reportService.querySingleResult("queryUserCashInfo", map));
        this.renderMsg(resp, FrontConstant.SUCCESS_CODE, "", result);
    }
     
    @RequestMapping(value="/bank/tocash_submit" , method={RequestMethod.POST,RequestMethod.GET})
    @LoginRule
    public @ResponseBody Map<String,Object> docash(HttpServletRequest req,HttpServletResponse resp, ModelMap modelMap)  throws Exception{
    	Map<String,Object> map = new HashMap<String,Object>();
		int amount = StringUtils.str2Int(req.getParameter("amount"));
		String password = req.getParameter("password");
        User user = getLoginUserObject(true);
        if(user.getVirtualAccount()==UserConstant.VIRTUAL_ACCOUNT){
        	map.put("success", false);
        	map.put("message", "虚拟账户不能提现！");
        	return map;
        }
        if(amount > user.getCoin()){
        	map.put("success", false);
        	map.put("message", "提现金额不能大于账户余额！");
        	return map;
        }
        String ep = MD5Util.MD5(password);
        if(!ep.equals(user.getCoinPassword())){
        	map.put("success", false);
        	map.put("message", "资金密码错误！");
        	return map;
        }  
        try  
        {
          double cashLower=StringUtils.str2Double(reportService.queryCmsConf(ReportConstant.CASH_LOWER));
          double cashUpper=StringUtils.str2Double(reportService.queryCmsConf(ReportConstant.CASH_UPPER));
          if(amount< cashLower||amount>cashUpper){
          	map.put("success", false);
          	map.put("message", MessageFormat.format("提现金额只能在{0}-{1}！", cashLower,cashUpper));
          	return map;
          }
          String cashBtimeStr = reportService.queryCmsConf(ReportConstant.CASH_BTIME);
          String cashEtimeStr = reportService.queryCmsConf(ReportConstant.CASH_ETIME);
          if(!DateUtils.IsRanage(cashBtimeStr,cashEtimeStr))
          {
        	  map.put("success", false);
          	  map.put("message", MessageFormat.format("每天提现时间{0}-凌晨{1}！", cashBtimeStr,cashEtimeStr));
              return map;
          }  
          Map<String,Object>param = new HashMap<String, Object>();
          param.put("uid", user.getUid());
          Map<String,Object>userCashMap= this.reportService.querySingleResult("queryUserCashInfo", param);
          int cashTime =StringUtils.str2Int( reportService.queryCmsConf(ReportConstant.CASH_TIME));
          if(StringUtils.str2Int(userCashMap.get("todayTocashCount")+"")>=cashTime)
          {
        		map.put("success", false);
            	map.put("message", "每天提现次数不能超过"+cashTime+"次！");
            	return map;
          }
          double chargeAmount = StringUtils.str2Double(userCashMap.get("charge_amount"));
          double betsAmount = StringUtils.str2Double(userCashMap.get("bets_amount"));
          if(chargeAmount!=0&&betsAmount*100/chargeAmount<=30){
          	map.put("success", false);
          	map.put("message", "消费比例未达到系统设置的30%！");
          	return map;
          }
          Date now = new Date();
          /*boolean bol = reportService.verification(FrontCheckConstant.ACTIVITY_COMMISSION_CHECK, param);
          if(!bol)
          {
        		map.put("success", false);
            	map.put("message", "活动佣金校验失败！"); 
            	return map;
          }*/
          UserCash userCash = new UserCash();
          userCash.setUid(user.getUid());
          userCash.setUname(user.getLoginName());
          userCash.setApplyTime(now); 
          userCash.setBankName(req.getParameter("bankName"));
          userCash.setBankAccount(req.getParameter("account"));
          userCash.setBankUsername(req.getParameter("uname"));
          userCash.setDepositBank(req.getParameter("openingName"));
          userCash.setAmount(amount);
          userCash.setStatus(-1);
          userCash.setIdentification(req.getParameter("identification"));
          int result = userCashService.doCash(user,userCash);
          if(result==-1)
          {
          	map.put("success", false);
          	map.put("message", "提现金额不能大于账户余额！");
          	return map;
          } 
        }catch (FrontException e) {
        	map.put("success", false);
        	map.put("message", e.getMessage());
        	map.put("errorCode", e.getErrorCode());
        	return map;
		}catch (Exception e) {
        	map.put("success", false);
        	map.put("message", "提现请求已经成功提交， 请勿重复提交！");
        	return map;
		}
        map.put("success", true);
        return map;
    }
    
 
    @RequestMapping(value="/content/bank/tocash/{id}" , method=RequestMethod.GET)
    public String contentToCash(HttpServletRequest req,HttpServletResponse resp, ModelMap modelMap,@PathVariable("chargeId")String charge_id)  throws Exception{
        Map<String, Object>map = new HashMap<String, Object>();
        map.put("id", charge_id);
        modelMap.put("charge", this.reportService.querySingleResult("queryChargeDetail", map));
        return "bank/content-tocash_submit";
    }
    
}
