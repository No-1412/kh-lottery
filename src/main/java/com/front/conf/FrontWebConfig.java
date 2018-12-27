package com.front.conf;

import org.apache.catalina.connector.Connector;
import org.apache.coyote.http11.Http11NioProtocol;
import org.springframework.boot.autoconfigure.web.HttpMessageConverters;
import org.springframework.boot.context.embedded.EmbeddedServletContainerFactory;
import org.springframework.boot.context.embedded.tomcat.TomcatConnectorCustomizer;
import org.springframework.boot.context.embedded.tomcat.TomcatEmbeddedServletContainerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.http.MediaType;
import org.springframework.http.converter.ByteArrayHttpMessageConverter;
import org.springframework.http.converter.FormHttpMessageConverter;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.http.converter.support.AllEncompassingFormHttpMessageConverter;
import org.springframework.http.converter.xml.MappingJackson2XmlHttpMessageConverter;
import org.springframework.http.converter.xml.SourceHttpMessageConverter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;


import java.util.ArrayList;
import java.util.List;

@Configuration
public class FrontWebConfig extends WebMvcConfigurerAdapter {

	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
		registry.addViewController("/").setViewName("forward:/index");
		registry.setOrder(Ordered.HIGHEST_PRECEDENCE);
		super.addViewControllers(registry);
	}

	@Bean
	@SuppressWarnings("rawtypes")
	public HttpMessageConverters httpMessageConverter() {
		List<HttpMessageConverter<?>> l = new ArrayList<HttpMessageConverter<?>>();
		l.add(new MappingJackson2HttpMessageConverter());
		l.add(new ByteArrayHttpMessageConverter());
		l.add(new SourceHttpMessageConverter());
		l.add(formHttpMessageConverter());
		l.add(new StringHttpMessageConverter());
		l.add(new AllEncompassingFormHttpMessageConverter());
		l.add(new MappingJackson2XmlHttpMessageConverter());
		HttpMessageConverters converters = new HttpMessageConverters(l);
		return converters;
	}

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/*").addResourceLocations("classpath:/resources/");
	}

	/**
	 * 
	 * @return
	 */
	private FormHttpMessageConverter formHttpMessageConverter() {
		List<MediaType> types = new ArrayList<>();

		types.add(MediaType.APPLICATION_FORM_URLENCODED);
		types.add(MediaType.MULTIPART_FORM_DATA);
		types.add(MediaType.valueOf(MediaType.APPLICATION_FORM_URLENCODED_VALUE + ";charset=UTF-8"));

		FormHttpMessageConverter fhmc = new FormHttpMessageConverter();
		fhmc.setSupportedMediaTypes(types);

		return fhmc;
	}
	


	/**
	 * 跨域处理
	 */
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**").allowedOrigins("*")
				.allowedHeaders("Content-Type", "Accept", "X-Requested-With", "remember-me", "auth")
				.exposedHeaders("auth").allowedMethods("POST", "GET", "DELETE", "OPTIONS").allowCredentials(true)
				.maxAge(3600);
		super.addCorsMappings(registry);
	}
	
	@Bean
	public EmbeddedServletContainerFactory createEmbeddedServletContainerFactory() {
		TomcatEmbeddedServletContainerFactory tomcatFactory = new TomcatEmbeddedServletContainerFactory();
		tomcatFactory.addConnectorCustomizers(new FrontTomcatConnectorCustomizer());
		return tomcatFactory;
	}
	
	
	class FrontTomcatConnectorCustomizer implements TomcatConnectorCustomizer
	{  
	    public void customize(Connector connector)  
	    {  
	        Http11NioProtocol protocol = (Http11NioProtocol) connector.getProtocolHandler();  
	        //设置最大连接数  
	        protocol.setMaxConnections(2000);  
	        //设置最大线程数  
	        protocol.setMaxThreads(2000);  
	        protocol.setConnectionTimeout(30000);  
	    }  
	}  

}
