package com.front.controller;

import com.front.common.StringUtils;
import com.front.model.PageModel;
import com.google.common.collect.Maps;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class NoticeController extends BaseController {
	
	@RequestMapping({ "/content/notice/info" })
	public String enter(ModelMap modelMap) throws Exception {
		return "notice/noticeMain";
	}

	@RequestMapping(value = "/notice/detail/{noticeId}", method = RequestMethod.GET)
	public String detail(HttpServletRequest req, HttpServletResponse response, ModelMap modelMap,
			@PathVariable("noticeId") String noticeId) throws Exception {
		Map map = Maps.newHashMap();
		map.put("page_id", noticeId);
		modelMap.put("noticeDetail", ((List<Map>)reportService.getReportResult("queryNoticeDetail", map)).get(0));
		return "notice/detail";
	}

	@RequestMapping({ "/notice/pagingPageContent" })
	public void pagingSystemNotice(HttpServletRequest req, HttpServletResponse response, ModelMap modelMap)
			throws Exception {
		try {
			Map query = buildQueryMap(req);
			query.put("pageContentStatus", "Y");
			PageModel pg = this.reportService.pagingReportResult("pagingPageContent", query);
			pg.setPageIndex(StringUtils.str2Int(req.getParameter("pageIndex")));
			renderMsg(response, 0, "", pg.toMap());
		} catch (Exception e) {
			renderMsg(response, -1, e.getMessage(), "");
		}
	}

	@RequestMapping(value = "/content/notice/announcement", method = RequestMethod.GET)
	public String announcement(HttpServletRequest req, HttpServletResponse response, ModelMap modelMap)
			throws Exception {
		modelMap.put("noticeDetail", this.reportService.querySingleResult("queryAnnouncement", null));
		return "notice/announcement";
	}
}