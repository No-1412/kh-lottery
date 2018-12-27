package com.front.exception;

/**
 * 自定义异常类
 * MyAMException.java
 * <p>Copyright: Copyright (c) 2015 <p> 
 * <p>Company: xinghuo</p>
 *  @author    SeanXiao
 *  @version   1.0
 */
public class FrontException extends Exception
{

    /** 注释内容 */
    private static final long serialVersionUID = -2415907531368633507L;

    /** 错误编号 */
    private String errorCode;

    /**
     * <默认构造函数>
     */
    public FrontException()
    {
        super();
    }

    /**
     *  传入异常构造异常
     *  @param cause 异常
     */
    public FrontException(Throwable cause)
    {
        super(cause);
    }

    /**
     * 传入错误编号和消息信息构造异常
     * @param errorCode 异常代码
     * @param message 异常提示信息
     */
    public FrontException(String errorCode)
    {
        super();
        this.errorCode = errorCode;
    }

    /**
     * 传入错误编号和消息信息构造异常
     * @param errorCode 异常代码
     * @param message 异常提示信息
     */
    public FrontException(String errorCode, String message)
    {
        super(message);
        this.errorCode = errorCode;
    }

    /**
     * 传入错误编号和异常内容构造异常
     * @param errorCode 错误代码
     * @param cause 异常
     */
    public FrontException(String errorCode, Throwable cause)
    {
        super(cause);
        this.errorCode = errorCode;
    }

    /**
     * 传入错误编号,消息信息和异常内容构造异常
     * @param errorCode 异常错误代码
     * @param message 异常提示信息
     * @param cause 异常本身
     */
    public FrontException(String errorCode, String message, Throwable cause)
    {
        super(message, cause);
        this.errorCode = errorCode;
    }

    public String getErrorCode()
    {
        return errorCode;
    }

    public void setErrorCode(String errorCode)
    {
        this.errorCode = errorCode;
    }

}
