package com.app.OpenHack.Service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.OpenHack.GlobalConst;
import com.app.OpenHack.entity.OrgJoinRequest;
import com.app.OpenHack.entity.Organization;
import com.app.OpenHack.entity.User;
import com.app.OpenHack.repository.OrganizationRepository;
import com.app.OpenHack.repository.OrganizationRequestRepository;
import com.app.OpenHack.repository.UserRepository;
import com.app.OpenHack.util.SendEmail;

@Service
@Transactional
public class OrganizationService {
	@Autowired
	OrganizationRepository organizationRepository;
	
	@Autowired
	OrganizationRequestRepository organizationRequestRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	SendEmail sendEmail;
	
	public void createOrganization(Organization org) {
		organizationRepository.save(org);
	}
	
	public Organization getOrganization(Long id) {
		return organizationRepository.findById(id).orElse(null);
	}
	
	public void requestToJoin(Long orgId, User u) {
		OrgJoinRequest req = new OrgJoinRequest();
		organizationRequestRepository.deleteByUserId(u.getUuid());
		Organization org = organizationRepository.findById(orgId).get();
		String randomId = UUID.randomUUID().toString();
		
		req.setOrgId(orgId);
		req.setToken(randomId);
		req.setUserId(u.getUuid());
		organizationRequestRepository.save(req);
		sendEmail.sendEmail(org.getOrgOwner().getEmail(), "Request to join organization - " + org.getOrgName(), GlobalConst.url+"organization/join?token="+randomId);
	}
	
	public void joinOrganization(String token) {
		OrgJoinRequest req = organizationRequestRepository.findByToken(token);
		User u = userRepository.findById(req.getUserId()).get();
		Organization org = organizationRepository.findById(req.getOrgId()).get();
		u.setOrganization(org);
		userRepository.save(u);
		organizationRequestRepository.deleteById(req.getId());
	}
	
	public List<Organization> getAllOrganization(){
		return organizationRepository.findAll();
	}
}