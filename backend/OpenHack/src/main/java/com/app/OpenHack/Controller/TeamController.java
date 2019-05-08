package com.app.OpenHack.Controller;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.app.OpenHack.GlobalConst;
import com.app.OpenHack.Controller.repository.HackathonRepository;
import com.app.OpenHack.Controller.repository.TeamJoinRequestRepository;
import com.app.OpenHack.Controller.repository.TeamMemberRepository;
import com.app.OpenHack.Controller.repository.TeamRepository;
import com.app.OpenHack.Controller.repository.UserRepository;
import com.app.OpenHack.entity.Hackathon;
import com.app.OpenHack.entity.Team;
import com.app.OpenHack.entity.TeamJoinRequest;
import com.app.OpenHack.entity.TeamMember;
import com.app.OpenHack.entity.User;
import com.app.OpenHack.util.SendEmail;

@RestController
public class TeamController {

	@Autowired
	TeamRepository teamRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	HackathonRepository hackathonRepository;
	
	@Autowired
	TeamJoinRequestRepository teamJoinRequestRepository;
	
	@Autowired
	TeamMemberRepository teamMemberRepository;
	
	@PostMapping("/hackathon/register")
	@ResponseStatus(HttpStatus.OK)
	public Team addTeam(@RequestBody Map<String, Object> payload,Authentication authentication) {
		User user = (User)authentication.getPrincipal();
		Hackathon hackathon = hackathonRepository.findById(((Integer)payload.get("hackathonId")).longValue()).get();
		Team team = new Team();
		team.setHackathon(hackathon);
		team.setName((String)payload.get("teamName"));
		team = teamRepository.save(team);
		Map<String,Object> temp = new HashMap<String,Object>();
		temp.put("teamId", team.getId());
		temp.put("uuid", user.getUuid());
		temp.put("role", "Lead");
		inviteToTeam(temp);
		return team;
	}
	
	@PostMapping("/team/invite")
	@ResponseStatus(HttpStatus.OK)
	public void inviteToTeam(@RequestBody Map<String, Object> payload) {
		Team team = teamRepository.findById(Long.parseLong(payload.get("teamId").toString())).get();
		
		User u = userRepository.findById((String)payload.get("uuid")).get();
		teamJoinRequestRepository.deleteByUserId(u.getUuid());
		String role = (String)payload.get("role");
		
		String randomId = UUID.randomUUID().toString();
		
		teamRepository.save(team);
		TeamJoinRequest teamJoinRequest = new TeamJoinRequest();
		teamJoinRequest.setTeamId(team.getId());
		teamJoinRequest.setUserId(u.getUuid());
		teamJoinRequest.setRole(role);
		teamJoinRequest.setToken(randomId);
		teamJoinRequestRepository.save(teamJoinRequest);
		SendEmail.sendEmail(u.getEmail(), "Request to join team : "+team.getName(), GlobalConst.UI_URL+"team/payment?token="+randomId);
	}
	
	@GetMapping("/team/invite/accept")
	@ResponseStatus(HttpStatus.OK)
	public void acceptTeamInvite(@RequestParam String token,HttpServletResponse httpServletResponse) {
		TeamJoinRequest teamJoinRequest = teamJoinRequestRepository.findByToken(token);
		teamJoinRequestRepository.deleteById(teamJoinRequest.getId());
		Team team = teamRepository.findById(teamJoinRequest.getTeamId()).get();
		if(team.getMembers()==null)
			team.setMembers(new HashSet<TeamMember>());
		TeamMember teamMember = new TeamMember();
		teamMember.setJoined(true);
		teamMember.setPaid(true);
		teamMember.setRole(teamJoinRequest.getRole());
		teamMember.setTeam(team);
		teamMemberRepository.save(teamMember);
		User u = userRepository.findById(teamJoinRequest.getUserId()).get();
		SendEmail.sendEmail(u.getEmail(), "Payment Confirmation", "Your payment of "+team.getHackathon().getFees()+"$ received.");
		httpServletResponse.setHeader("Location", GlobalConst.UI_URL);
	    httpServletResponse.setStatus(302);
	}
	
	@PutMapping("/team/submit")
	@ResponseStatus(value = HttpStatus.OK)
	public Team submitHackathon(@RequestBody Map<String, Object> payload) {
		Team team = teamRepository.findById(((Integer)payload.get("teamId")).longValue()).get();
		team.setSubmitionUrl((String)payload.get("submitionUrl"));
		teamRepository.save(team);
		return team;
	}
	
	@PutMapping("/team/grade")
	@ResponseStatus(value = HttpStatus.OK)
	public void gradeTeam(@RequestBody Map<String, Object> payload) {
		Team team = teamRepository.findById(Long.parseLong(payload.get("teamId").toString())).get();
		team.setGrades(Long.parseLong(payload.get("grades").toString()));
		teamRepository.save(team);
	}
}