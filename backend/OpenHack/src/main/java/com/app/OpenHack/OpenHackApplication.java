package com.app.OpenHack;

import java.io.FileInputStream;
import java.io.IOException;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.ClassPathResource;
import org.springframework.scheduling.annotation.EnableAsync;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

@SpringBootApplication
@EnableAsync
public class OpenHackApplication {

	public static void main(String[] args) {
		SpringApplication.run(OpenHackApplication.class, args);
	}

	@Bean
	public FirebaseApp getFireBaseApp() {
		try {
			FileInputStream refreshToken = new FileInputStream(new ClassPathResource(
				      "openhack-403f7-firebase-adminsdk-o1ab9-8d4ece50de.json").getFile());
	
			FirebaseOptions options;
		
			options = new FirebaseOptions.Builder()
			    .setCredentials(GoogleCredentials.fromStream(refreshToken))
			    .setServiceAccountId("firebase-adminsdk-o1ab9@openhack-403f7.iam.gserviceaccount.com")
			    .build();
			return FirebaseApp.initializeApp(options);
		} catch (IOException e) {
			e.printStackTrace();
		}

		return null;
	}
}
