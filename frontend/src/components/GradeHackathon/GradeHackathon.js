import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import Table from "react-bootstrap/Table";

import { TextField } from "material-ui";
//import { get_possible_judges } from "../../../action/getPossibleJudges";
import Select from "react-select";
import "./GradeHackathon.css";

class GradeHackathon extends Component {
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      EventName: "",
      teamSubmissionDetails: [
        { teamName: "team1", submissionURL: "team1", grade: "1.5" },
        { teamName: "team2", submissionURL: "team2", grade: "2.0" },
        { teamName: "team3", submissionURL: "team3", grade: "3.0" }
      ]
    };
  }
  componentWillMount(){
    if (this.props.match.params.id) {
      this.props.getHackathon(this.props.match.params.id);
   }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    let data = this.state.teamSubmissionDetails.map((team, i) => {
      return (
        <tr>
          <td>{i + 1}</td>
          <td>{team.teamName}</td>
          <td>{team.submissionURL}</td>
          <td>{team.grade}</td>
          <td>
            <input type="text" />
          </td>
          <td>
            <input type="submit" className="form-submit-grade" />
          </td>
        </tr>
      );
    });
    return (
      <div>
        <div className="col-md-3" />
        <div className="col-md-6">
          <div className="row ">
            <h1 className="hackathon-header">Grade Hackathon</h1>
          </div>
          <div className="row ">
            <p className="header">
              Visit submission URL for further details about hackathon
              submission.
              <br />
              Consider past grade before re-grading.
            </p>
          </div>
          <div className="row ">
            <span className="inputspan">
              <label className="form-label">Event Name</label>
            </span>
            <span className="inputspan">
              <label className="form-label">Google Hackathon</label>
            </span>
            <br />
            <br />
            <br />
            <br />
          </div>
          <div className="row ">
            <Table
              bordered
              responsive="sm"
              responsive="md"
              responsive="lg"
              responsive="xl"
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Team Name</th>
                  <th>Submission URL</th>
                  <th>Current Grade</th>
                  <th>New Grade</th>
                  <th>Operation</th>
                </tr>
              </thead>
              <tbody>{data}</tbody>
            </Table>
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
  { GradeHackathon }
)(withRouter(GradeHackathon));
