import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";
import {getDashboardDetails} from "../../actions/dashboardActions";
import {getHackathons, startHackathon} from "../../actions/hackathonActions";
import { Button } from "@instructure/ui-buttons";
import "./Submissions.css";
import Navbar from "../Navbar/Navbar";
import {Link} from 'react-router-dom';



class Submissions extends Component{
        constructor(props){
            super(props);

            this.state={
                events:[
                    {eventName: "HACK 2015",
                    description:"It is all about 2015 where angular has become famous and should work on MEAN stack. Great way to start your coding through through this hack where judges would be the GURUS of MEAN stack",
                     startDate:"02/15/2015"},
                     {eventName: "HACK 2016",
                     description:"2016 has come with great opportunities in KAFKA and best of messaging queues for distributed systems",
                     startDate:"03/12/2016"},
                     {eventName: "HACK 2017",
                     description:"Lets turn on into MERN stack this year with React being the heart of the application",
                     startDate:"05/11/2017"}
                ],
                errors:{}
            };
            
        }

        render(){


            let details=this.state.events.map((data,key)=>{
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
                            <input className="member-input" type="text" placeholder="Enter you git URL here" />
                            <input className="submitButton" type="submit" value="Submit your code" />            
                   </p>
                  </div>
                </div>
        
                    </div>
                )
            })

            return(
                <div >
          <Navbar />
        <div className="row">
            <div className="col">
               
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


Submissions.propTypes={
    errors:PropTypes.object,
    hackathons: PropTypes.object
}

const mapStateToProps=state=>({
    auth:state.auth,
    errors:state.errors,
    hackathons:state.hackathon.hackathons
});

export default connect(mapStateToProps,{getDashboardDetails})(withRouter(Submissions));