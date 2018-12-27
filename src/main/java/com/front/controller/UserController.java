package com.front.controller;

import java.util.Date; 
import java.util.List; 
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod; 

import com.front.annotation.LoginRule;
import com.front.common.MD5Util;
import com.front.common.StringUtils;
import com.front.constant.FrontConstant; 
import com.front.model.User;
import com.front.model.UserBank;
import com.front.service.UserBankService;
import com.front.service.UserService;

@Controller
@Transactional
@RequestMapping(value = "/user/*")
public class UserController extends BaseController{
    
    @Autowired
    private UserService userService;
    
    
    @Autowired
    private UserBankService userBankService;
    
     
    @RequestMapping(value = "bankInfo/{id}", method = RequestMethod.GET)
    public void userBankInfo( @PathVariable("id") int  id, HttpServletResponse response)  throws Exception{
         this.renderMsg(response, FrontConstant.SUCCESS_CODE, "", userBankService.selectByPrimaryKey(id));
    }
    
 
    @RequestMapping(value = "content/setUserBank", method = {RequestMethod.GET,RequestMethod.POST})
    public void onDefUserBank(HttpServletRequest req,HttpServletResponse response, ModelMap modelMap)  throws Exception{
       try
       {
    	// 一般不会为空，这里容灾处理一下
    	String id =req.getParameter("id");
    	String userBankStatus=req.getParameter("userBankStatus");
    	String userBankDefault =req.getParameter("userBankDefault");
        if(!StringUtils.isBlank(id))
        {
        	User user = getLoginUserObject();
        	UserBank ub = new UserBank();
        	ub.setId(StringUtils.str2Int(id));
        	ub.setUid(user.getUid());
        	 // 2根据Id找到银行数据，设置成默认
            UserBank userBank = userBankService.selectByKeyAndUid(ub);
            userBank.setStatus(userBankStatus);
            userBank.setIsDefault(userBankDefault);
            userBankService.updateByPrimaryKey(userBank);
        } 
           this.renderMsg(response, FrontConstant.SUCCESS_CODE, StringUtils.EMPTY, StringUtils.EMPTY);
       }catch (Exception e) {
    	   this.renderMsg(response, FrontConstant.FAILED_CODE, e.getMessage(), StringUtils.EMPTY);
	   }
    }
    
    @RequestMapping(value = "content/opUserBank", method = RequestMethod.POST)
    public void opUserBank(HttpServletRequest req, HttpServletResponse resp, ModelMap modelMap, @ModelAttribute("userBank") UserBank userBank)  throws Exception{
        try
        {   
            User user = getLoginUserObject(true);
            if (StringUtils.isEmpty(user.getCoinPassword()))
            {
                this.renderMsg(resp, FrontConstant.FAILED_CODE, "绑定银行卡前请先设置资金密码", StringUtils.EMPTY);
                return;
            } 
            boolean userCoin =  false;
            List<UserBank> userBanks = userBankService.selectUserBankByUserId(user.getUid());
            if (null != userBanks)
            {
                    if (userBanks.size() >= 3)
                    {
                        this.renderMsg(resp, FrontConstant.FAILED_CODE, "最多只支持绑定3张银行卡。", StringUtils.EMPTY);
                        return;
                    }
                    else if (userBanks.size() > 0)
                    {
                        // 只能绑定同一个用户的银行卡
                        if (!StringUtils.equalsIgnoreCase(userBank.getUsername(),userBanks.get(0).getUsername()))
                        {
                            this.renderMsg(resp, FrontConstant.FAILED_CODE, "银行卡账户姓名必须是同一个人。", StringUtils.EMPTY);
                            return;
                        }
                        for(UserBank bank:userBanks)
                        {
                        	 if(StringUtils.equals(bank.getGiftMoney(), "Y"))
                        	 {
                        		  userCoin=true;
                        		  break;
                        	 }
                        }
                    }
                }
                // 设置用户信息
                userBank.setUid(user.getUid());
                userBank.setUname(user.getLoginName());
                userBank.setCreateUser(user.getId());
                userBank.setCreateDate(new Date()); 
                userBankService.bindUserBank(userBank,userCoin);
                this.renderMsg(resp, FrontConstant.SUCCESS_CODE, "", StringUtils.EMPTY);
        }
        catch (Exception e)
        {
            this.renderMsg(resp, FrontConstant.FAILED_CODE, e.getMessage(), StringUtils.EMPTY);
        }
        
        return;
    }
    
    @RequestMapping("content/passwd")
    public String passwd(ModelMap modelMap)  throws Exception{
        User userInfo = super.getLoginUserObject();
        modelMap.put("userInfo", userInfo);
        return "user/passwd";
    }
    
    @RequestMapping("content/coinPasswd")
    @LoginRule
    public void coinPasswd(HttpServletResponse resp)  throws Exception{
        User userInfo = super.getLoginUserObject(true);
        if(StringUtils.isBlank(userInfo.getCoinPassword()))
        {
        	this.renderMsg(resp, FrontConstant.SUCCESS_CODE, "", "Y");
        	return ;
        } 
        this.renderMsg(resp, FrontConstant.SUCCESS_CODE, "", "N"); 
    }
 
    
    @RequestMapping("content/info")
    public String info(ModelMap modelMap)  throws Exception{
        User user = getLoginUserObject(true); 
        modelMap.put("userinfo", user);  
        return "user/userInfo";
    }
    
    
    @RequestMapping("content/banklist")
    @LoginRule   
    public void banklist(HttpServletRequest req, HttpServletResponse resp)  throws Exception{
        User user = getLoginUserObject(true);
        if(!StringUtils.isBlank(user.getCoinPassword()))
        { 
            this.renderMsg(resp, FrontConstant.SUCCESS_CODE, "", userBankService.selectByUserId(user.getUid()));
            return;
        } 
        this.renderMsg(resp, FrontConstant.BUZ_FAILED_CODE, "未设置资金密码，请先设置资金密码！", "");
        return; 
    }
    
