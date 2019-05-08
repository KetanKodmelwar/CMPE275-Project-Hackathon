package com.app.OpenHack.Controller;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.app.OpenHack.GlobalConst;
import com.app.OpenHack.Controller.repository.OrganizationRepository;
import com.app.OpenHack.Controller.repository.OrganizationRequestRepository;
import com.app.OpenHack.Controller.repository.UserRepository;
import com.app.OpenHack.entity.OrgJoinRequest;
import com.app.OpenHack.entity.Organization;
import com.app.OpenHack.entity.User;
import com.app.OpenHack.util.SendEmail;

@RestController
public class OrganizationController {

	@Autowired
	OrganizationRepository organizationRepository;
	
	@Autowired
	OrganizationRequestRepository organizationRequestRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@PostMapping("/organization")
	public void createOrganization(@RequestBody Organization org) {
		organizationRepository.save(org);
	}
	
	@GetMapping("/organization")
	public Organization getMyOrganization(Authentication auth) {
		User u = (User)auth.getPrincipal();
		return u.getOrganization();
	}
	
	@GetMapping("/organization/{id}")
	public Organization getOrganization(@PathVariable Long id) {
		return organizationRepository.findById(id).orElse(null);
	}
	
	@PostMapping("/organization/join/request")
	@ResponseStatus(HttpStatus.OK)
	public void requestToJoin(Map<String, Object> payload,Authentication auth) {
		User u = (User)auth.getPrincipal();
		OrgJoinRequest req = new OrgJoinRequest();
		organizationRequestRepository.deleteByUserId(u.getUuid());
		Organization org = organizationRepository.findById((Long)payload.get("orgId")).get();
		String randomId = UUID.randomUUID().toString();
		
		req.setOrgId((Long)payload.get("orgId"));
		req.setToken(randomId);
		req.setUserId(u.getUuid());
		organizationRequestRepository.save(req);
		SendEmail.sendEmail(org.getOrgOwner().getEmail(), "Request to join organization - " + org.getOrgName(), GlobalConst.url+"organization/join?token="+randomId);
		
	}
	
	@GetMapping("/organization/join")
	@ResponseStatus(HttpStatus.OK)
	public void joinOrganization(@RequestParam String token,HttpServletResponse httpServletResponse) {
		OrgJoinRequest req = organizationRequestRepository.findByToken(token);
		User u = userRepository.findById(req.getUserId()).get();
		Organization org = organizationRepository.findById(req.getOrgId()).get();
		u.setOrganization(org);
		userRepository.save(u);
		organizationRequestRepository.deleteById(req.getId());
		
		httpServletResponse.setHeader("Location", GlobalConst.UI_URL);
	    httpServletResponse.setStatus(302);
	}
	
	@GetMapping("/organization/all")
	@ResponseStatus(HttpStatus.OK)
	public List<Organization> getAllOrganization(){
		return organizationRepository.findAll();
	}
}
