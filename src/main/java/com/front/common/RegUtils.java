package com.front.common;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/***
 * 
 * @author Administrator
 *
 */
public class RegUtils
{
	
	/***
	 * 
	 * @param regEx
	 * @param targetStr
	 * @param callback
	 * @return
	 */
  public static String findAndReplace(String regEx, String targetStr, FindCallback callback)
  {
    Pattern p = Pattern.compile(regEx);
    Matcher m = p.matcher(targetStr);
    StringBuffer buf = new StringBuffer();
    while (m.find())
    {
      String newStr = callback.execute(m.group());
      m.appendReplacement(buf, newStr);
    }
    m.appendTail(buf);
    return buf.toString();
  }
  
  /***
   * 
   * @param source
   * @return
   */
  public static String tranProperty(String source)
  {
    String reg = "\\_[a-zA-Z\\.0-9\\_\\-\\?\\*\\/\\(\\)]";
    source = StringUtils.lowerCase(source);
    source = findAndReplace(reg, source, new FindCallback()
    {
      public String execute(String source)
      {
        source = StringUtils.replace(source, "_", "");
        System.out.println(source);
        return StringUtils.upperCase(source);
      }
    });
    return source;
  }
  
  
  /***
   * 
   * @author huang
   *
   */
  public static abstract interface FindCallback
  {
    public abstract String execute(String paramString);
  }
}
