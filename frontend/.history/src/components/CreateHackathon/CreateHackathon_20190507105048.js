import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Field, reduxForm } from "redux-form";

import "./CreateHackathon.css";
import { TextField } from "material-ui";
//import { get_possible_judges } from "../../../action/getPossibleJudges";
import { createHackathon } from "../../actions/hackathonActions";
import { getJudges } from "../../actions/hackathonActions";
import Select from "react-select";

class CreateHackathon extends Component {
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      eventName: "",
      startDate: "",
      endDate: "",
      description: "",
      fees: "",
      judges: [],
      minTeamSize: "",
      maxTeamSize: "",
      sponsors: [],
      discount: "",
      user: "",
      judge_select: []
    };
  }

  componentDidMount() {
    console.log("Inside Component Will Mount");

    if (this.props.auth.user !== undefined) {
      this.setState({ user: this.props.auth.user });
    }
    this.props.getJudges();

    const newArray = [];
    this.setState(
      { judges: [...this.state.judges, ...this.props.judges] },
      function() {
        const judges = this.state.judges;
        let i = 1;
        judges.map(judge => {
          const newjudge = { ...judge, label: judge.screenName, value: i };
          i = i + 1;

          newArray.push(newjudge);
        });
        this.setState({ judges: newArray });
      }
    );
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
    debugger;
    console.log("On submit");
    const newHachathon = {
      eventName: this.state.eventName,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      description: this.state.description,
      fees: this.state.fees,
      judges: this.state.judges,
      minTeamSize: this.state.minTeamSize,
      maxTeamSize: this.state.maxTeamSize,
      sponsors: this.state.sponsors,
      discount: this.state.discount,
      user: this.state.user,
      judge_select: this.state.judge_select
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
            <h1 className="hackathon-header">Create Hackathon</h1>
            <p className="header">
              Host your own coding contest on OpenHack. You can practice and
              compete with friends. Select from our library of over 1,500 coding
              challenges or create your own.
              <br />
              Get started by providing the initial details for your contest.
            </p>
          </div>
          <form>
            <div className="row ">
              <span className="inputspan">
                <label className="form-label">Event Name</label>
              </span>
              <input
                className="form-input"
                type="text"
                name="eventName"
                value={this.state.eventName}
                onChange={this.onChange}
                required
              />
              <br />
              <br />
            </div>
            <div className="row">
              <span className="inputspan">
                <label className="form-label">Start Date</label>
              </span>
              <input
                className="form-input"
                type="date"
                name="startDate"
                value={this.state.startDate}
                onChange={this.onChange}
              />
            </div>
            <div className="row">
              <span className="inputspan">
                <label className="form-label">End Date</label>
              </span>
              <input
                className="form-input"
                type="date"
                name="endDate"
                value={this.state.endDate}
                onChange={this.onChange}
              />
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
              />
            </div>
            <div className="row">
              <span className="inputspan">
                <label className="form-label">Registration Fees</label>
              </span>
              <input
                className="form-input"
                type="text"
                name="fees"
                value={this.state.fees}
                onChange={this.onChange}
              />
            </div>
            <div className="row">
              <span className="inputspan">
                <label className="form-label">Judges</label>
              </span>
              <Select
                className="form-input"
                options={this.state.judges}
                isMulti
                name="judges"
                value={this.state.judge_select}
                onChange={this.addjudge}
              />
            </div>
            <div className="row">
              <span className="inputspan">
                <label className="form-label">Minimum Team Size</label>
              </span>
              <input
                className="form-input"
                type="number"
                min="1"
                max="100"
                name="minTeamSize"
                value={this.state.minTeamSize}
                onChange={this.onChange}
              />
            </div>
            <div className="row">
              <span className="inputspan">
                <label className="form-label">Maximum Team Size</label>
              </span>
              <input
                className="form-input"
                type="number"
                min="1"
                max="100"
                name="maxTeamSize"
                value={this.state.maxTeamSize}
                onChange={this.onChange}
              />
            </div>
            <div className="row">
              <span className="inputspan">
                <label className="form-label">Sponsors</label>
              </span>
              <Select
                className="form-input"
                options={this.state.techCompanies}
                isMulti
                name="sponsors"
                value={this.state.sponsors}
                onChange={this.onChange}
              />
            </div>
            <div className="row">
              <span className="inputspan">
                <label className="form-label">Sponsor Discount</label>
              </span>
              <input
                className="form-input"
                type="text"
                name="discount"
                value={this.state.discount}
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
  { getJudges, createHackathon }
)(CreateHackathon);
