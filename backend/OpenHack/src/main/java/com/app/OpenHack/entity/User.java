package com.app.OpenHack.entity;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.Email;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
public class User implements UserDetails{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	private String uuid;
	
	@Column(unique=true)
	private String screenName;
	
	@Column
	private String name;
	@Column
	@Email
	private String email;
	@Column
	private String bussinessTitle;
	@ManyToOne
	private Organization organization;
	@Column
	private String photoUrl;
	@Column
	private String aboutMe;
	@Column
	private String address;
	
	public String getUuid() {
		return uuid;
	}
	public void setUuid(String uuid) {
		this.uuid = uuid;
	}
	public String getScreenName() {
		return screenName;
	}
	public void setScreenName(String screenName) {
		this.screenName = screenName;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getBussinessTitle() {
		return bussinessTitle;
	}
	public void setBussinessTitle(String bussinessTitle) {
		this.bussinessTitle = bussinessTitle;
	}
	public Organization getOrganization() {
		return organization;
	}
	public void setOrganization(Organization organization) {
		this.organization = organization;
	}
	public String getPhotoUrl() {
		return photoUrl;
	}
	public void setPhotoUrl(String photoUrl) {
		this.photoUrl = photoUrl;
	}
	public String getAboutMe() {
		return aboutMe;
	}
	public void setAboutMe(String aboutMe) {
		this.aboutMe = aboutMe;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		Set<GrantedAuthority> setAuths = new HashSet<GrantedAuthority>();
		if(email.endsWith("@sjsu.edu"))
			setAuths.add(new SimpleGrantedAuthority("ADMIN"));
		else
			setAuths.add(new SimpleGrantedAuthority("USER"));
		return setAuths;
	}
	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return "temp";
	}
	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return screenName;
	}
	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}
	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}
	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}
	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}	
}
