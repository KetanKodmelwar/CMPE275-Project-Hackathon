import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import SimpleReactValidator from "simple-react-validator";
import axios from "axios";

import "./AddExpenses.css";
//import { get_possible_judges } from "../../../action/getPossibleJudges";
import Navbar from "../Navbar/Navbar";

class AddExpenses extends Component {
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      title: "",
      description: "",
      time: "",
      expenseAmount: "",
      currentDate: Date.now()
    };

    this.validator = new SimpleReactValidator({
      validators: {
        title: {
          message: "Title is required",
          rule: (val, params, validator) => {
            return val !== "";
          }
        },
        time: {
          message: "Time should be less than or equal to current time",
          rule: (val, params, validator) => {
            return this.state.time <= this.state.currentDate;
          }
        }
      }
    });
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated == false) {
      this.props.history.push("/");
    }
  }

  componentWillMount() {
    console.log("Inside Component Will Mount");

    if (this.props.auth.user !== undefined) {
      this.setState({ user: this.props.auth.user });
      console.log("user redeifned ..............");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value, errors: {} });
    this.validator.purgeFields();
  };

  onSubmit = id => {
    //if (this.validator.allValid()) {
    const newExpense = {
      title: this.state.title,
      description: this.state.description,
      time: this.state.time,
      expenseAmount: this.state.expenseAmount
    };
    console.log(newExpense);
    debugger;
    axios
      .put(`/hackathon/addexpense/${id}`, newExpense)
      .then(res => {
        window.alert("Expense added successfully");
      })
      .catch(err => {
        window.alert("Error adding expense");
      });
    // } else {
    //   this.setState({
    //     errors: {}
    //   });
    //   this.validator.showMessages();
    // }
  };

  render() {
    this.validator.purgeFields();
    if (this.props.auth.isAuthenticated == false) this.props.history.push("/");
    const { errors } = this.state;
    if (errors !== undefined && errors.msg !== undefined && errors !== {}) {
    }
    return (
      <div>
        <Navbar />
        <div className="col-md-3" />
        <div className="col-md-6">
          <br />
          <br />
          <div className="row ">
            <h1 className="hackathon-header">Add Expense</h1>
          </div>
          <br />
          <div className="row ">
            <p className="header">
              Add Expenses for you hackathon
              <br />
              Get started by providing the details of expenses.
            </p>
          </div>
          <br />
          <form>
            <div className="row ">
              <span className="inputspan">
                <label className="form-label">Title</label>
              </span>
              <input
                className="form-input"
                type="text"
                name="title"
                value={this.state.title}
                onChange={this.onChange}
                required
              />
              {this.validator.message(
                "title",
                this.state.title,
                "required|title"
              )}
              <br />
              <br />
            </div>
            <div className="row">
              <span className="inputspan">
                <label className="form-label">Time</label>
              </span>
              <input
                className="form-input"
                type="datetime-local"
                name="time"
                value={this.state.time}
                onChange={this.onChange}
                required
              />
              {this.validator.message("time", this.state.time, "required|time")}
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
                <label className="form-label">Expense Amount</label>
              </span>
              <input
                className="form-input"
                type="number"
                name="expenseAmount"
                min="1"
                value={this.state.expenseAmount}
                onChange={this.onChange}
              />
            </div>

            <div className="row">
              <input
                className="form-submit"
                type="submit"
                value="Submit"
                onClick={() => this.onSubmit(this.props.match.params.id)}
              />
            </div>
          </form>
        </div>

        <div className="col-md-3" />
        <div className="row" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps)(AddExpenses);