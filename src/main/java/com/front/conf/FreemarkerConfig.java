package com.front.conf;

import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;
import org.springframework.web.servlet.view.freemarker.FreeMarkerView;
import org.springframework.web.servlet.view.freemarker.FreeMarkerViewResolver;

import com.front.loader.FrontFileTemplateLoader;
 
import freemarker.cache.SoftCacheStorage; 
import freemarker.template.Version;
 
  
@Configuration  
public class FreemarkerConfig {  
    
	
	@Value("${platform.company.title}")
	private String companyTitle; 
	
	@Value("${platform.cache}")
	private String cache; 
	
	@Value("${platform.base}")
	private String base; 
	 
    
    @Bean(name="freemarkerViewResolver")
    public FreeMarkerViewResolver initFreeMarkerViewResolver()
    {
    	FreeMarkerViewResolver resolver = new FreeMarkerViewResolver();
    	resolver.setViewClass(FreeMarkerView.class);
    	resolver.setOrder(-2147483648);
    	resolver.setContentType("text/html; charset=UTF-8");
    	resolver.setPrefix("/views/");    
    	resolver.setSuffix(".html");
        resolver.setCache(false);   
        resolver.setRequestContextAttribute("request"); //为模板调用时，调用request对象的变量名</span>    
        resolver.setExposeRequestAttributes(true);  
        resolver.setExposeSessionAttributes(true); 
    	return resolver;
    }
    
    @Bean(name="freeMarkerConfigurer")
    public FreeMarkerConfigurer initFreeMarkerConfigurer(@Autowired freemarker.template.Configuration config)
    {
    	FreeMarkerConfigurer configurer = new FreeMarkerConfigurer();
    	configurer.setConfiguration(config);
    	configurer.setDefaultEncoding("utf-8");
    	Properties settings =new Properties();
    	settings.put("tag_syntax", "auto_detect");
    	settings.put("template_update_delay", "5");
    	settings.put("defaultEncoding", "UTF-8");
    	settings.put("output_encoding", "UTF-8");
    	settings.put("url_escaping_charset", "UTF-8");
    	//settings.put("locale", "zh_CN");
    	settings.put("boolean_format", "true,false");
    	
    	settings.put("datetime_format", "yyyy-MM-dd HH:mm:ss");
    	settings.put("date_format", "yyyy-MM-dd");
    	settings.put("time_format", "HH:mm:ss");
    	settings.put("number_format", "0.######");
    	settings.put("whitespace_stripping", "true");
    	configurer.setFreemarkerSettings(settings);
    	return configurer;
    }
    
    @Bean(name="configuration")
    public freemarker.template.Configuration initConfiguration()throws Exception
    {
    	freemarker.template.Configuration config = new freemarker.template.Configuration(new Version("2.3.26-incubating"));
    	config.setTemplateLoader(new FrontFileTemplateLoader());
    	
    	Map<String, Object>freemarkerVariables = new HashMap<>();
        freemarkerVariables.put("platform", companyTitle);
        freemarkerVariables.put("basePath", base);
        freemarkerVariables.put("frontPath", cache); 
    	
        
      	Properties settings =new Properties();
    	settings.put("tag_syntax", "auto_detect");
    	settings.put("template_update_delay", "5");
    	settings.put("defaultEncoding", "UTF-8");
    	settings.put("output_encoding", "UTF-8");
    	settings.put("url_escaping_charset", "UTF-8");
    	settings.put("locale", "zh_CN");
    	settings.put("boolean_format", "true,false");
    	
    	settings.put("datetime_format", "yyyy-MM-dd HH:mm:ss");
    	settings.put("date_format", "yyyy-MM-dd");
    	settings.put("time_format", "HH:mm:ss");
    	settings.put("number_format", "0.######");
    	settings.put("whitespace_stripping", "true");
    	 
    	config.setSettings(settings);
    	
    	config.setSharedVaribles(freemarkerVariables);
    	config.setCacheStorage(new SoftCacheStorage());
    	config.setAutoFlush(false);
    	return config;
    }
    
}  
