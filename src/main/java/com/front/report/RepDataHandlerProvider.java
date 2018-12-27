package com.front.report;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

import com.front.common.StringUtils;



/***
 * 
 * @author hongwu.huang
 * 
 */
@Component
public class RepDataHandlerProvider implements ApplicationContextAware {

	private ApplicationContext appContext;
	
	@Override
	public void setApplicationContext(ApplicationContext context)
			throws BeansException {
		this.appContext = context;
	} 

	public RepDataHandlerService getRepDataHandlerBean(String beanName) {
		 if(StringUtils.isBlank(beanName))
		 {
			 return null;
		 }
		 return (RepDataHandlerService)appContext.getBean(beanName);
	}
}
