import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";
import {getDashboardDetails} from "../../actions/dashboardActions";
import { Button } from "@instructure/ui-buttons";
import "./Dashboard.css";
import Profile from "./Profile"
import Navbar from "../Navbar/Navbar";

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

    // componentDidMount(){
    //     if(!this.props.auth.isAuthenticated){
    //         this.props.history.push("/");
    //     }
    // }
    
//   componentWillReceiveProps(nextProps) {
//     if (nextProps.errors) {
//       this.setState({ errors: nextProps.errors });
//     }
//   }

    



  render() {
    let details=this.state.events.map((data,key)=>{
        return (
            <div>
        <div class="card mb-3" width="250">
          <div class="card-body">
            <h5 class="card-title">
              <h2>{data.name}</h2>
            </h5>
          </div>
          
          <div class="card-body">
            <h5 class="card-title">{data.description}</h5>
            <h5 class="card-text" style={{'paddingTop':'20px'}}>
              START DATE: {data.hDate}
            </h5>
            <p align="right">
            <input className="submitButton" type="submit" value="JOIN" />
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
    errors:PropTypes.object
};

const mapStateToProps=state=>({
    auth:state.auth,
    errors:state.errors
});

export default connect(mapStateToProps,{getDashboardDetails})(withRouter(Dashboard));
