import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Field, reduxForm } from "redux-form";

import "./JoinHackathon.css";
import { TextField } from "material-ui";
//import { get_possible_judges } from "../../../action/getPossibleJudges";
import Select from "react-select";
import Spinner from "../common/Spinner";
import {
  getHackathon,
  getJudges,
  getHackers
} from "../../actions/hackathonActions";

class JoinHackathon extends Component {
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      TeamName: "",
      TeamMembers: [{ name: "", role: "" }],
      judges: [],
      hackers_select: [],
      hackers: [],
      member1: "",
      member2: "",
      member3: "",
      member4: "",
      role1: "",
      role2: "",
      role3: "",
      role4: "",
    };
    this.onChange = this.onChange.bind(this);
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

  componentWillMount() {
    console.log("Inside Component Will Mount");

    if (this.props.match.params.id) {
      this.props.getHackathon(this.props.match.params.id);
    }

    //const newArray = [];
    this.props.getHackers();
    if (
      this.props.hackathon.hackers !=[] &&
      this.props.hackathon != undefined
    ) {
      console.log(this.props);
      this.setState({ hackers: this.props.hackathon.hackers });
    }

    const newArray = [];
    if (this.props.hackathon.hackers !== [] && this.props.hackathon.hackers !== undefined) {
      this.setState(
        { hackers: [...this.state.hackers, ...this.props.hackers] },
        function() {
          const hackers = this.state.hackers;
          let i = 1;
          hackers.map(hacker => {
            const newHacker = { ...hacker, label: hacker.screenName, value: i };
            i=i+1
          

            newArray.push(newHacker);
          });
          console.log(newArray);
          this.setState({ hackers: newArray });
        }
      );
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
   let { TeamMembers } = this.state;
    console.log(this.props);
    const options = [
      { label: "* Select Professional Status", value: 0 },
      { label: "Product Manager", value: "Product Manager" },
      { label: "Engineer", value: "Engineer" },
      { label: "Full Stack", value: "Full Stack" },
      { label: "Designer", value: "Designer" },
      { label: "Other", value: "Other" }
    ];

    if (this.props.hackathon.hackers === null) {
      return <Spinner />;
    } else {
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
            {console.log(this.state.hackers)}
            <label htmlFor="RoleId" className="form-label">
              Member
            </label>
            <select
             className="form-control form-control-lg"
              options={options}
              name="member1"
              value={this.state.member1}
              onChange={this.onChange}
              required
            />
            <label htmlFor="RoleId" className="form-label">
              Role
            </label>
            <select
              placeholder="roleId"
              name="role1"
              value={this.state.role1}
              onChange={this.onChange}
              options={options}
            />

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
                  {console.log()}
                  <select
                    className="form-input"
                    options={this.state.hackers}
                    name="hackers"
                    value={this.props.hackathon.hackers}
                    onChange={this.addHacker}
                    required
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
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  hackathon: state.hackathon,
  hackers: state.hackathon.hackers
});

export default connect(
  mapStateToProps,
  { JoinHackathon, getHackathon, getHackers }
)(withRouter(JoinHackathon));
