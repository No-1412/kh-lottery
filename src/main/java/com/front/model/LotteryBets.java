package com.front.model;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class LotteryBets {
	
    private Integer id;

    private String betsOrder;

    private String betsNo;

    private String uid;

    private String uname;

    private String playName;
    
    private Integer lotteryId;

    private String lotteryType;

	private Integer lotteryPlaygroupid;

    private Integer lotteryPlayid;

    private String lotteryNo;

    private Integer betsNum;

    private String betsData;

    private String betsWeishu;

    private Double betsFandian;

    private Double betsMode;

    private Integer betsBeishu;

    private Double betsAmount;

    private Integer betsZhuihao;

    private Integer betsZhuihaomode;

    private Double betsBonusprop;

    private String betsLotteryno;

    private Date betsKjtime;

    private Integer betsIsdelete;
    
    private Date betsDeleteTime;
    
    private String betsDeleteAddr;

    private Integer betsZjcount;

    private Double betsBonus;

    private Date betsTime;

    private String betsAddr;
    
    private String betsSrcorder;
    
    private String betsIdentification;//投注的唯一标识
    
    private String betsSrcIdent;//主单号的唯一标识
    
    private String checkSum;
    
    private Map<String,Object>attr  = null;
    
    public void setCheckSum(String checkSum) {
		this.checkSum = checkSum;
	}
    
    public String getCheckSum() {
		return checkSum;
	}
     
    public Date getBetsDeleteTime() {
		return betsDeleteTime;
	}

	public void setBetsDeleteTime(Date betsDeleteTime) {
		this.betsDeleteTime = betsDeleteTime;
	}

	public String getBetsDeleteAddr() {
		return betsDeleteAddr;
	}

	public void setBetsDeleteAddr(String betsDeleteAddr) {
		this.betsDeleteAddr = betsDeleteAddr;
	}

	public LotteryBets()
    {
    	 attr = new HashMap<String, Object>();
    }
    
    public void setBetsIdentification(String betsIdentification) {
		this.betsIdentification = betsIdentification;
	}
    
    public void setBetsSrcIdent(String betsSrcIdent) {
		this.betsSrcIdent = betsSrcIdent;
	}
    
    public String getBetsSrcIdent() {
		return betsSrcIdent;
	}
    
    public String getBetsIdentification() {
		return betsIdentification;
	}
    
    
    public void addBetCheckAttr(Map<String,Object>attr)
    {
    	this.attr.putAll(attr);
    }
    public String getBetsWeishu() {
		return betsWeishu;
	}


	public void setBetsWeishu(String betsWeishu) {
		this.betsWeishu = betsWeishu;
	}

    
    public Object getBetCheckAttr(String attrName,Object defaultValue)
    {
    	 if(this.attr.containsKey(attrName))
    	 {
    		 return this.attr.get(attrName);
    	 }
    	 return defaultValue;
    }
    
    public void setPlayName(String playName) {
		this.playName = playName;
	}
    
    public String getPlayName() {
		return playName;
	}

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getBetsOrder() {
        return betsOrder;
    }

    public void setBetsOrder(String betsOrder) {
        this.betsOrder = betsOrder == null ? null : betsOrder.trim();
    }

    public String getBetsNo() {
        return betsNo;
    }

    public void setBetsNo(String betsNo) {
        this.betsNo = betsNo == null ? null : betsNo.trim();
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getUname() {
        return uname;
    }

    public void setUname(String uname) {
        this.uname = uname == null ? null : uname.trim();
    }

    public Integer getLotteryId() {
        return lotteryId;
    }

    public void setLotteryId(Integer lotteryId) {
        this.lotteryId = lotteryId;
    }

    public String getLotteryType() {
        return lotteryType;
    }

    public void setLotteryType(String lotteryType) {
        this.lotteryType = lotteryType == null ? null : lotteryType.trim();
    }

    public Integer getLotteryPlaygroupid() {
        return lotteryPlaygroupid;
    }

    public void setLotteryPlaygroupid(Integer lotteryPlaygroupid) {
        this.lotteryPlaygroupid = lotteryPlaygroupid;
    }

    public Integer getLotteryPlayid() {
        return lotteryPlayid;
    }

    public void setLotteryPlayid(Integer lotteryPlayid) {
        this.lotteryPlayid = lotteryPlayid;
    }

    public String getLotteryNo() {
        return lotteryNo;
    }

    public void setLotteryNo(String lotteryNo) {
        this.lotteryNo = lotteryNo;
    }

    public Integer getBetsNum() {
        return betsNum;
    }

    public void setBetsNum(Integer betsNum) {
        this.betsNum = betsNum;
    }

    public String getBetsData() {
        return betsData;
    }

    public void setBetsData(String betsData) {
        this.betsData = betsData == null ? null : betsData.trim();
    }

    public Double getBetsFandian() {
        return betsFandian;
    }

    public void setBetsFandian(Double betsFandian) {
        this.betsFandian = betsFandian;
    }

    public Double getBetsMode() {
        return betsMode;
    }

    public void setBetsMode(Double betsMode) {
        this.betsMode = betsMode;
    }

    public Integer getBetsBeishu() {
        return betsBeishu;
    }

    public void setBetsBeishu(Integer betsBeishu) {
        this.betsBeishu = betsBeishu;
    }

    public Double getBetsAmount() {
        return betsAmount;
    }

    public void setBetsAmount(Double betsAmount) {
        this.betsAmount = betsAmount;
    }

    public Integer getBetsZhuihao() {
        return betsZhuihao;
    }

    public void setBetsZhuihao(Integer betsZhuihao) {
        this.betsZhuihao = betsZhuihao;
    }

    public Integer getBetsZhuihaomode() {
        return betsZhuihaomode;
    }

    public void setBetsZhuihaomode(Integer betsZhuihaomode) {
        this.betsZhuihaomode = betsZhuihaomode;
    }

    public Double getBetsBonusprop() {
        return betsBonusprop;
    }

    public void setBetsBonusprop(Double betsBonusprop) {
        this.betsBonusprop = betsBonusprop;
    }

    public String getBetsLotteryno() {
        return betsLotteryno;
    }

    public void setBetsLotteryno(String betsLotteryno) {
        this.betsLotteryno = betsLotteryno == null ? null : betsLotteryno.trim();
    }

    public Date getBetsKjtime() {
        return betsKjtime;
    }

    public void setBetsKjtime(Date betsKjtime) {
        this.betsKjtime = betsKjtime;
    }

    public Integer getBetsIsdelete() {
        return betsIsdelete;
    }

    public void setBetsIsdelete(Integer betsIsdelete) {
        this.betsIsdelete = betsIsdelete;
    }

    public Integer getBetsZjcount() {
        return betsZjcount;
    }

    public void setBetsZjcount(Integer betsZjcount) {
        this.betsZjcount = betsZjcount;
    }

    public Double getBetsBonus() {
        return betsBonus;
    }

    public void setBetsBonus(Double betsBonus) {
        this.betsBonus = betsBonus;
    }

    public Date getBetsTime() {
        return betsTime;
    }

    public void setBetsTime(Date betsTime) {
        this.betsTime = betsTime;
    }

    public String getBetsAddr() {
        return betsAddr;
    }

    public void setBetsAddr(String betsAddr) {
        this.betsAddr = betsAddr == null ? null : betsAddr.trim();
    }

	public String getBetsSrcorder() {
		return betsSrcorder;
	}

	public void setBetsSrcorder(String betsSrcorder) {
		this.betsSrcorder = betsSrcorder;
	}
}