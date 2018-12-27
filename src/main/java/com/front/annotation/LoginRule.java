package com.front.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface LoginRule {
	/**
	 * 是否检测登录
	 * @return
	 */
	public boolean needLogin() default true;
  

}
