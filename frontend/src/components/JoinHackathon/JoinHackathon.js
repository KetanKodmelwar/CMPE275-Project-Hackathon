import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Field, reduxForm } from "redux-form";

import "./JoinHackathon.css";
import { TextField } from "material-ui";
//import { get_possible_judges } from "../../../action/getPossibleJudges";
import Select from "react-select";

class JoinHackathon extends Component {
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      TeamName: "",
      TeamMembers: [{ name: "", role: "" }]
    };
  }
  handleChange = e => {
    if (["name", "role"].includes(e.target.className)) {
      let TeamMembers = [...this.state.TeamMembers];
      TeamMembers[e.target.dataset.id][
        e.target.className
      ] = e.target.value.toUpperCase();
      this.setState({ TeamMembers }, () => console.log(this.state.TeamMembers));
    } else {
      this.setState({ [e.target.name]: e.target.value.toUpperCase() });
    }
  };
  addTeamMembers = e => {
    this.setState(prevState => ({
      TeamMembers: [...prevState.TeamMembers, { name: "", role: "" }]
    }));
  };

  render() {
    let { TeamMembers } = this.state;
    return (
      <div>
        <div className="col-md-3" />
        <div className="col-md-6">
          <br />
          <br />
          <br />
          <div className="row">
            <h1 className="hackathon-header">Join Hackathon</h1>
            <br />
            <br />
            <br />
            <br />
          </div>
          <div className="row">
            <p className="header">
              Register for the Hackathon.Enter team details.
              <br />
            </p>
          </div>

          <div className="row ">
            <span className="inputspan">
              <label className="form-label">Team Name</label>
            </span>
            <input className="form-input" type="text" />
          </div>
          <br />
          <br />

          {TeamMembers.map((val, idx) => {
            let memberId = `member-${idx}`,
              roleId = `role-${idx}`;
            return (
              <div key={idx} className="row">
                <label
                  htmlFor={memberId}
                  className="form-label"
                >{`Member #${idx + 1}`}</label>
                <br />
                <input
                  type="text"
                  name={memberId}
                  data-id={idx}
                  id={memberId}
                  value={memberId[idx].name}
                  className="member-input"
                />
                <label htmlFor={roleId} className="form-label">
                  Role
                </label>
                <select
                  name={roleId}
                  data-id={idx}
                  id={roleId}
                  value={memberId[idx].role}
                  className="member-input"
                >
                  <option>Select</option>
                  <option>Product Manager</option>
                  <option>Engineer</option>
                  <option>Full Stack</option>
                  <option>Designer</option>
                  <option>Other</option>
                </select>
              </div>
            );
          })}
          <div className="row">
            <input
              className="form-submit"
              type="submit"
              value="Add team member"
              onClick={this.addTeamMembers}
            />
          </div>
          <br />

          <div className="row">
            <input className="form-submit" type="submit" value="Submit" />
          </div>
        </div>

        <div className="col-md-3" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { JoinHackathon }
)(withRouter(JoinHackathon));
