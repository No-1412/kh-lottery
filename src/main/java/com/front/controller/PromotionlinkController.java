package com.front.controller;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.front.annotation.LoginRule;
import com.front.common.StringUtils;
import com.front.constant.FrontConstant;
import com.front.constant.ReportConstant;
import com.front.model.PageModel;
import com.front.model.PromotionLinkVo;
import com.front.model.User;
import com.front.service.PromotionLinkService;
import com.google.common.collect.Maps;
/***
 * 推广链接管理
 * @author huang
 *
 */
@Controller
public class PromotionlinkController extends BaseController{

	
	 @Autowired
	 private PromotionLinkService promotionService;
	 
	 @RequestMapping(value="/content/promotionMain")
	 public String enterProLink(HttpServletRequest request,HttpServletResponse rep)throws Exception
	 {
		 return "promotionLink/mainPromLink";
	 }
	 
	 
	 @RequestMapping(value="/promotionLink/queryProLink")
	 @LoginRule
	 public void queryProLink(HttpServletRequest request,HttpServletResponse rep)throws Exception
	 {
		 User user =getLoginUserObject();
		 Map<String, Object>param = Maps.newHashMap();
		 param.put("uid", user.getId());
		 PageModel pg = new PageModel();
	  	 pg.setList(this.reportService.getReportResult("queryUserProLink", param));
         pg.setTotalItem(1);
         pg.setPageIndex(1);
		 this.renderMsg(rep, FrontConstant.SUCCESS_CODE, StringUtils.EMPTY, pg.toMap() );
	 }
	 
	 
	 @RequestMapping(value="/promotionLink/updateProLink")
	 @LoginRule
	 public void updateProLink(HttpServletRequest request,HttpServletResponse rep)throws Exception
	 {
		 User user = super.getLoginUserObject();
		 PromotionLinkVo linkVo = new PromotionLinkVo();
		 linkVo.setId(StringUtils.str2Int(request.getParameter("id")));
		 linkVo.setPromotionLinkName(request.getParameter("promotionLinkName"));
		 linkVo.setUserType(StringUtils.str2Int(request.getParameter("userType")));
		 linkVo.setUserRebate(StringUtils.str2Double(request.getParameter("userRebate")));
		 linkVo.setModifyUser(user.getId());
		 this.promotionService.updatePromotionLink(linkVo);
		 this.renderMsg(rep, FrontConstant.SUCCESS_CODE, StringUtils.EMPTY, StringUtils.EMPTY);
	 }
	 
	 @RequestMapping(value="/promotionLink/delProLink")
	 @LoginRule
	 public void delProLink(HttpServletRequest request,HttpServletResponse rep)throws Exception
	 {
		 int id = StringUtils.str2Int(request.getParameter("id"));
		 PromotionLinkVo linkVo = new PromotionLinkVo();
		 linkVo.setId(id);
		 this.promotionService.delPromotionLink(linkVo);
		 this.renderMsg(rep, FrontConstant.SUCCESS_CODE, StringUtils.EMPTY, StringUtils.EMPTY);
	 }
	 
	 @RequestMapping(value="/content/promotionLink/toReg")
	 public String toRegProm(HttpServletRequest request,HttpServletResponse rep,ModelMap modelMap)throws Exception
	 {
		 User user = super.getLoginUserObject();
	     double fanDian = StringUtils.str2Double(this.reportService.queryCmsConf(ReportConstant.DIFFERENCE));
	     modelMap.put("fanDian", user.getFandian()-fanDian/100);//当前用户的返点，添加下属 的代理，会员不能高于当前返点
	     modelMap.put("minRebate", StringUtils.str2Double(this.reportService.queryCmsConf(ReportConstant.MIN_REBATE)));
	     modelMap.put("dc", fanDian);//点差
		 return "promotionLink/addPromLink";
	 }
	 
	 
	 @RequestMapping(value="/content/promotionLink/toUpdateProm")
	 @LoginRule
	 public String toUpdateProm(HttpServletRequest request,HttpServletResponse rep,ModelMap modelMap)throws Exception
	 {
		 int id = StringUtils.str2Int(request.getParameter("id"));
		 User user = super.getLoginUserObject();
	     double fanDian = StringUtils.str2Double(this.reportService.queryCmsConf(ReportConstant.DIFFERENCE));
	     modelMap.put("fanDian", user.getFandian()-fanDian/100);//当前用户的返点，添加下属 的代理，会员不能高于当前返点
	     modelMap.put("minRebate", StringUtils.str2Double(this.reportService.queryCmsConf(ReportConstant.MIN_REBATE)));
	     modelMap.put("dc", fanDian);//点差
	     modelMap.put("promotionLink", promotionService.queryPromotionLink(id));
		 return "promotionLink/updatePromLink";
	 }
	 
	 
	 @RequestMapping(value="/promotionLink/saveProLink")
	 public void saveProm(HttpServletRequest request,HttpServletResponse rep)throws Exception
	 {
		 User user = super.getLoginUserObject();
		 PromotionLinkVo linkVo = new PromotionLinkVo();
	     double rebate = new BigDecimal(StringUtils.str2Double(request.getParameter("userRebate"))).divide(new BigDecimal("100")).doubleValue();
		 linkVo.setUid(user.getId());
		 linkVo.setUserId(user.getUid());
		 linkVo.setPromotionLinkName(request.getParameter("promotionLinkName"));
		 linkVo.setUserType(StringUtils.str2Int(request.getParameter("userType")));
		 linkVo.setUserRebate(rebate);
		 linkVo.setExpire(request.getParameter("expire"));
		 linkVo.setFrequency(StringUtils.str2Int(request.getParameter("frequency")));
		 linkVo.setCreateUser(user.getId());
		 linkVo.setModifyUser(user.getId());
		 this.promotionService.addPromotionLink(linkVo);
		 this.renderMsg(rep, FrontConstant.SUCCESS_CODE, StringUtils.EMPTY, StringUtils.EMPTY);
	 }
	 
	 @RequestMapping(value="/promLink/{promotionlink}")
	 public String promLink(@PathVariable("promotionlink") String promLink,HttpServletRequest request,HttpServletResponse rep,ModelMap map)throws Exception
	 { 
		 map.put("promotionlink", promLink);
		 return "user/register";
	 }
}
