package com.app.OpenHack.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.OpenHack.entity.User;
import com.app.OpenHack.repository.UserRepository;

@Service
@Transactional
public class UserService {

	@Autowired
	UserRepository userRepository;
	
	public void updateUser(User user, String uid) {
		User value = userRepository.findById(uid).get();
		if(user.getName()!=null)
			value.setName(user.getName());
		if(user.getAboutMe()!=null)
			value.setAboutMe(user.getAboutMe());
		if(user.getAddress()!=null)
			value.setAddress(user.getAddress());
		if(user.getBussinessTitle()!=null)
			value.setBussinessTitle(user.getBussinessTitle());
		if(user.getOrganization()!=null)
			value.setOrganization(user.getOrganization());
		if(user.getPhotoUrl()!=null)
			value.setPhotoUrl(user.getPhotoUrl());
		if(user.getScreenName()!=null)
			value.setScreenName(user.getScreenName());
		userRepository.save(value);
	}
	
	public List<User> getAllHackers(){
		return userRepository.findByEmailIgnoreCaseContaining("@sjsu.edu");
	}
	
	public void createUser(User user) {
		userRepository.save(user);
	}
	
	public void deleteUser(String uid) {
		userRepository.deleteById(uid);
	}
}
