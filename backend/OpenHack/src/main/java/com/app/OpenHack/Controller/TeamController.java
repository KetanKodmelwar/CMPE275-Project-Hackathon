package com.app.OpenHack.Controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.app.OpenHack.Controller.repository.HackathonRepository;
import com.app.OpenHack.Controller.repository.TeamRepository;
import com.app.OpenHack.Controller.repository.UserRepository;
import com.app.OpenHack.entity.Hackathon;
import com.app.OpenHack.entity.Team;
import com.app.OpenHack.entity.TeamMember;
import com.app.OpenHack.entity.User;

public class TeamController {

	@Autowired
	TeamRepository teamRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	HackathonRepository hackathonRepository;
	
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
		teamMember.setJoined(false);
		teamMember.setMember(u);
		teamMember.setPaid(false);
		teamMember.setTeam(team);
		teamMember.setRole(role);
		team.getMembers().add(teamMember);
		teamRepository.save(team);
	}
	
}
