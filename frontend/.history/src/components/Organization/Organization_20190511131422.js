import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Field, reduxForm } from "redux-form";

import "./Organization.css";
import { createOrganization } from "../../actions/organizationActions";
import Select from "react-select";
import Navbar from "../Navbar/Navbar";

class Organization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      organizationName: "",
      owner: "",
      description: "",
      address: ""
    };
  }

  componentWillMount() {
    console.log("Inside Component did Mount");
    if (this.props.auth.user !== undefined) {
      this.setState({ user: this.props.auth.user });
      this.setState({ owner: this.props.auth.user });
    }
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated == false) {
      this.props.history.push("/");
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const owner = {
      uuid: this.state.user.uuid
      // screenName: this.state.user.screenName,
      // name: this.state.user.name,
      // email: this.state.user.email,
      // bussinessTitle: this.state.user.bussinessTitle,
      // organization: this.state.user.organization,
      // photoUrl: this.state.user.photoUrl,
      // aboutMe: this.state.user.aboutMe,
      // address: this.state.user.address,
      // username: this.state.user.username
    };

    const newOrganization = {
      orgName: this.state.organizationName,
      orgOwner: owner,
      description: this.state.description,
      address: this.state.address
    };
    console.log(newOrganization);

    this.props.createOrganization(newOrganization, this.props.history);
  };

  render() {
    console.log("Inside render");

    return (
      <div>
        <Navbar />
        <div className="col-md-3" />
        <div className="col-md-6">
          <div className="row ">
            <h1 className="organization-header">Create Organization</h1>
            <p className="header">
              Create your own Organization. You can add people in the
              organization. People in the same organization have their own perks
              <br />
              Get started by providing the initial details for your Organization
              and then ask people to join.
            </p>
          </div>

          <br />
          <br />
          <form>
            <div className="row ">
              <span className="inputspan">
                <label className="form-label">Organization Name</label>
              </span>
              <input
                className="form-input"
                type="text"
                name="organizationName"
                value={this.state.organizationName}
                onChange={this.onChange}
                required
              />
              <br />
              <br />
            </div>

            <div className="row">
              <span className="inputspan">
                <label className="form-label">Description</label>
              </span>
              <textarea
                className="form-input"
                rows="5"
                name="description"
                value={this.state.description}
                onChange={this.onChange}
                required
              />
            </div>

            <div className="row ">
              <span className="inputspan">
                <label className="form-label">Address</label>
              </span>
              <textarea
                className="form-input"
                type="text"
                name="address"
                value={this.state.address}
                onChange={this.onChange}
              />
              <br />
              <br />
            </div>
            <br />
            <br />

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
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createOrganization }
)(withRouter(Organization));
