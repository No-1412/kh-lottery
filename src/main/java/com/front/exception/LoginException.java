package com.front.exception;

/***
 * 
 * @author huang
 *
 */
public class LoginException extends FrontException{

	public LoginException(String msg)
	{
	       super(msg);	
	}
	
	/***
	 * 
	 * @return
	 */
	public static LoginException makeLoginException()
	{
		 return new LoginException("当前用户未登录。");
	}
}
