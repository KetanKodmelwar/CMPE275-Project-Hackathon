import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Field, reduxForm } from "redux-form";


import { TextField } from "material-ui";
import Select from "react-select";
import Navbar from "../Navbar/Navbar"


class Checkout extends Component{

    constructor(props){
        super(props);

        this.state={
            paid:""
        }


    }


    componentWillMount() {
        console.log("Inside Component did Mount");
        if (this.props.auth.user !== undefined) {
          this.setState({ user: this.props.auth.user });
        }
      } 

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        if (nextProps.errors) {
          this.setState({ errors: nextProps.errors });
        }
      }

      render(){
          return(
              <div>
                </div>
          )
      }
    
}

export default Checkout;