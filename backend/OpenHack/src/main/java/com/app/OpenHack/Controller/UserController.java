package com.app.OpenHack.Controller;

import java.util.List;

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

import com.app.OpenHack.Service.UserService;
import com.app.OpenHack.entity.User;

@RestController
public class UserController {
	
	@Autowired
	UserService userService;
	
	@GetMapping("/user")
	public User testUser(Authentication authentication) {
		User u = (User)authentication.getPrincipal();
		return u;
	}
	
	@PostMapping("/user")
	@ResponseStatus(value = HttpStatus.CREATED)
	public void createUser(@RequestBody User user) {
		userService.createUser(user);
	}
	
	@DeleteMapping("/user/{uid}")
	@ResponseStatus(value = HttpStatus.OK)
	public void deleteUser(@PathVariable String uid) {
		userService.deleteUser(uid);
	}
	
	@PutMapping("/user")
	@ResponseStatus(value = HttpStatus.OK)
	public void updateUser(@RequestBody User user,Authentication authentication) {
		User loggedInUser = (User)authentication.getPrincipal();
		userService.updateUser(user, loggedInUser.getUuid());
	}
	
	@GetMapping("/user/hackers")
	public List<User> getAllHackers(){
		return userService.getAllHackers();
	}
}