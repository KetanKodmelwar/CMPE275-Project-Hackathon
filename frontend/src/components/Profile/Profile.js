import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Field, reduxForm } from "redux-form";

import "./Profile.css";
import { TextField } from "material-ui";
//import { get_possible_judges } from "../../../action/getPossibleJudges";
import { createHackathon } from "../../actions/hackathonActions";
import { getOrganization } from "../../actions/organizationActions";
import Select from "react-select";

class Profile extends Component {
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      name: "",
      bussinessTitle: "",
      photoUrl: "",
      aboutMe: "",
      address: "",
      organization: [],
      user: "",
      organization_select: []
    };
  }

  componentWillMount() {
    console.log("Inside Component Will Mount");

    if (this.props.auth.user !== undefined) {
      this.setState({ user: this.props.auth.user });
      console.log("user redeifned ..............");
    }

    this.props.getOrganization();

    const newArray = [];
    this.setState(
      { organization: [...this.state.organization, ...this.props.organization] },
      function() {
        const organizations = this.state.organization;
        let i = 1;
        organizations.map(organization => {
          const newOrganization = { ...organization, label: organization.orgName, value: i };
          i = i + 1;

          newArray.push(newOrganization);
        });
        this.setState({ organization: newArray });
      }
    );
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.auth) {
      console.log("Inside the compoent will receive props using auth");
      
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const new_organization = [];
    this.state.organization_select.map(organization => {
      const newOrganization = {
        id: organization.id,
        orgOwner: organization.orgOwner,
        description: organization.description,
        address: organization.address,
        
      };
      new_organization.push(newOrganization);
    });

    const newHachathon = {
      eventName: this.state.eventName,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      description: this.state.description,
      fees: this.state.fees,
      minTeamSize: this.state.minTeamSize,
      maxTeamSize: this.state.maxTeamSize,
      sponsors: this.state.sponsors,
      discount: this.state.discount,
      user: this.state.user,
      judges: new_organization
    };
    console.log(newHachathon);

    this.props.createHackathon(newHachathon, this.props.history);
  };

  addjudge = e => {
    this.setState({ judge_select: [...e] });
  };

  render() {
    if (this.props.auth.isAuthenticated == false) this.props.history.push("/");
    return (
      <div>
        <div className="col-md-3" />
        <div className="col-md-6">
          <div className="row ">
            <h1 className="hackathon-header">Edit Profile</h1>
            </div>
            <div className="row ">
            <p className="header">
              Keep you profile updated
              <br />
              You can edit all fields except screen name and email
            </p>


          </div>
          <form>
            <div className="row ">
              <span className="inputspan">
                <label className="form-label">Screen Name</label>
              </span>
              <span className="inputspan">
                <label className="form-label">User screen Name</label>
              </span>
              <br />
              <br />
            </div>
            <div className="row">
              <span className="inputspan">
                <label className="form-label">Email</label>
              </span>
              <span className="inputspan">
                <label className="form-label">User Email</label>
              </span>
            </div>
            <div className="row">
              <span className="inputspan">
                <label className="form-label">Name</label>
              </span>
              <input
                className="form-input"
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
                
              />
            </div>
            <div className="row">
              <span className="inputspan">
                <label className="form-label">Business Title</label>
              </span>
              <input
                className="form-input"
                type="text"
                name="name"
                value={this.state.bussinessTitle}
                onChange={this.onChange}
                
              />
            </div>
            <div className="row">
              <span className="inputspan">
                <label className="form-label">Photo Url</label>
              </span>
              <input
                className="form-input"
                type="text"
                name="fees"
                value={this.state.photoUrl}
                onChange={this.onChange}
                required
              />
            </div>
            <div className="row">
              <span className="inputspan">
                <label className="form-label">Organization</label>
              </span>
              <Select
                className="form-input"
                options={this.state.organization}
                isMulti
                name="judges"
                value={this.state.organization_select}
                onChange={this.addOrganization}
                required
              />
            </div>
            
            <div className="row">
              <span className="inputspan">
                <label className="form-label">About Me</label>
              </span>
              <textarea
                className="form-input"
                rows="5"
                name="description"
                value={this.state.aboutMe}
                onChange={this.onChange}
                required
              />
            </div>
            <div className="row">
              <span className="inputspan">
                <label className="form-label">Address</label>
              </span>
              <input
                className="form-input"
                type="text"
                name="discount"
                value={this.state.address}
                onChange={this.onChange}
              />
            </div>
            <div className="row">
              <input
                className="form-submit"
                type="submit"
                value="Submit"
                onClick={this.onSubmit}
              />
            </div>
          </form>
        </div>

        <div className="col-md-3" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  judges: state.hackathon.judges
});

export default connect(
  mapStateToProps,
  { getOrganization }
)(Profile);
