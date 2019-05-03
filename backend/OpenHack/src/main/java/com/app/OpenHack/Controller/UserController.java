package com.app.OpenHack.Controller;

import java.security.Principal;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
	
	@GetMapping("/test")
	public Principal testUser(Principal principal) {
		
		return principal;
	}
}
