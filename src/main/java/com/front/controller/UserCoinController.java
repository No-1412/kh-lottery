package com.front.controller;

import com.front.annotation.LoginRule;
import com.front.common.StringUtils;
import com.front.constant.FrontConstant;
import com.front.model.PageModel;
import com.front.model.User;
 
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class UserCoinController extends BaseController {
	
 
	@RequestMapping(value = { "/user/pagingUserCoin" }, method = { org.springframework.web.bind.annotation.RequestMethod.GET })
	@LoginRule
	public void pagingUserCoin(HttpServletRequest req,
			HttpServletResponse resp, ModelMap map) throws Exception {
		User user = getLoginUserObject();
		try {
			Map query = buildQueryMap(req);
			query.put("userId", user.getUid());
			PageModel pg = this.reportService.pagingReportResult(
					"paggingFrontRunningAccount", query);
			pg.setPageIndex(StringUtils.str2Int(req.getParameter("pageIndex")));
			renderMsg(resp, FrontConstant.SUCCESS_CODE, StringUtils.EMPTY,
					pg.toMap());
		} catch (Exception e) {
			renderMsg(resp, FrontConstant.FAILED_CODE, e.getMessage(),
					StringUtils.EMPTY);
		}
	}
	
	
	
	@RequestMapping(value = { "/user/pagingCommission" }, method = { org.springframework.web.bind.annotation.RequestMethod.GET })
	@LoginRule
	public void pagingCommission(HttpServletRequest req,
			HttpServletResponse resp, ModelMap map) throws Exception {
		User user = getLoginUserObject();
		try {
			Map query = buildQueryMap(req);
			query.put("userId", user.getUid());
			PageModel pg = this.reportService.pagingReportResult( "pagingCommission", query);
			pg.setPageIndex(StringUtils.str2Int(req.getParameter("pageIndex")));
			renderMsg(resp, FrontConstant.SUCCESS_CODE, StringUtils.EMPTY,
					pg.toMap());
		} catch (Exception e) {
			renderMsg(resp, FrontConstant.FAILED_CODE, e.getMessage(),
					StringUtils.EMPTY);
		}
	}

	@RequestMapping(value = { "/content/user/rechargeLog" }, method = { org.springframework.web.bind.annotation.RequestMethod.GET })
	public String toRechargeLog(HttpServletRequest req,
			HttpServletResponse resp, ModelMap map) throws Exception {
		return "coin/rechargeLog";
	}

	@RequestMapping(value = { "/user/pagingRechargeLog" }, method = { org.springframework.web.bind.annotation.RequestMethod.GET })
	@LoginRule
	public void pagingRechargeLog(HttpServletRequest req,
			HttpServletResponse resp, ModelMap map) throws Exception {
		User user = getLoginUserObject();
		try {
			Map query = buildQueryMap(req);
			query.put("userId", user.getUid());
			PageModel pg = this.reportService.pagingReportResult(
					"pagingRechargeLog", query);
			pg.setPageIndex(StringUtils.str2Int(req.getParameter("pageIndex")));
			renderMsg(resp, FrontConstant.SUCCESS_CODE, StringUtils.EMPTY,
					pg.toMap());
		} catch (Exception e) {
			renderMsg(resp, FrontConstant.FAILED_CODE, e.getMessage(),
					StringUtils.EMPTY);
		}
	}

	@RequestMapping(value = { "/content/user/toCashLog" }, method = { org.springframework.web.bind.annotation.RequestMethod.GET })
	public String toCashLog(HttpServletRequest req, HttpServletResponse resp,
			ModelMap map) throws Exception {
		return "coin/cashLog";
	}

	@RequestMapping(value = { "/user/pagingCashLog" }, method = { org.springframework.web.bind.annotation.RequestMethod.GET })
	@LoginRule
	public void pagingCashLog(HttpServletRequest req, HttpServletResponse resp,
			ModelMap map) throws Exception {
		User user = getLoginUserObject();
		try {
			Map query = buildQueryMap(req);
			query.put("userId", user.getUid());
			PageModel pg = this.reportService.pagingReportResult(
					"pagingCashLog", query);
			pg.setPageIndex(StringUtils.str2Int(req.getParameter("pageIndex")));
			renderMsg(resp, FrontConstant.SUCCESS_CODE, StringUtils.EMPTY,
					pg.toMap());
		} catch (Exception e) {
			renderMsg(resp, FrontConstant.FAILED_CODE, e.getMessage(),
					StringUtils.EMPTY);
		}
	}
}