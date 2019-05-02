package com.OpenHack.OpenHack.entity;

import javax.persistence.*;


@Entity
@Table(name="user")
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@Column
	private String name;
	
	@Column(unique=true)
	private String email;
	
	@Column
	private String title;
	
	public User(String name, String email, String title) {
		super();
		this.name = name;
		this.email = email;
		this.title = title;
	}
	
	/**
	 * @return
	 */
	public long getId() {
		return id;
	}
	/**
	 * @param id
	 */
	public void setId(long id) {
		this.id = id;
	}
	/**
	 * @return
	 */
	public String getName() {
		return name;
	}
	/**
	 * @param name
	 */
	public void setName(String name) {
		this.name = name;
	}
	/**
	 * @return
	 */
	/**
	 * @return
	 */
	public String getEmail() {
		return email;
	}
	/**
	 * @param email
	 */
	public void setEmail(String email) {
		this.email = email;
	}
	/**
	 * @return
	 */
	public String getTitle() {
		return title;
	}
	/**
	 * @param title
	 */
	public void setTitle(String title) {
		this.title = title;
	}
	
	

}
