import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import Navbar from "../Navbar/Navbar";
import isEmpty from "../../validation/is-empty";

import "./Profile.css";
//import { get_possible_judges } from "../../../action/getPossibleJudges";
import { createHackathon } from "../../actions/hackathonActions";
import {
  getOrganization,
  addOrganization
} from "../../actions/organizationActions";
import { updateProfile } from "../../actions/profileActions";
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
      organization_select: "",
      currentOrganization: ""
    };
  }

  componentWillMount() {
    console.log("Inside Component Will Mount");

    if (this.props.auth.user !== undefined) {
      this.setState({ user: this.props.auth.user });
      this.setState({
        currentOrganization: this.props.auth.user.organization.name
      });
      console.log("user redeifned ..............");
    }

    this.props.getOrganization();

    const newArray = [];
    if (this.props.organization !== undefined) {
      this.setState(
        {
          organization: [...this.state.organization, ...this.props.organization]
        },
        function() {
          const organizations = this.state.organization;
          let i = 1;
          organizations.map(organization => {
            const newOrganization = {
              ...organization,
              label: organization.orgName,
              value: i
            };
            i = i + 1;

            newArray.push(newOrganization);
          });
          this.setState({ organization: newArray });
        }
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (!isEmpty(nextProps.auth.user)) {
      const profile = nextProps.auth.user;

      profile.name = !isEmpty(profile.name) ? profile.name : "";
      profile.bussinessTitle = !isEmpty(profile.bussinessTitle)
        ? profile.bussinessTitle
        : "";
      profile.photoUrl = !isEmpty(profile.photoUrl) ? profile.photoUrl : "";
      profile.aboutMe = !isEmpty(profile.aboutMe) ? profile.aboutMe : "";
      profile.address = !isEmpty(profile.address) ? profile.address : "";
      if (!isEmpty(profile.organization)) {
        profile.currentOrganization = !isEmpty(profile.organization.orgName)
          ? profile.organization.orgName
          : "";
        this.setState({
          currentOrganization: profile.currentOrganization
        });
      }

      this.setState({
        name: profile.name,
        bussinessTitle: profile.bussinessTitle,
        photoUrl: profile.photoUrl,
        aboutMe: profile.aboutMe,
        address: profile.address
      });
      //console.log(this.state.organization_select);
    }
  }

  onOrganizationChange = e => {
    this.setState({ organization_select: e });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const updatedUser = {
      name: this.state.name,
      bussinessTitle: this.state.bussinessTitle,
      photoUrl: this.state.photoUrl,
      aboutMe: this.state.aboutMe,
      address: this.state.address
    };
    console.log(updatedUser);
    this.props.addOrganization(
      { orgId: this.state.organization_select.id },
      this.props.history
    );
    this.props.updateProfile(updatedUser, this.props.history);
  };

  render() {
    if (this.props.auth.isAuthenticated == false) this.props.history.push("/");

    const currentOrganization = !isEmpty(this.state.currentOrganization) ? (
      <div className="row">
        <span className="inputspan">
          <label className="form-label">Current Organization</label>
        </span>
        <span className="inputspan">
          <label className="form-label">{this.state.currentOrganization}</label>
        </span>
      </div>
    ) : null;
    return (
      <div>
        <Navbar />
        <div className="col-md-3" />
        <div className="col-md-6">
          <br />
          <br />
          <br />
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
                <label className="form-label">
                  {localStorage.getItem("username")}
                </label>
              </span>
              <br />
              <br />
            </div>
            <div className="row">
              <span className="inputspan">
                <label className="form-label">Email</label>
              </span>
              <span className="inputspan">
                <label className="form-label">
                  {this.props.auth.user.email}
                </label>
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
                name="bussinessTitle"
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
                name="photoUrl"
                value={this.state.photoUrl}
                onChange={this.onChange}
                required
              />
            </div>
            {currentOrganization}
            <div className="row">
              <span className="inputspan">
                <label className="form-label">Change Organization</label>
              </span>
              <Select
                className="form-input"
                options={this.state.organization}
                name="organization"
                value={this.state.organization_select}
                onChange={this.onOrganizationChange}
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
                name="aboutMe"
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
                name="address"
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
  organization: state.organization.all_organization
});

export default connect(
  mapStateToProps,
  { getOrganization, addOrganization, updateProfile }
)(Profile);
