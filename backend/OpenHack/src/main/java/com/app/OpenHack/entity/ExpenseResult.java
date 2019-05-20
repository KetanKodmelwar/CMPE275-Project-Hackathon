package com.app.OpenHack.entity;

import java.util.Set;

public class ExpenseResult {

	private long hid;
	private String name;
	private int totalTeamCount;
	private Float paidAmount;
	private Float unpaidAmount;
	private Float profit;
	
	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getTotalTeamCount() {
		return totalTeamCount;
	}
	public void setTotalTeamCount(int totalTeamCount) {
		this.totalTeamCount = totalTeamCount;
	}
	public Float getPaidAmount() {
		return paidAmount;
	}
	public void setPaidAmount(Float paidAmount) {
		this.paidAmount = paidAmount;
	}
	public Float getUnpaidAmount() {
		return unpaidAmount;
	}
	public void setUnpaidAmount(Float unpaidAmount) {
		this.unpaidAmount = unpaidAmount;
	}
	public Float getProfit() {
		return profit;
	}
	public void setProfit(Float profit) {
		this.profit = profit;
	}
	
}
