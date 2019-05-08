package com.app.OpenHack.Controller.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.OpenHack.entity.TeamJoinRequest;

@Repository
public interface TeamJoinRequestRepository extends JpaRepository<TeamJoinRequest, Long>{
	@Transactional
	public void deleteByUserId(String userId);
	public TeamJoinRequest findByToken(String token);
}
