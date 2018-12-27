package com.front.handler;

import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component; 

import com.front.report.RepDataHandlerService;
import com.front.service.ReportService;


@Component(value="teamReportDetailHandler")
public class TeamReportDetailHanlder implements RepDataHandlerService{

	@Autowired
	private ReportService reportService;
	
	@Override
	public Object handlerRepData(List<Map<String, Object>> srcData, Map<String, Object> query) throws Exception
	{
		if(srcData!=null&&!srcData.isEmpty())
		{ 
			List<Map> detail = (List<Map>)this.reportService.getReportResult("statisticsProfitanloss", query);
			if(detail!=null&&!detail.isEmpty())
			{
				Iterator<Map>iter= detail.iterator();
				while(iter.hasNext())
				{
					 srcData.add(iter.next());
				}
			}
			return srcData;
		}
		return null;
	}

}
