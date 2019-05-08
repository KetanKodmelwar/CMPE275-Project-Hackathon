import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";
import {getDashboardDetails} from "../../actions/dashboardActions";
import {getHackathons, startHackathon} from "../../actions/hackathonActions";
import { Button } from "@instructure/ui-buttons";
import "./Dashboard.css";
import Profile from "./Profile"
import Navbar from "../Navbar/Navbar";
import {Link} from 'react-router-dom';




class Dashboard extends Component {
    constructor(props){
        super(props);

        this.state={
            events:[
                {name: "HACK 2015",
                description:"It is all about 2015 where angular has become famous and should work on MEAN stack. Great way to start your coding through through this hack where judges would be the GURUS of MEAN stack",
                 hDate:"02/15/2015"},
                 {name: "HACK 2016",
                 description:"2016 has come with great opportunities in KAFKA and best of messaging queues for distributed systems",
                 hDate:"03/12/2016"},
                 {name: "HACK 2017",
                 description:"Lets turn on into MERN stack this year with React being the heart of the application",
                 hDate:"05/11/2017"}
            ],
            errors:{}
        };
    }



    componentDidMount(){
      if(this.props.auth.isAuthenticated==false)
  {
    this.props.history.push("/");
  }
      console.log("Component in ",this.props.auth.user.screenName);
      this.props.getHackathons();
      
      console.log("Component hackathons ",this.props );
      
    
    }

    onDateClick=data=>{
      //e.preventDefault();
      this.props.startHackathon(data);
    }



  render() {
    console.log("checking the store",this.props.auth);
    console.log("hackathons found ",this.props);
    const userType=localStorage.getItem("userType");
    const {hackathons} = this.props;
      console.log(hackathons);
    if(this.props.hackathon!=undefined){
      console.log("not underinred");
    }


    let details=hackathons.map((data,key)=>{
        return (

            <div>
        <div class="card mb-3" width="250">
          <div class="card-body">
            <h5 class="card-title">
              <h2>{data.eventName}</h2>
            </h5>
          </div>
          
          <div class="card-body">
            <h5 class="card-title">{data.description}</h5>
            <h5 class="card-text" style={{'paddingTop':'20px'}}>
              START DATE: {data.startDate}
            </h5>
            <p align="right">
            {userType=="USER"? (<Link to={"/join-hackathon/"+data.id}><input className="submitButton" type="submit" value="JOIN" /></Link>):
            (<input className="submitButton" type="submit" onClick={()=>this.onDateClick(data.id)} value="Start Hackathon" />)}
            
           </p>
          </div>
        </div>

            </div>
        )
    })




    return (
      <div >
          <Navbar />
        <div className="row">
            <div className="col">
               <Profile/>
            </div>

            <div className="col-6 pt-5 pl-0">
                {details}
             </div>

             
            <div className="col" />
        </div>
        

        
      </div>
    )
  }
}


Dashboard.propTypes={
    //auth:PropTypes.object.isRequired,
    errors:PropTypes.object,
    hackathons: PropTypes.object
};

const mapStateToProps=state=>({
    auth:state.auth,
    errors:state.errors,
    hackathons:state.hackathon.hackathons
});

export default connect(mapStateToProps,{getDashboardDetails,getHackathons,startHackathon})(withRouter(Dashboard));
