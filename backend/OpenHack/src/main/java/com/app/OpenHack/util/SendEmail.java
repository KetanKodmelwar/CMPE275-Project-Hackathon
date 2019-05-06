package com.app.OpenHack.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class SendEmail {

	@Autowired
	private JavaMailSender javaMailSender;
	
	
	public void sendEmail(String to,String subject,String body) {
		System.out.println("Sending email...");

	    SimpleMailMessage message = new SimpleMailMessage();
	    message.setTo(to);
	    message.setFrom("abc@gmail.com");
	    message.setSubject(subject);
	    message.setText(body);
	    javaMailSender.send(message);
	}
}
