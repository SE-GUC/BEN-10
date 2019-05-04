import React, { Component } from "react";
import Nav from "../components/Global/PrimarySearchAppBar";
import style from "./home.css";
import Typography from "@material-ui/core/Typography";
const server = require("../../src/config");

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parId: this.props.user_id
    };
    console.log("hi");
  }
  render() {
    return (
      <div>
        <div class="mainu">
          <Nav value={0} />
          <div class="m4">
            <Typography class="m5" variant="subheading" gutterBottom>
              Our vision is to give a chance to those who wish to contribute but
              are not given a chance, to empower and teach those who want to
              better their futures and finally to solve the mess of the
              freelancing world.
            </Typography>
          </div>
         
        </div>
       
      </div>
    );
  }
}
export default Home;
