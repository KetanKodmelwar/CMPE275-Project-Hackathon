package com.app.OpenHack.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.app.OpenHack.Controller.repository.HackathonRepository;
import com.app.OpenHack.entity.Hackathon;

@RestController
public class HackathonController {

	@Autowired
	HackathonRepository hackathonRepository;
	
	@GetMapping("/hackathon/{id}")
	public Hackathon getHackathon(@PathVariable Long id) {
		return hackathonRepository.findById(id).get();
	}
	
	@PostMapping("/hackathon")
	@ResponseStatus(value = HttpStatus.CREATED)
	public void createHackathon(@RequestBody Hackathon hackathon) {
		hackathonRepository.save(hackathon);
	}
	
	
}
