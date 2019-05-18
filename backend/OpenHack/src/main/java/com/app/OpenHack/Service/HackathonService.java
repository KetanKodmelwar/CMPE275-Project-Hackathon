package com.app.OpenHack.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.OpenHack.entity.Hackathon;
import com.app.OpenHack.entity.HackathonResult;
import com.app.OpenHack.entity.Team;
import com.app.OpenHack.entity.TeamMember;
import com.app.OpenHack.entity.User;
import com.app.OpenHack.repository.HackathonRepository;
import com.app.OpenHack.repository.TeamRepository;
import com.app.OpenHack.repository.UserRepository;

@Service
@Transactional
public class HackathonService {

	@Autowired
	HackathonRepository hackathonRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	TeamRepository teamRepository;
	
	public Hackathon getHackathon(Long id) {
		return hackathonRepository.findById(id).get();
	}
	
	public void createHackathon(Hackathon hackathon,User user) {
		hackathon.setUser(user);
		hackathonRepository.save(hackathon);
	}
	
	public Hackathon startHackathon(Long id) {
		Hackathon hackathon = hackathonRepository.findById(id).get();
		hackathon.setStartDate(new Date());
		hackathonRepository.save(hackathon);
		return hackathon;
	}
	
	public Hackathon endHackathon(Long id) {
		Hackathon hackathon = hackathonRepository.findById(id).get();
		hackathon.setEndDate(new Date());
		hackathonRepository.save(hackathon);
		return hackathon;
	}
	
	public List<Hackathon> getAllHackathons(){
		return hackathonRepository.findAll();
	}
	
	public List<Hackathon> getMyHackathons(User user) {
		List<Hackathon> rval = new ArrayList<Hackathon>();
		user = userRepository.findById(user.getUuid()).get();
		for(TeamMember t:user.getTeams()) {
			
				Hackathon hack = t.getTeam().getHackathon();
				if(hack.getSponsors().contains(user.getOrganization()))
					hack.setFees((long)(hack.getFees()-(hack.getFees()*hack.getDiscount()/100)));
				Set<Team> temp = new HashSet<Team>();
				Team team = t.getTeam();
				team.setMembers(t.getTeam().getMembers());
				temp.add(team);
				
				hack.setTeams(temp);
				rval.add(t.getTeam().getHackathon());
			
		}
		return rval;
	}
	
	public List<Hackathon> getPendingHackathons(User user) {
		
		List<Hackathon> rval = new ArrayList<Hackathon>();
		for(TeamMember t:user.getTeams()) {
			if(!t.isJoined()) {
				Hackathon hack = t.getTeam().getHackathon();
				Set<Team> temp = new HashSet<Team>();
				temp.add(t.getTeam());
				hack.setTeams(temp);
				rval.add(t.getTeam().getHackathon());
			}
		}
		return rval;
	}
	
	public List<Hackathon> getCreatedHackathons(User user) {
		List<Hackathon> all = hackathonRepository.findAll();
		List<Hackathon> rval = new ArrayList<Hackathon>();
		for(Hackathon h:all) {
			if(h.getUser().getUuid().equals(user.getUuid()))
				rval.add(h);
		}
		return rval;
	}
	
	public List<Hackathon> getjudgeHackathons(User user) {
		List<Hackathon> all = hackathonRepository.findAll();
		List<Hackathon> rval = new ArrayList<Hackathon>();
		for(Hackathon h:all) {
			for(User j:h.getJudges())
				if(j.getUuid().equals(user.getUuid()))
					rval.add(h);
		}
		return rval;
	}

	public List<HackathonResult> getAllResults() {
		List<Team> allTeams = teamRepository.findAll();
		List<HackathonResult> result = new ArrayList<HackathonResult>();
		for(Team t:allTeams) {
			if(t.getGrades()!=null) {
				HackathonResult hr = new HackathonResult();
				hr.setHid(t.getHackathon().getId());
				hr.setEventName(t.getHackathon().getEventName());
				hr.setTid(t.getId());
				hr.setTeamName(t.getName());
				hr.setGrades(t.getGrades());
				result.add(hr);
			}
		}
		
		Collections.sort(result, new Comparator<HackathonResult>() {
	        public int compare(HackathonResult r1, HackathonResult r2) {
	            return r2.getGrades().compareTo(r1.getGrades());
	        }
	    });
		
		return result;
	}
}
