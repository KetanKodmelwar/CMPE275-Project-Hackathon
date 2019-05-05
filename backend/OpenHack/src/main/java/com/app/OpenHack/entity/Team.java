package com.app.OpenHack.entity;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

@Entity
public class Team {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	@Column
	private String name;
	@OneToOne(fetch = FetchType.EAGER)
	private User lead;
	
	@Column
	private String submitionUrl;
	
	@Column
	private float grades;
	
	@ManyToOne(fetch = FetchType.EAGER)
	private Hackathon hackathon;

	@OneToMany(mappedBy="team")
	private Set<TeamMember> members;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public User getLead() {
		return lead;
	}

	public void setLead(User lead) {
		this.lead = lead;
	}

	public Hackathon getHackathon() {
		return hackathon;
	}

	public void setHackathon(Hackathon hackathon) {
		this.hackathon = hackathon;
	}

	public Set<TeamMember> getMembers() {
		return members;
	}

	public void setMembers(Set<TeamMember> members) {
		this.members = members;
	}

	public String getSubmitionUrl() {
		return submitionUrl;
	}

	public void setSubmitionUrl(String submitionUrl) {
		this.submitionUrl = submitionUrl;
	}
	
}
