package com.front.conf;

import java.util.Iterator;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.properties.ConfigurationProperties;

import com.front.common.StringUtils;

@ConfigurationProperties(prefix = "jdbc")
public class JdbcConfig {
	private static final Logger logger = LoggerFactory.getLogger(JdbcConfig.class);

	private Global global;

	private List<SubJdbcConfig> jdbcConfigInfos;

	private SubJdbcConfig defaultJdbcConfig;

	/**
	 * 
	 * @return
	 */
	public SubJdbcConfig getDefaultSubJdbcConfig() {
		SubJdbcConfig config = null;
		String ds = global.getDefaultDatasource();
		if (!StringUtils.isBlank(ds)) {
			Iterator<SubJdbcConfig> iter = this.jdbcConfigInfos.iterator();
			while (iter.hasNext()) {
				config = iter.next();
				if (StringUtils.equalsIgnoreCase(config.getName(), ds)) {
					defaultJdbcConfig = config;
					iter.remove();
					break;
				}
			}
		}
		if (defaultJdbcConfig == null)
			logger.error("not found defaultDataSource!");
		return defaultJdbcConfig;
	}

	public Global getGlobal() {
		return global;
	}

	public void setGlobal(Global global) {
		this.global = global;
	}

	public void setJdbcConfigInfos(List<SubJdbcConfig> jdbcConfigInfos) {
		this.jdbcConfigInfos = jdbcConfigInfos;
	}

	public List<SubJdbcConfig> getJdbcConfigInfos() {
		return jdbcConfigInfos;
	}

}
