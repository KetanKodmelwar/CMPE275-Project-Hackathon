import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";
import { Button } from "@instructure/ui-buttons";
import "./SignUp.css";
import fire from "../../config/firebaseConfig";

import { auth } from "firebase";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      screenName: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
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
        console.log(u);
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
      <div id="signupBody">
        <div id="login-box1">
          <div className="left">
            <img
              alt="Canvas by Instructure"
              src="https://du11hjcvx0uqb.cloudfront.net/dist/images/login/canvas-logo-a66b946d8d.svg"
            />
            <h1 id="h1signup">Sign up</h1>
            <form noValidate>
              <TextFieldGroup
                id="TextFieldGroup"
                type="text"
                name="screenName"
                placeholder="User Name"
                value={this.state.screenName}
                onChange={this.onChange}
                error={errors.screenName}
              />
              <TextFieldGroup
                placeholder="Email"
                id="email"
                name="email"
                type="email"
                value={this.state.email}
                onChange={this.onChange}
                error={errors.email}
                info="This site uses your university email"
              />
              <TextFieldGroup
                id="TextFieldGroup"
                placeholder="Password"
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.onChange}
                error={errors.password}
              />
              <TextFieldGroup
                id="TextFieldGroup"
                placeholder="Confirm Password"
                name="password2"
                type="password"
                value={this.state.password2}
                onChange={this.onChange}
                error={errors.password2}
              />

              <button
                id="button"
                type="submit"
                name="signup_submit"
                style={{ display: "block" }}
                onClick={this.onSubmit}
              >
                {" "}
                Sign me up
              </button>
            </form>
          </div>
        </div>
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
