package com.app.OpenHack.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.app.OpenHack.Service.HackathonService;
import com.app.OpenHack.entity.ErrorMessage;
import com.app.OpenHack.entity.Hackathon;
import com.app.OpenHack.entity.HackathonResult;
import com.app.OpenHack.entity.User;

@RestController
public class HackathonController {
	
	@Autowired
	HackathonService hackathonService;
	
	@GetMapping("/hackathon/{id}")
	public Hackathon getHackathon(@PathVariable Long id) {
		return hackathonService.getHackathon(id);
	}
	
//	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("/hackathon")
	@ResponseStatus(value = HttpStatus.CREATED)
	public ResponseEntity<?> createHackathon(@RequestBody Hackathon hackathon,Authentication authentication) {
		try {
			User user = (User)authentication.getPrincipal();
			hackathonService.createHackathon(hackathon,user);
			return new ResponseEntity<>(HttpStatus.CREATED);
		}
		catch(Exception e)
		{
			return new ResponseEntity<>(new ErrorMessage("Hackathon name exists"),HttpStatus.BAD_REQUEST);
			
		}
	}
	
//	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping("/hackathon/start/{id}")
	@ResponseStatus(value = HttpStatus.OK)
	public Hackathon startHackathon(@PathVariable Long id) {
		return hackathonService.startHackathon(id);
	}
	
//	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping("/hackathon/end/{id}")
	@ResponseStatus(value = HttpStatus.OK)
	public Hackathon endHackathon(@PathVariable Long id) {
		return hackathonService.endHackathon(id);
	}
	
	@GetMapping("/hackathon/all")
	public List<Hackathon> getAllHackathons(Authentication authentication){
		User loggedInUser = (User)authentication.getPrincipal();
		return hackathonService.getAllHackathons(loggedInUser);
	}
	
	@GetMapping("/hackathon")
	public List<Hackathon> getMyHackathons(Authentication authentication) {
		User user = (User)authentication.getPrincipal();
		return hackathonService.getMyHackathons(user);
	}
	
	@GetMapping("/hackathon/pending")
	public List<Hackathon> getPendingHackathons(Authentication authentication) {
		User user = (User)authentication.getPrincipal();
		return hackathonService.getPendingHackathons(user);
	}
	
	@GetMapping("/hackathon/created")
	public List<Hackathon> getCreatedHackathons(Authentication authentication) {
		User user = (User)authentication.getPrincipal();
		return hackathonService.getCreatedHackathons(user);
	}
	
	@GetMapping("/hackathon/judging")
	public List<Hackathon> getjudgeHackathons(Authentication authentication) {
		User user = (User)authentication.getPrincipal();
		return hackathonService.getjudgeHackathons(user);
	}
	
	@GetMapping("/hackathon/result")
	public List<HackathonResult> getAllResults(){
		return hackathonService.getAllResults();
	}
}
