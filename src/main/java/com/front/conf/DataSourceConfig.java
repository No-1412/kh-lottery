package com.front.conf;

import java.io.IOException;
import java.sql.SQLException; 

import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.mapper.MapperScannerConfigurer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory; 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureAfter; 
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.alibaba.druid.pool.DruidDataSource;
import com.front.redis.CmsRedisBean;
import com.front.redis.CmsRedisFactory;
 

 

@Configuration
@AutoConfigureAfter(JdbcConfig.class)
@EnableTransactionManagement(proxyTargetClass = true)
@EnableAspectJAutoProxy(proxyTargetClass = true)
public class DataSourceConfig  {

	private static final Logger logger = LoggerFactory.getLogger(DataSourceConfig.class);

	
	@Bean
	public MapperScannerConfigurer basicMapperScannerConfigurer() {
		MapperScannerConfigurer mapperScannerConfigurer = new MapperScannerConfigurer();
		mapperScannerConfigurer.setSqlSessionTemplateBeanName("sqlSessionTemplate");
		mapperScannerConfigurer.setBasePackage("com.front.dao.mapper");
		return mapperScannerConfigurer;
	}


	@Bean(name = "cmsRedisBean")
	public CmsRedisBean getRedisBean() {
		return new CmsRedisBean();
	}

	@Bean(name="cmsRedisFactory")
	public Object initRedisFactory(@Autowired CmsRedisBean bean ) {
		CmsRedisFactory factory = CmsRedisFactory.getInstance();
		factory.init(bean);
		return factory;
	}
	
	
	@Bean(name = "jdbcConfig")
	public JdbcConfig multiJdbcConfig() {
		return new JdbcConfig();
	}

 

	/**
	 * 
	 * @param global
	 * @param config
	 * @return
	 * @throws SQLException
	 */
	@Bean(name = "cmsDataSource")
	public DataSource createDatasourceBean(@Autowired JdbcConfig jdbc) {
		Global global = jdbc.getGlobal();
		SubJdbcConfig config = jdbc.getDefaultSubJdbcConfig();
		DruidDataSource datasource = new DruidDataSource();
		datasource.setUrl(config.getUrl());
		datasource.setDriverClassName(global.getDriverClassName());
		datasource.setUsername(global.getUser());
		datasource.setPassword(global.getPassword());
		datasource.setInitialSize(global.getPoolSize());
		datasource.setMinIdle(global.getMinIdle());
		datasource.setMaxWait(global.getMaxWait());
		datasource.setMaxActive(global.getMaxActive());
		datasource.setMinEvictableIdleTimeMillis(global.getMinEictableIdleTimeMillis());
		return datasource;
	}

	/**
	 * 
	 * @param datasource
	 * @return
	 * @throws Exception
	 */
	@Bean(name = "cmsSqlSessionFactory")
	public SqlSessionFactory getSqlSessionFactory(@Autowired DataSource datasource) throws Exception {
		SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
		sqlSessionFactoryBean.setDataSource(datasource);
		sqlSessionFactoryBean.setConfigLocation(new ClassPathResource("config/mybatis-config.xml"));
		PathMatchingResourcePatternResolver pathMatchingResourcePatternResolver = new PathMatchingResourcePatternResolver();
		try {
			sqlSessionFactoryBean
					.setMapperLocations(pathMatchingResourcePatternResolver.getResources("classpath:mappers/*.xml"));
		} catch (IOException e) {
			logger.error("--------------------扫描mybatis映射文件失败", e);
		}
		return sqlSessionFactoryBean.getObject();
	}

	@Bean
	public PlatformTransactionManager txManager(@Autowired DataSource ds) { 
		return new DataSourceTransactionManager(ds);
	}

	@Bean(name = "sqlSessionTemplate")
	public SqlSessionTemplate multiSqlSessionTemplate(@Autowired SqlSessionFactory sqlSessionFactory) throws Exception {
		// 默认数据源
		SqlSessionTemplate template = new SqlSessionTemplate(sqlSessionFactory);
		return template;
	}

}
