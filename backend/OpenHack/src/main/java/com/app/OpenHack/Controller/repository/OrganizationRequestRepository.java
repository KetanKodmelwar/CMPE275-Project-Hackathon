package com.app.OpenHack.Controller.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.OpenHack.entity.OrgJoinRequest;

public interface OrganizationRequestRepository extends JpaRepository<OrgJoinRequest, Long>{

	public void deleteByUserId(String userId);
	public OrgJoinRequest findByToken(String token);
}
