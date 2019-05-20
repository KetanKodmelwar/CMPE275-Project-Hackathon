package com.app.OpenHack.entity;


public class EarningResult {

	private long hid;
	private String name;
	private int totalTeamCount;
	private long paidAmount;
	private double unpaidAmount;
	private long revenueAmount;
	private long expense;
	private double profit;
	
	public long getExpense() {
		return expense;
	}
	public void setExpense(long expense) {
		this.expense = expense;
	}
	public long getRevenueAmount() {
		return revenueAmount;
	}
	public void setRevenueAmount(long revenueAmount) {
		this.revenueAmount = revenueAmount;
	}
	
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
	public long getPaidAmount() {
		return paidAmount;
	}
	public void setPaidAmount(long l) {
		this.paidAmount = l;
	}
	public double getUnpaidAmount() {
		return unpaidAmount;
	}
	public void setUnpaidAmount(double d) {
		this.unpaidAmount = d;
	}
	public double getProfit() {
		return profit;
	}
	public void setProfit(double l) {
		this.profit = l;
	}
	
}
