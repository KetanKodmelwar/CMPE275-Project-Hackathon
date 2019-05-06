import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Field, reduxForm } from "redux-form";

import "./CreateHackathon.css";
import { TextField } from "material-ui";
//import { get_possible_judges } from "../../../action/getPossibleJudges";
import Select from "react-select";

class CreateHackathon extends Component {
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      EventName: "",
      StartDate: "",
      EndDate: "",
      Description: "",
      RegistrationFees: "",
      Judges: [],
      MinTeamSize: "",
      MaxTeamSize: "",
      Sponsors: [],
      SponsorDiscount: "",
      techCompanies: [
        { label: "Apple", value: 1 },
        { label: "Facebook", value: 2 },
        { label: "Netflix", value: 3 },
        { label: "Tesla", value: 4 },
        { label: "Amazon", value: 5 },
        { label: "Alphabet", value: 6 }
      ]
    };
  }

  // componentWillMount() {
  //   console.log("Inside Component Will Mount");
  //   this.props.get_possible_judges();
  // }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  
  render() {
    return (
      <div>
        <div className="col-md-3" />
        <div className="col-md-6">
          <div className="row ">
            <h1 className="hackathon-header">Create Hackathon</h1>
            <p className="header">
              Host your own coding contest on OpenHack. You can practice and
              compete with friends. Select from our library of over 1,500 coding
              challenges or create your own.
              <br />
              Get started by providing the initial details for your contest.
            </p>
          </div>

          <div className="row ">
            <span className="inputspan">
              <label className="form-label">Event Name</label>
            </span>
            <input className="form-input" type="text" />
            <br />
            <br />
          </div>
          <div className="row">
            <span className="inputspan">
              <label className="form-label">Start Date</label>
            </span>
            <input className="form-input" type="date" />
          </div>
          <div className="row">
            <span className="inputspan">
              <label className="form-label">End Date</label>
            </span>
            <input className="form-input" type="date" />
          </div>
          <div className="row">
            <span className="inputspan">
              <label className="form-label">Description</label>
            </span>
            <textarea className="form-input" rows="5" />
          </div>
          <div className="row">
            <span className="inputspan">
              <label className="form-label">Registration Fees</label>
            </span>
            <input className="form-input" type="text" />
          </div>
          <div className="row">
            <span className="inputspan">
              <label className="form-label">Judges</label>
            </span>
            <Select
              className="form-input"
              options={this.state.techCompanies}
              isMulti
            />
          </div>
          <div className="row">
            <span className="inputspan">
              <label className="form-label">Minimum Team Size</label>
            </span>
            <input className="form-input" type="number" min="1" max="100" />
          </div>
          <div className="row">
            <span className="inputspan">
              <label className="form-label">Maximum Team Size</label>
            </span>
            <input className="form-input" type="number" min="1" max="100" />
          </div>
          <div className="row">
            <span className="inputspan">
              <label className="form-label">Sponsors</label>
            </span>
            <Select
              className="form-input"
              options={this.state.techCompanies}
              isMulti
            />
          </div>
          <div className="row">
            <span className="inputspan">
              <label className="form-label">Sponsor Discount</label>
            </span>
            <input className="form-input" type="text" />
          </div>
          <div className="row">
            <input className="form-submit" type="submit" />
          </div>
        </div>

        <div className="col-md-3" />
      </div>
    );
  }
}

// CreateHackathon.propTypes = {
//   loginUser: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
//   errors: PropTypes.object.isRequired
// };

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});



export default connect(
  mapStateToProps,
  { CreateHackathon }
)(withRouter(CreateHackathon));
