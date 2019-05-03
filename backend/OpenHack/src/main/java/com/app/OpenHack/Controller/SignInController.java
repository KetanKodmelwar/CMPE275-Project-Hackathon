package com.app.OpenHack.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.firebase.FirebaseApp;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import com.google.firebase.auth.UserRecord;

@RestController
public class SignInController {

	@Autowired
	FirebaseApp firebaseApp;
	
	public String signIn(@RequestParam String email, @RequestParam String password) {
		
		
		return "";
	}
	
	@GetMapping("/verify")
	public String verifyToken(@RequestParam String token) {
		System.out.println("in");
		try {
			FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(token);
			String uid = decodedToken.getUid();
			UserRecord userRecord = FirebaseAuth.getInstance().getUser(uid);
			System.out.println(uid);
			System.out.println(userRecord.getDisplayName() + " name");
			System.out.println(userRecord.getEmail() + " email");
			System.out.println(userRecord.isEmailVerified()+ "  isEmailVarified");
		}catch(Exception e) {e.printStackTrace();}
		return "";
	}
}
