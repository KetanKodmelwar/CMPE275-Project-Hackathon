package com.app.OpenHack.Controller;

import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;

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
	
	@PostMapping("/hackathon/{hid}/register")
	@ResponseStatus(HttpStatus.OK)
	public void addTeam(@RequestBody Team team,@PathVariable Long hid) {
		Hackathon hackathon = hackathonRepository.findById(hid).get();
		hackathon.getTeams().add(team);
		hackathonRepository.save(hackathon);
	}
	
	@PostMapping("/team/invite")
	@ResponseStatus(HttpStatus.OK)
	public void inviteToTeam(Map<String, Object> payload) {
		Team team = teamRepository.findById((Long)payload.get("teamId")).get();
		User u = userRepository.findById((String)payload.get("uuid")).get();
		String role = (String)payload.get("role");
		TeamMember teamMember = new TeamMember();
		String randomId = UUID.randomUUID().toString();
		teamMember.setJoined(false);
		teamMember.setMember(u);
		teamMember.setPaid(false);
		teamMember.setTeam(team);
		teamMember.setRole(role);
		team.getMembers().add(teamMember);
		teamRepository.save(team);
		TeamJoinRequest teamJoinRequest = new TeamJoinRequest();
		teamJoinRequest.setTeamId(team.getId());
		teamJoinRequest.setUserId(u.getUuid());
		teamJoinRequest.setToken(randomId);
		teamJoinRequestRepository.save(teamJoinRequest);
		SendEmail.sendEmail(u.getEmail(), "Request to join team : "+team.getName(), GlobalConst.UI_URL+"team/payment?token="+randomId);
	}
	
	@GetMapping("/team/invite/accept")
	@ResponseStatus(HttpStatus.OK)
	public void acceptTeamInvite(@RequestParam String token,HttpServletResponse httpServletResponse) {
		TeamJoinRequest teamJoinRequest = teamJoinRequestRepository.findByToken(token);
		Team team = teamRepository.findById(teamJoinRequest.getTeamId()).get();
		
		for(TeamMember teamMember:team.getMembers()) {
			if(teamMember.getMember().getUuid().equals(teamJoinRequest.getUserId())) {
				teamMember.setJoined(true);
				teamMemberRepository.save(teamMember);
				break;
			}
		}
		httpServletResponse.setHeader("Location", GlobalConst.UI_URL);
	    httpServletResponse.setStatus(302);
	}
}