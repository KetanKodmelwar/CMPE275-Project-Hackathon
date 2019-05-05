package com.app.OpenHack.entity;

import java.util.Date;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

@Entity
public class Hackathon {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	@Column
	private String eventName;
	@Temporal(TemporalType.TIMESTAMP)
	private Date startDate;
	@Temporal(TemporalType.TIMESTAMP)
	private Date endDate;
	@Column
	private String description;
	@Column
	private long fees;
	
	@ManyToMany
	private Set<User> judges;
	
	@Column
	private int minTeamSize;
	
	@Column
	private int maxTeamSize;
	
	@Transient
	private Set<Organization> sponsors;
	
	@ManyToOne
	@JoinColumn(name="creator_id")
	private User user;

	@OneToMany(mappedBy="hackathon")
	private Set<Team> teams;
	
	@Column
	private boolean isOpen;
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getEventName() {
		return eventName;
	}

	public void setEventName(String eventName) {
		this.eventName = eventName;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public long getFees() {
		return fees;
	}

	public void setFees(long fees) {
		this.fees = fees;
	}

	public Set<User> getJudges() {
		return judges;
	}

	public void setJudges(Set<User> judges) {
		this.judges = judges;
	}

	public int getMinTeamSize() {
		return minTeamSize;
	}

	public void setMinTeamSize(int minTeamSize) {
		this.minTeamSize = minTeamSize;
	}

	public int getMaxTeamSize() {
		return maxTeamSize;
	}

	public void setMaxTeamSize(int maxTeamSize) {
		this.maxTeamSize = maxTeamSize;
	}

	public Set<Organization> getSponsors() {
		return sponsors;
	}

	public void setSponsors(Set<Organization> sponsors) {
		this.sponsors = sponsors;
	}

	public Set<Team> getTeams() {
		return teams;
	}

	public void setTeams(Set<Team> teams) {
		this.teams = teams;
	}

	public boolean isOpen() {
		return isOpen;
	}

	public void setOpen(boolean isOpen) {
		this.isOpen = isOpen;
	}
	
}
