package com.front.serializer;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
 
import org.nustaq.serialization.FSTConfiguration;
import org.nustaq.serialization.FSTObjectInput;
import org.nustaq.serialization.FSTObjectOutput;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
 

/**
 * 
 * @author Administrator
 *
 */
public class FstSerializer {

	private static final Logger logger = LoggerFactory.getLogger(FstSerializer.class);
	private static FSTConfiguration conf = FSTConfiguration.createDefaultConfiguration().setForceSerializable(false);

	private static FstSerializer instance = null;

	/**
	 * 
	 * @return
	 */
	public static FstSerializer getInstance() {
		if (instance == null) {
			synchronized (FstSerializer.class) {
				if (instance == null) {
					instance = new FstSerializer();
				}
			}
		}
		return instance;
	}

	private FstSerializer() {
	}

	/**
	 * 
	 * @param object
	 * @return
	 */
	public byte[] serialize(Object object) {
		ByteArrayOutputStream stream = new ByteArrayOutputStream();
		FSTObjectOutput out = this.conf.getObjectOutput(stream);
		try {
			out.writeObject(object);
			out.flush();
			stream.close();
		} catch (IOException e) {
			logger.error("serialize error", e);
		}
		return stream.toByteArray();
	}

	/**
	 * 
	 * @param arr
	 * @param cls
	 * @return
	 */
	public <T> T deserialize(byte[] arr, Class<?> cls) {
		T result = null;
		try {
			ByteArrayInputStream stream = new ByteArrayInputStream(arr);
			FSTObjectInput in = this.conf.getObjectInput(stream);
			result = (T) in.readObject();
			stream.close();
		} catch (Exception e) {
			logger.error("deserialize error", e);
		}
		return result;
	}


}
