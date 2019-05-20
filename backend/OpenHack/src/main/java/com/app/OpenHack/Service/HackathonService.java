package com.app.OpenHack.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.OpenHack.entity.EarningResult;
import com.app.OpenHack.entity.Hackathon;
import com.app.OpenHack.entity.HackathonResult;
import com.app.OpenHack.entity.Team;
import com.app.OpenHack.entity.TeamMember;
import com.app.OpenHack.entity.TeamResult;
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
	
	public Hackathon startendHackathon(Long id) {
		Hackathon hackathon = hackathonRepository.findById(id).get();
		Date today=new Date();
		long ltime=today.getTime()+7*24*60*60*1000;
		Date today8=new Date(ltime);
		hackathon.setEndDate(today8);
		hackathonRepository.save(hackathon);
		return hackathon;
	}
	
	public List<Hackathon> getAllHackathons(User user){
		List<Hackathon> all = hackathonRepository.findAll();
		List<Hackathon> rval = new ArrayList<Hackathon>(all);
		for(Hackathon h:all) {
			for(User j:h.getJudges())
				if(j.getUuid().equals(user.getUuid()))
					rval.remove(h);
		}
		return rval;
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
		Date date = new Date();  
		for(Hackathon h:all) {
			
			if(h.getEndDate().compareTo(date)<0) {

			for(User j:h.getJudges())
				if(j.getUuid().equals(user.getUuid()))
				rval.add(h);
		}
		}
		return rval;
	}

	public List<HackathonResult> getAllResults() {
//		List<Team> allTeams = teamRepository.findAll();
//		List<HackathonResult> result = new ArrayList<HackathonResult>();
//		for(Team t:allTeams) {
//			if(t.getGrades()!=null) {
//				HackathonResult hr = new HackathonResult();
//				hr.setHid(t.getHackathon().getId());
//				hr.setEventName(t.getHackathon().getEventName());
//				hr.setTid(t.getId());
//				hr.setTeamName(t.getName());
//				hr.setGrades(t.getGrades());
//				result.add(hr);
//			}
//		}
//		
//		Collections.sort(result, new Comparator<HackathonResult>() {
//	        public int compare(HackathonResult r1, HackathonResult r2) {
//	            return r2.getGrades().compareTo(r1.getGrades());
//	        }
//	    });
		
		// this block will filter out all hackathons
		// whose atleast one team has been graded
		List<Hackathon> all = hackathonRepository.findAll();
		List<Hackathon> rval = new ArrayList<Hackathon>();
		Boolean addHackathon = false;
		for(Hackathon h:all) {
			if(h.isFinalize()==true) {
				addHackathon=false;
				for(Team t:h.getTeams())
				{
					if(t.getGrades()!=null) {
						addHackathon= true;
						break;
						}
				}
				if(addHackathon)
				{
					rval.add(h);
				}
			}
		}
		
		List<HackathonResult> result = new ArrayList<HackathonResult>();
		for(Hackathon h1:rval)
		{
			HackathonResult hr = new HackathonResult();
			Set<TeamResult> temp = new HashSet<TeamResult>();
			hr.setHid(h1.getId());
			hr.setEventName(h1.getEventName());
			for(Team t:h1.getTeams()) {
				//rechecking the grading part
				// to get only graded teams from the graded hackathon
				if(t.getGrades()!=null) {
					TeamResult tr = new TeamResult();
					tr.setTid(t.getId());
					tr.setname(t.getName());
					tr.setGrades(t.getGrades());
					tr.setMembers(t.getMembers());
					temp.add(tr);	
				}
			}
			hr.setTeams(temp);
			result.add(hr);		
		}
		return result;
	}
	
	public void finalize(Long id) {
		Hackathon hack = hackathonRepository.findById(id).get();
		for(Team t:hack.getTeams()) {
			if(t.getSubmitionUrl()!=null && t.getGrades()==null)
				throw new IllegalArgumentException("Hackathon can not be finalized yet");
		}
		hack.setFinalize(true);
		hackathonRepository.save(hack);
	}
	
	public List<EarningResult> getAllEarning() {
		List<Hackathon> all = hackathonRepository.findAll();
		List<EarningResult> result = new ArrayList<EarningResult>();
		for(Hackathon h:all) {
			if(h.isFinalize()==true) {
				long sponsorSize;
				if(h.getSponsors()==null)
				{
					sponsorSize=0;
				}
				else
				{
					sponsorSize = h.getSponsors().size();
				}
				EarningResult er = new EarningResult();
				er.setHid(h.getId());
				er.setName(h.getEventName());
				er.setTotalTeamCount(h.getTeams().size());
				er.setPaidAmount(h.getTeams().size()*h.getFees());
				er.setUnpaidAmount((h.getTeams().size()*h.getFees())*0.1);
				er.setRevenueAmount(sponsorSize*1000);
				er.setExpense(0);
				er.setProfit(h.getTeams().size()*h.getFees()+sponsorSize*1000-0);
				result.add(er);
				}
			}
		return result;
	}
}
