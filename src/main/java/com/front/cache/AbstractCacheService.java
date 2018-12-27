package com.front.cache;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public abstract class AbstractCacheService implements FrontCacheService {

	public Logger logger = LoggerFactory.getLogger(this.getClass());

	public String getName() {
		return this.getClass().getName();
	}

}
