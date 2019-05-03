package com.app.OpenHack.Controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.app.OpenHack.Controller.repository.UserRepository;
import com.app.OpenHack.entity.User;

@RestController
public class UserController {
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	UserService userService;
	
	@GetMapping("/echo")
	public Principal testUser(Authentication authentication) {
		System.out.println(authentication.getPrincipal());
		System.out.println(((User)authentication.getPrincipal()).getEmail());
		return authentication;
	}
	
	@PostMapping("/user")
	@ResponseStatus(value = HttpStatus.CREATED)
	public void createUser(@RequestBody User user) {
		userRepository.save(user);
	}
	
	@DeleteMapping("/user/{uid}")
	@ResponseStatus(value = HttpStatus.OK)
	public void deleteUser(@PathVariable String uid) {
		userRepository.deleteById(uid);
	}
	
	@PutMapping("/user")
	@ResponseStatus(value = HttpStatus.OK)
	public void updateUser(@RequestBody User user,Authentication authentication) {
		User loggedInUser = (User)authentication.getPrincipal();
		userService.updateUser(user, loggedInUser.getUuid());
	}
}