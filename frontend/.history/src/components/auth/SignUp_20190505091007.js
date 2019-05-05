import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";
import { Button } from "@instructure/ui-buttons";
import "./SignUp.css";
import fire from "../../config/firebaseConfig";
import setAuthToken from "../../utils/setAuthToken";

import { auth } from "firebase";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      screenName: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
      token: ""
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  onSubmit = e => {
    e.preventDefault();
    fire
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(u => {
        const newUser = {
          screenName: this.state.screenName,
          email: this.state.email,
          uuid: u.user.uid
          //token: "Bearer " + u.ra
        };

        //this.setState({ token: "Bearer " + u.ra });
        console.log("token value:" + u.user.ra);
        this.props.registerUser(newUser, u.user.ra, this.props.history);
      })
      .catch(error => {
        console.log(error);
      });

    // const newUser = {
    //   screenName: this.state.screenName,
    //   email: this.state.email,
    //   password: this.state.password,
    //   password2: this.state.password2
    // };

    // this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <div>
        <div className="col-md-4" />
        <div className="col-md-6">
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <div className="row ">
            <h1 className="hackathon-header">Open Hackathon</h1>
            <br />
            <br />
            <br />
          </div>

          <div className="row ">
            <p className="header">
              Welcome to the most competetive platform online.
              <br />
              Get started by signing up.
            </p>
          </div>
          <div className="row ">
            <span className="inputspan">
              <label className="form-label">Screen Name</label>
            </span>
            <input
              className="form-input"
              name="screenName"
              type="text"
              value={this.state.screenName}
              onChange={this.onChange}
              error={errors.screenName}
            />
            <br />
            <br />
          </div>
          <div className="row ">
            <span className="inputspan">
              <label className="form-label">Email</label>
            </span>
            <input
              className="form-input"
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.onChange}
              error={errors.email}
            />
            <br />
            <br />
          </div>
          <div className="row ">
            <span className="inputspan">
              <label className="form-label">Password</label>
            </span>
            <input
              className="form-input"
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.onChange}
              error={errors.password}
            />
            <br />
            <br />
          </div>
          <div className="row ">
            <span className="inputspan">
              <label className="form-label">Confirm Password</label>
            </span>
            <input
              className="form-input"
              type="password"
              name="password2"
              placeholder="Confirm Password"
              value={this.state.password2}
              onChange={this.onChange}
              error={errors.password2}
            />
            <br />
            <br />
          </div>

          <div className="row">
            <input
              className="form-submit"
              type="submit"
              onClick={this.onSubmit}
            />
          </div>
        </div>

        <div className="col-md-2" />
      </div>
    );
  }
}

SignUp.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(SignUp));
