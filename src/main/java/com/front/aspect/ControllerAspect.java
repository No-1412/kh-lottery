package com.front.aspect;

import java.io.IOException;
import java.io.PrintWriter;
import java.lang.annotation.Annotation;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory; 
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody; 
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes; 
import org.springframework.web.servlet.ModelAndView;

import com.front.annotation.LoginRule; 
import com.front.common.SiteUtil;
import com.front.exception.LoginException;
import com.front.model.User;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder; 

@Aspect
@Component(value = "frontAspect")
public class ControllerAspect {

	private static final Logger logger = LoggerFactory.getLogger(ControllerAspect.class);

	// Controller层切点
	@Pointcut("execution(* com.front.controller..*.*(..))")
	public void controllerAspect() {
	}

  

	@Around("controllerAspect()")
	public Object doAround(ProceedingJoinPoint pjp) throws Throwable {
		boolean isJson = isJson(pjp);
		HttpServletResponse response = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes())
				.getResponse();// 获取response
		try {
			LoginRule rule = (LoginRule) getMethodAnnotation(LoginRule.class, pjp);
			if (rule != null && rule.needLogin()) {
				User user = SiteUtil.getLoginUserObject();
				if (user == null) // 判断当前请求是否登录
				{
					if (isJson) {
						Map<String, Object> result = new HashMap<String, Object>();
						result.put("retcode", 403);
						result.put("retmsg", "您尚未登录或登录时间过长,请重新登录!");
						result.put("data", "您尚未登录或登录时间过长,请重新登录!");
						this.renderJson(response,
								new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").create().toJson(result));
						return null;
					}
				}
			}
			Object result = pjp.proceed();
			return result;
		} catch (Exception ex) {
			logger.error("doAround.error:{}", ex);
			throw ex;
		}
	}

	/**
	 * @desc 判断判断是否是ajax请求
	 * @param pjp
	 * @return
	 * @throws Throwable
	 */
	private boolean isJson(ProceedingJoinPoint pjp) throws Throwable {
		MethodSignature methodSignature = (MethodSignature) pjp.getSignature();
		Method method = methodSignature.getMethod(); 
		return (void.class == method.getReturnType()||method.getAnnotation(ResponseBody.class)!=null);
	}
	
	



	/***
	 *  判断是否是ajax请求
	 * @param httpRequest
	 * @return
	 */
    private boolean isAjax(HttpServletRequest httpRequest)
    {
        return "XMLHttpRequest".equalsIgnoreCase(httpRequest.getHeader("X-Requested-With"));
    }
    
    
    /**
	 * 统一异常处理
	 * 
	 * @param req
	 * @param resp
	 * @param handler
	 * @param ex
	 * @return
	 */
	@ExceptionHandler
	@ResponseBody
	public ModelAndView resolveException(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) 
	{
		logger.error("resolveException.ex:{}",ex);
		response.setCharacterEncoding("UTF-8");
		if(ex instanceof LoginException)
		{
		    if (isAjax(request)) //是ajax请求  返回错误代码
            {
		      try
		      {
		      PrintWriter out = response.getWriter();
		   	  response.setStatus(403);
		   	  Map<String,Object>result=  new HashMap<String, Object>();
		   	  result.put("errorcode", 403);
		   	  result.put("message", "您尚未登录或登录时间过长,请重新登录!");
              out.println(new Gson().toJson(result));
              out.flush();
              out.close();
              }catch (Exception e) {
            	  e.printStackTrace();
			  }
            }
		    else
		    {
		    	ModelAndView view = new ModelAndView("redirect:/");
		    	return view;
		    }
		}else  
		{
			 if (isAjax(request)) //是ajax请求  返回错误代码
			 {
				   try
				   {
				      PrintWriter out = response.getWriter();
				   	  response.setStatus(500);
				   	  Map<String,Object>result=  new HashMap<String, Object>();
				   	  result.put("errorcode", 500);
				   	  result.put("message", "服务器网络异常，请刷新重试!");
		              out.println(new Gson().toJson(result));
		              out.flush();
		              out.close();
		              }catch (Exception e) {
		            	  e.printStackTrace();
					 }
			 }
			 else
			 {
			    	ModelAndView view = new ModelAndView("redirect:/");
			    	return view;
			 }
		}
		return null;
	}



	/**
	 * 获取方法注解
	 * 
	 * @param an
	 * @param pjp
	 * @return
	 */
	private Annotation getMethodAnnotation(Class<? extends Annotation> an, ProceedingJoinPoint pjp) {
		// 获取执行的方法
		MethodSignature methodSignature = (MethodSignature) pjp.getSignature();
		Method method = methodSignature.getMethod();

		return method.getAnnotation(an);
	}

	/**
	 * 发送json。使用UTF-8编码。
	 * 
	 * @param response
	 *            HttpServletResponse
	 * @param text
	 *            发送的字符串
	 * @throws IOException
	 */
	private void renderJson(HttpServletResponse response, String text) throws IOException {
		render(response, "application/json;charset=UTF-8", text);
	}

	/**
	 * 发送内容。使用UTF-8编码。
	 * 
	 * @param response
	 * @param contentType
	 * @param text
	 * @throws IOException
	 */
	private void render(HttpServletResponse response, String contentType, String text) throws IOException {
		response.setContentType(contentType);
		response.setHeader("Pragma", "No-cache");
		response.setHeader("Cache-Control", "no-cache");
		response.setDateHeader("Expires", 0);
		response.getWriter().write(text);
		response.getWriter().flush();
	}

}
