package com.front.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.front.annotation.LoginRule;
import com.front.common.StringUtils;
import com.front.constant.FrontConstant;
import com.front.model.PageModel;
import com.front.model.User;

/**
 * 游戏记录
 * @author GusonYang
 *
 */
@Controller
public class LotteryBetController extends BaseController{

    @RequestMapping("/content/history/info")
    public String ContentHome(ModelMap modelMap) throws Exception{
    	modelMap.put("lotteryTypeList", this.reportService.getReportResult("getRepResultInfo", new HashMap<String, Object>()));
        return "history/content-history";
    }
	 
    @RequestMapping("/bet/pagingHistory")
    @LoginRule
    public void pagingHistory(HttpServletRequest req,HttpServletResponse response,ModelMap modelMap)throws Exception  {
    	 User user = this.getLoginUserObject();
    	 try
    	 {
    	    Map<String,Object>query = this.buildQueryMap(req);
            query.put("uid", user.getUid());
    	    PageModel pg = this.reportService.pagingReportResult("pagingHistory", query);
    	    pg.setPageIndex(StringUtils.str2Int(req.getParameter(FrontConstant.PAGE_INDEX)));
    	    this.renderMsg(response, FrontConstant.SUCCESS_CODE, StringUtils.EMPTY, pg.toMap());
    	 }catch (Exception e) 
    	 {
    		this.renderMsg(response, FrontConstant.FAILED_CODE, e.getMessage(), StringUtils.EMPTY);
		}
    }
    
    
    
    @RequestMapping("/bet/paginglotteryReport")
    @LoginRule
    public void paginglotteryReport(HttpServletRequest req,HttpServletResponse response,ModelMap modelMap)throws Exception  {
    	 User user = this.getLoginUserObject();
    	 try
    	 {
    	    Map<String,Object>query = this.buildQueryMap(req);
            query.put("uid", user.getUid());
    	    PageModel pg = this.reportService.pagingReportResult("paginglotteryReport", query);
    	    pg.setPageIndex(StringUtils.str2Int(req.getParameter(FrontConstant.PAGE_INDEX)));
    	    this.renderMsg(response, FrontConstant.SUCCESS_CODE, StringUtils.EMPTY, pg.toMap());
    	 }catch (Exception e) 
    	 {
    		this.renderMsg(response, FrontConstant.FAILED_CODE, e.getMessage(), StringUtils.EMPTY);
		}
    }
    
    
    @RequestMapping("/bet/pagingAppendBet")
    @LoginRule
    public void pagingAppendBet(HttpServletRequest req,HttpServletResponse response,ModelMap modelMap)throws Exception  {
    	 User user = this.getLoginUserObject();
    	 try
    	 {
    	    Map<String,Object>query = this.buildQueryMap(req);
            query.put("uid", user.getUid());
    	    PageModel pg = this.reportService.pagingReportResult("pagingAppendBet", query);
    	    pg.setPageIndex(StringUtils.str2Int(req.getParameter(FrontConstant.PAGE_INDEX)));
    	    this.renderMsg(response, FrontConstant.SUCCESS_CODE, StringUtils.EMPTY, pg.toMap());
    	 }catch (Exception e) 
    	 {
    		this.renderMsg(response, FrontConstant.FAILED_CODE, e.getMessage(), StringUtils.EMPTY);
		}
    }
    
    
    @RequestMapping("/bet/personalLotteryReport")
    @LoginRule
    public void personalLotteryReport(HttpServletRequest req,HttpServletResponse response,ModelMap modelMap)throws Exception  {
    	 User user = this.getLoginUserObject();
    	 try
    	 {
    	    Map<String,Object>query = this.buildQueryMap(req);
            query.put("uid", user.getUid());
    	    PageModel pg = this.reportService.pagingReportResult("personalLotteryReport", query);
    	    pg.setPageIndex(StringUtils.str2Int(req.getParameter(FrontConstant.PAGE_INDEX)));
    	    this.renderMsg(response, FrontConstant.SUCCESS_CODE, StringUtils.EMPTY, pg.toMap());
    	 }catch (Exception e) 
    	 {
    		this.renderMsg(response, FrontConstant.FAILED_CODE, e.getMessage(), StringUtils.EMPTY);
		}
    }
    
    
    
    @RequestMapping("/bet/teamLotteryReport")
    @LoginRule
    public void teamLotteryReport(HttpServletRequest req,HttpServletResponse response,ModelMap modelMap)throws Exception  {
    	 User user = this.getLoginUserObject();
    	 try
    	 {
    	    Map<String,Object>query = this.buildQueryMap(req);
            query.put("uid", user.getId());
    	    PageModel pg = this.reportService.pagingReportResult("teamLotteryReport", query);
    	    pg.setPageIndex(StringUtils.str2Int(req.getParameter(FrontConstant.PAGE_INDEX)));
    	    this.renderMsg(response, FrontConstant.SUCCESS_CODE, StringUtils.EMPTY, pg.toMap());
    	 }catch (Exception e) 
    	 {
    		this.renderMsg(response, FrontConstant.FAILED_CODE, e.getMessage(), StringUtils.EMPTY);
		}
    }
    
    
	/** 
	 * @desc 获取当前投注的盈亏 
	 * @throws SystemDBException
	 * @throws IOException
	 */
	@RequestMapping(value = "/lottery/queryBetProfit", method = RequestMethod.GET)
	public void queryBetProfit(HttpServletRequest req, HttpServletResponse resp) throws Exception 
	{
		Map<String, Object> param = this.buildQueryMap(req);
		User user =  super.getLoginUserObject();
		param.put("uid", user.getUid());
		this.renderMsg(resp, FrontConstant.SUCCESS_CODE, StringUtils.EMPTY, this.reportService.getReportResult("queryBetProfit", param));
	}
}
