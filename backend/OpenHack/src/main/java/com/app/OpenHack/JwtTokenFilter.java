package com.app.OpenHack;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.app.OpenHack.Controller.repository.UserRepository;
import com.app.OpenHack.entity.User;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import com.google.firebase.auth.UserRecord;

public class JwtTokenFilter extends OncePerRequestFilter{

	@Autowired
	private UserRepository userRepository;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String token = request.getHeader("Authorization").substring(7);
		try {
			FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(token);
			String uid = decodedToken.getUid();
			UserRecord userRecord = FirebaseAuth.getInstance().getUser(uid);
			System.out.println(uid);
			System.out.println(userRecord.getDisplayName() + " name");
			System.out.println(userRecord.getEmail() + " email");
			System.out.println(userRecord.isEmailVerified()+ "  isEmailVarified");
			User temp = new User();
			temp.setUuid(uid);
			temp.setEmail(userRecord.getEmail());
			temp.setScreenName("ABC");
			User user = temp;
			//User user = userRepository.findById(uid).get();
			Authentication auth = new UsernamePasswordAuthenticationToken(user, "", user.getAuthorities());
			SecurityContextHolder.getContext().setAuthentication(auth);
		}catch(Exception e) {e.printStackTrace();
			SecurityContextHolder.clearContext();
			response.sendError(401, e.getMessage());
			return;
		}
		filterChain.doFilter(request, response);
	}

}
