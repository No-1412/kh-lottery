package com.front.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import com.front.annotation.LoginRule;
import com.front.common.StringUtils;
import com.front.constant.FrontConstant;
import com.front.model.PageModel;
import com.front.model.User;
import com.google.common.collect.Maps;

@Controller
public class TeamController extends BaseController {

	@RequestMapping(value = "/content/team/coinall")
	@LoginRule
	// 团队统计
	public void coinall(HttpServletRequest request, HttpServletResponse response ) throws Exception {
		User user = super.getLoginUserObject();
		Map<String, Object> param = Maps.newHashMap();
		param.put("uid", user.getId());
		this.renderMsg(response, FrontConstant.SUCCESS_CODE, "", this.reportService.querySingleResult("queryTeamCoin", param));
	}

	@RequestMapping(value = "/content/team/cashRecord")
	// 团队提现
	public String cashRecord(HttpServletRequest request, HttpServletResponse respon, ModelMap map) throws Exception {
		return "team/cashRecord";
	}

	@RequestMapping(value = "/team/pagingCashRecord")
	@LoginRule
	// 团队提现
	public void pagingCashRecord(HttpServletRequest req, HttpServletResponse response, ModelMap map) throws Exception {
		User user = this.getLoginUserObject();
		try {
			Map<String, Object> query = this.buildQueryMap(req);
			query.put("uid", user.getId());
			PageModel pg = this.reportService.pagingReportResult("pagingTeamCashRecord", query);
			pg.setPageIndex(StringUtils.str2Int(req.getParameter(FrontConstant.PAGE_INDEX)));
			this.renderMsg(response, FrontConstant.SUCCESS_CODE, StringUtils.EMPTY, pg.toMap());
		} catch (Exception e) {
			this.renderMsg(response, FrontConstant.FAILED_CODE, e.getMessage(), StringUtils.EMPTY);
		}
	}

	@RequestMapping(value = "/content/team/gameRecord")
	/***
	 * 团队统计的游戏记录
	 * 
	 * @param req
	 * @param resp
	 * @param map
	 * @return
	 * @throws Exception
	 */
	public String enterGameRecord(HttpServletRequest req, HttpServletResponse resp, ModelMap map) throws Exception {
		map.put("lotteryTypeList",
				this.reportService.getReportResult("getRepResultInfo", new HashMap<String, Object>()));
		return "team/gameRecord";
	}

	@RequestMapping("/team/pagingGameRecord")
	@LoginRule
	public void pagingHistory(HttpServletRequest req, HttpServletResponse response, ModelMap modelMap)
			throws Exception {
		User user = this.getLoginUserObject();
		try {
			Map<String, Object> query = this.buildQueryMap(req);
			query.put("uid", user.getId());
			PageModel pg = this.reportService.pagingReportResult("pagingGameRecord", query);
			pg.setPageIndex(StringUtils.str2Int(req.getParameter(FrontConstant.PAGE_INDEX)));
			this.renderMsg(response, FrontConstant.SUCCESS_CODE, StringUtils.EMPTY, pg.toMap());
		} catch (Exception e) {
			this.renderMsg(response, FrontConstant.FAILED_CODE, e.getMessage(), StringUtils.EMPTY);
		}
	}

	@RequestMapping(value = "/content/team/coin")
	/***
	 * 团队统计的游戏记录
	 * 
	 * @param req
	 * @param resp
	 * @param map
	 * @return
	 * @throws Exception
	 */
	public String enterTeamCoin(HttpServletRequest req, HttpServletResponse resp, ModelMap map) throws Exception {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("CATALOG_NAME", "RUN_ACCOUNT");
		map.put("runningAccount", this.reportService.getReportResult("loadDictByCatalog", param));
		return "team/coin";
	}

	@RequestMapping("/team/pagingTeamCoin")
	@LoginRule
	public void pagingTeamCoin(HttpServletRequest req, HttpServletResponse response, ModelMap modelMap)
			throws Exception {
		User user = this.getLoginUserObject();
		try {
			Map<String, Object> query = this.buildQueryMap(req);
			query.put("uid", user.getId());
			PageModel pg = this.reportService.pagingReportResult("pagingTeamCoin", query);
			pg.setPageIndex(StringUtils.str2Int(req.getParameter(FrontConstant.PAGE_INDEX)));
			this.renderMsg(response, FrontConstant.SUCCESS_CODE, StringUtils.EMPTY, pg.toMap());
		} catch (Exception e) {
			this.renderMsg(response, FrontConstant.FAILED_CODE, e.getMessage(), StringUtils.EMPTY);
		}
	}

	@RequestMapping(value = "/content/team/report")
	public String teamReport(HttpServletRequest req, HttpServletResponse response, ModelMap modelMap)
			throws IOException {
		return "team/teamReport";
	}

	@RequestMapping(value = "/team/pagingTeamReport")
	@LoginRule
	public void pagingTeamReport(HttpServletRequest req, HttpServletResponse response, ModelMap modelMap)
			throws IOException {
		try {
			User user = this.getLoginUserObject();
			Map<String, Object> query = this.buildQueryMap(req);
			query.put("uid", user.getId());
			PageModel pg = new PageModel();
			pg.setList(this.reportService.getReportResult("pagingTeamReport", query));
			pg.setTotalItem(1);
			pg.setPageIndex(StringUtils.str2Int(req.getParameter(FrontConstant.PAGE_INDEX)));
			this.renderMsg(response, FrontConstant.SUCCESS_CODE, StringUtils.EMPTY, pg.toMap());
		} catch (Exception e) {
			this.renderMsg(response, FrontConstant.FAILED_CODE, e.getMessage(), StringUtils.EMPTY);
		}
	}

	@RequestMapping(value = "/team/pagingSubTeamReport") // 查询下级 传入当前用户的id uid
	@LoginRule
	public void pagingSubTeamReport(HttpServletRequest req, HttpServletResponse response, ModelMap modelMap)
			throws IOException {
		try {
			Map<String, Object> query = this.buildQueryMap(req);
			PageModel pg = this.reportService.pagingReportResult("pagingTeamReport", query);
			pg.setTotalItem(1);
			pg.setPageIndex(StringUtils.str2Int(req.getParameter(FrontConstant.PAGE_INDEX)));
			this.renderMsg(response, FrontConstant.SUCCESS_CODE, StringUtils.EMPTY, pg.toMap());
		} catch (Exception e) {
			this.renderMsg(response, FrontConstant.FAILED_CODE, e.getMessage(), StringUtils.EMPTY);
		}
	}

}
