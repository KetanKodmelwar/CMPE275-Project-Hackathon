package com.app.OpenHack.Controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.app.OpenHack.Controller.repository.HackathonRepository;
import com.app.OpenHack.Controller.repository.TeamRepository;
import com.app.OpenHack.Controller.repository.UserRepository;
import com.app.OpenHack.entity.Hackathon;
import com.app.OpenHack.entity.TeamMember;
import com.app.OpenHack.entity.User;

@RestController
public class HackathonController {

	@Autowired
	HackathonRepository hackathonRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@GetMapping("/hackathon/{id}")
	public Hackathon getHackathon(@PathVariable Long id) {
		return hackathonRepository.findById(id).get();
	}
	
	@PostMapping("/hackathon")
	@ResponseStatus(value = HttpStatus.CREATED)
	public void createHackathon(@RequestBody Hackathon hackathon) {
		hackathon.setStartDate(new Date());
		System.out.println(hackathon.getEventName());
		hackathonRepository.save(hackathon);
	}
	
	@GetMapping("/hackathon/all")
	public List<Hackathon> getAllHackathons(){
		return hackathonRepository.findAll();
	}
	
	@GetMapping("/hackathon")
	public List<Hackathon> getMyHackathons(Authentication authentication) {
		User user = (User)authentication.getPrincipal();
		List<Hackathon> rval = new ArrayList<Hackathon>();
		for(TeamMember t:user.getTeams()) {
			rval.add(t.getTeam().getHackathon());
		}
		return rval;
	}
	
	
}