    @RequestMapping(value = "mdUserPasswd", method = RequestMethod.POST)
    @LoginRule
    public void mdUserPasswd(HttpServletRequest req, HttpServletResponse resp)  throws Exception{
        String userPassword = req.getParameter("userPassword");
        String newUserPassword = req.getParameter("newUserPassword");
        User user = getLoginUserObject(true);
        String msg = "修改密码成功";
        if (!StringUtils.isEmpty(userPassword))
        {
            userPassword = MD5Util.MD5(userPassword);
            if (!userPassword.equals(user.getUserPassword()))
            {
                msg = "原始密码不正确！";
                this.renderMsg(resp, FrontConstant.FAILED_CODE, msg, StringUtils.EMPTY);
                return;
            }
        }
        // 加密新密码
        user.setUserPassword(MD5Util.MD5(newUserPassword));
        userService.updateUser(user);
        this.renderMsg(resp, FrontConstant.SUCCESS_CODE, msg, StringUtils.EMPTY);
    }
    
    @RequestMapping(value = "updateCoinPasswd", method = RequestMethod.POST)
    @LoginRule
    public void updateCoinPasswd(HttpServletRequest req,HttpServletResponse resp)  throws Exception{
        String coinPassword = req.getParameter("coinPassword");
        String newCoinPassword = req.getParameter("newCoinPassword");
        User user = getLoginUserObject(true);
        String msg = "修改资金密码成功";
        if (!StringUtils.isEmpty(newCoinPassword))
        {
            newCoinPassword =MD5Util.MD5(newCoinPassword);
            if (newCoinPassword.equals(user.getUserPassword()))
            {
                msg = "资金密码与登录密码不能相同";
                this.renderMsg(resp, FrontConstant.FAILED_CODE, msg, StringUtils.EMPTY);
                return;
            }
            String oldCoinPassword = user.getCoinPassword();
            if (!StringUtils.isEmpty(oldCoinPassword))
            {
                coinPassword =MD5Util.MD5(coinPassword);
                if (!coinPassword.equals(oldCoinPassword))
                {
                    msg = "原始密码不正确！";
                    this.renderMsg(resp, FrontConstant.FAILED_CODE, msg, StringUtils.EMPTY);
                    return;
                }
            }
            // 加密新密码
            user.setCoinPassword(newCoinPassword);
            userService.updateUser(user);
            this.renderMsg(resp, FrontConstant.SUCCESS_CODE, msg, StringUtils.EMPTY);
        }
        else
        {
            msg = "新密码不能为空";
            this.renderMsg(resp, FrontConstant.FAILED_CODE, msg, StringUtils.EMPTY);
            return;
        } 
	}
    
    
    
    @RequestMapping(value = "setCoinPasswd", method = RequestMethod.POST)
    @LoginRule
    public void setCoinPasswd(HttpServletRequest req,HttpServletResponse resp)  throws Exception{
        String coinPassword = req.getParameter("coinPassword");
        User user = getLoginUserObject();
        String msg = "设置资金密码成功";
        if (!StringUtils.isEmpty(coinPassword))
        {
            String coinPasswordEncrypt = MD5Util.MD5(coinPassword);
            if (coinPasswordEncrypt.equals(user.getUserPassword()))
            {
                msg = "资金密码与登录密码不能相同";
                this.renderMsg(resp, FrontConstant.FAILED_CODE, msg, StringUtils.EMPTY);
                return;
            }  
            // 加密新密码
            user.setCoinPassword(coinPasswordEncrypt);
            userService.updateUser(user);
            this.renderMsg(resp, FrontConstant.SUCCESS_CODE, msg, StringUtils.EMPTY);
            return;
        }
        else
        {
            msg = "新密码不能为空";
            this.renderMsg(resp, FrontConstant.FAILED_CODE, msg, StringUtils.EMPTY);
        }
       
	}
	
    @RequestMapping("userInfo")
    public void userInfo(HttpServletResponse response)  throws Exception{
        User user = getLoginUserObject(true);
        if(user!=null)
           this.renderMsg(response, FrontConstant.SUCCESS_CODE, StringUtils.EMPTY, user);
        else 
           this.renderMsg(response, FrontConstant.FAILED_CODE, StringUtils.EMPTY, StringUtils.EMPTY);
    }
    
    @RequestMapping("loginOut")
    public void loginOut(HttpServletRequest req,HttpServletResponse response)  throws Exception{
        HttpSession session = req.getSession();
        session.removeAttribute(FrontConstant.USER_SESSION_KEY);
        this.renderMsg(response, FrontConstant.SUCCESS_CODE, StringUtils.EMPTY, StringUtils.EMPTY);
    }
    
    /**
     * 修改昵称
     * @param req
     * @param resp
     * @throws Exception
     */
    @RequestMapping(value = "modUserName", method = RequestMethod.POST)
    public void modUserName(HttpServletRequest req,HttpServletResponse resp)  throws Exception{
        String userName = req.getParameter("userName");
        String msg = "修改昵称成功";
        User user = getLoginUserObject();
        if (!StringUtils.isEmpty(userName))
        {
            // 修改昵称
            user.setUserName(userName);
            userService.updateUser(user);
            this.renderMsg(resp, FrontConstant.SUCCESS_CODE, msg, StringUtils.EMPTY);
            return;
        }
        msg = "昵称不能为空";
        this.renderMsg(resp, FrontConstant.FAILED_CODE, msg, StringUtils.EMPTY);
        return;
    }
}
