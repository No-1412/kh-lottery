package com.front.app;

import org.springframework.boot.Banner.Mode;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.data.redis.RedisAutoConfiguration;
import org.springframework.boot.autoconfigure.freemarker.FreeMarkerAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.JdbcTemplateAutoConfiguration;
import org.springframework.boot.autoconfigure.websocket.WebSocketAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
 
@SpringBootApplication(scanBasePackages = {
		"com.front.controller", 
		"com.front.redis", 
		"com.front.conf", 
		"com.front.convert",
		"com.front.service",
		"com.front.dao",
		"com.front.report",
		"com.front.handler",
		"com.front.aspect",
		"com.front.cache",
		"com.front.check.*"
}, exclude = { 
		WebSocketAutoConfiguration.class,
		RedisAutoConfiguration.class, 
		DataSourceAutoConfiguration.class,
		JdbcTemplateAutoConfiguration.class,
		FreeMarkerAutoConfiguration.class
		})
public class FrontApplication {

	/**
	 * 
	 * @desc 
	 * @param args
	 */
	public static void main(String[] args) { 
			new SpringApplicationBuilder(FrontApplication.class).web(true).bannerMode(Mode.CONSOLE).run(args);
	}
}
