package com.front.common;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;
   
/**
 * 返回客户端信息工具类
 * ClientInfo.java
 * <p>Copyright: Copyright (c) 2015 <p> 
 * <p>Company: xinghuo</p>
 *  @author    SeanXiao
 *  @version   1.0
 */
public class ClientInfo
{

    private String info = "";
    private String explorerVer = "未知";
    private String OSVer = "未知";
    
    private HttpServletRequest request = null;

    /**  
     * 构造函数  
     * 参数：String request.getHeader("user-agent")  
     *   
     * IE7:Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.1; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C)  
     * IE8:Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C)  
     * Maxthon:Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.1; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; Maxthon 2.0)  
     * firefox:Mozilla/5.0 (Windows; U; Windows NT 6.1; zh-CN; rv:1.9.2.11) Gecko/20101012 Firefox/3.6.11  
     * Chrome:Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/534.7 (KHTML, like Gecko) Chrome/7.0.517.44 Safari/534.7  
     * Opera:Opera/9.80 (Windows NT 6.1; U; zh-cn) Presto/2.6.30 Version/10.63  
     *   
     * 操作系统：  
     * Win7 : Windows NT 6.1  
     * WinXP : Windows NT 5.1  
     */
    public ClientInfo(HttpServletRequest request)
    {
        this.request = request;
        this.info = request.getHeader("User-Agent");
    }

    /**  
     * 获取核心浏览器名称  
     */
    public String getExplorerName()
    {
        String str = "未知";
        Pattern pattern = Pattern.compile("");
        Matcher matcher;
        if (info.indexOf("MSIE") != -1)
        {
            // 微软IE
            str = "MSIE"; 
            pattern = Pattern.compile(str + "\\s([0-9.]+)");
        }
        else if (info.indexOf("Firefox") != -1)
        {
            // 火狐
            str = "Firefox"; 
            pattern = Pattern.compile(str + "\\/([0-9.]+)");
        }
        else if (info.indexOf("Chrome") != -1)
        {
            // Google
            str = "Chrome"; 
            pattern = Pattern.compile(str + "\\/([0-9.]+)");
        }
        else if (info.indexOf("Opera") != -1)
        {
            // Opera
            str = "Opera"; 
            pattern = Pattern.compile("Version\\/([0-9.]+)");
        }else if(info.indexOf("Trident")!=-1)
        {
        	return "MSIE-Trident";
        }
        else
        {
        	 return "未知";
        }
        
        matcher = pattern.matcher(info);
        if (matcher.find())
        {
            explorerVer = matcher.group(1);
        }
        
        return str;
    }

    /**  
     * 获取核心浏览器版本  
     */
    public String getExplorerVer()
    {
        return this.explorerVer;
    }

    /**  
     * 获取浏览器插件名称（例如：遨游、世界之窗等）  
     */
    public String getExplorerPlug()
    {
        String str = "无";
        if (info.indexOf("Maxthon") != -1)
            str = "Maxthon"; // 遨游
        return str;
    }

    /**  
     * 获取操作系统名称  
     */
    public String getOSName()
    {
        String str = "未知";
        Pattern pattern = Pattern.compile("");
        Matcher matcher;
        if (info.indexOf("Windows") != -1)
        {
            //Windows NT 6.1
            str = "Windows";
            pattern = Pattern.compile(str + "\\s([a-zA-Z0-9]+\\s[0-9.]+)");
        }
        if(StringUtils.equals(str, "未知"))
        {
        	return str;
        }
        matcher = pattern.matcher(info);
        if (matcher.find())
            OSVer = matcher.group(1);
        return str;
    }

    /**  
     * 获取操作系统版本  
     */
    public String getOSVer()
    {
        return this.OSVer;
    }
    
    /***
     * 获取ip地址信息
     * @param request
     * @return
     */
    public String getIpAddr() {  
        String ip = this.request.getHeader("x-forwarded-for");  
        if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
            ip = this.request.getHeader("Proxy-Client-IP");  
        }  
        if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
            ip = this.request.getHeader("WL-Proxy-Client-IP");  
        }  
        if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
            ip = this.request.getRemoteAddr();  
        }  
        return ip;  
    }
}