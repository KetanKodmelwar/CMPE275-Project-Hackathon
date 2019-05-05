import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { loginUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";
import fire from "../../config/firebaseConfig";
import "./Login.css";

class Login extends Component {
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      email: "",
      password: "",
      authFlag: false,
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
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(u => {
        console.log(u);
        const userData = {
          email: this.state.email,
          password: this.state.password,
          uid: u.user.uid
        };
        this.setState({ token: "Bearer " + u.user.ra });

        this.props.loginUser(userData, this.state.token);
      })
      .catch(error => {
        console.log(error);
      });

    // const userData = {
    //   userName: this.state.userName,
    //   password: this.state.password
    // };

    // this.props.loginUser(userData);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="content">
        <div className="applogin-banner">
          <div className="applogin-background" />
          <div className="applogin-container">
            <h1>
              Connecting to{" "}
              <div className="applogin-app-logo">
                <img
                  src="https://ok2static.oktacdn.com/bc/image/fileStoreRecord?id=fs0amebisreoB7xDi0x7"
                  alt="SJSU Single Sign-on"
                  className="logo sanjosestateuniversity_devshibbolethsp_1"
                />
              </div>
            </h1>
          </div>
        </div>
        <div id="login-box">
          <div className="okta-sign-in-header">
            <img
              src="https://ok2static.oktacdn.com/bc/image/fileStoreRecord?id=fs01heub3azJBMXWF0x7"
              className="auth-org-logo"
              alt="San Jose State University"
            />
            <div data-type="beacon-container" className="beacon-container" />
          </div>
          <div className="left">
            <h1 align="center">Login</h1>

            <TextFieldGroup
              type="email"
              name="email"
              value={this.state.email}
              placeholder="User name"
              onChange={this.onChange}
              error={errors.email}
            />
            <TextFieldGroup
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.onChange}
              error={errors.password}
            />
            <Link to="/signup">Create an account?</Link>

            <input
              type="submit"
              name="signin_submit"
              value="Sign In"
              onClick={this.onSubmit}
            />
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login));
