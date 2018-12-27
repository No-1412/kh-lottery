package com.front.loader;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;

import org.springframework.web.servlet.DispatcherServlet;

import com.front.common.StringUtils;

import freemarker.cache.FileTemplateLoader;

/**
 * 
 * {@linkplain DispatcherServlet}
 * @author Administrator
 *
 */
public class FrontFileTemplateLoader extends FileTemplateLoader {

	public FrontFileTemplateLoader() throws IOException {
		super();
	}
	
    public long getLastModified(final Object templateSource) {
        return System.currentTimeMillis();
    }

	public Object findTemplateSource(final String name) throws IOException {
		return StringUtils.replace(name, "_zh_CN", "");
	}

	public Reader getReader(Object templateSource, String encoding) throws IOException {
		InputStream fis = FrontFileTemplateLoader.class.getClassLoader().getResourceAsStream((String) templateSource);
		return new InputStreamReader(fis, encoding);
	}
}
