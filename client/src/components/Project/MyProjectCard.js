import React, { Component } from "react";
import PropTypes from "prop-types";
import { Paper } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Route, withRouter } from "react-router-dom";
import { Redirect } from "react-router-dom";
import axios from "axios";
const server = require("../../config");

const styles = {
  block:{

  },
  card: {
    minWidth: 475,
    maxWidth: 800,
    display:"inline-block",
    marginBottom:5,
    
  },
  Link:{
    fontFamily:"Arial",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 23,
    paddingLeft:10
 
    }
    ,
    secondTypo:{
      fontFamily:"Montserrat",
      fontStyle: "normal",
      fontSize:20,
      color:"#616161",
      paddingLeft:10
  

  },
  firstTypo:{
    fontFamily:"Arial",
    fontStyle:"normal",
    fontSize:22,
    color:"#000000",
    paddingLeft:10,
    fontWeight:"bolder",
    fontVariant:"small-caps"

  },
  
  text: {
    color: "#e53935"
  }
};

class MyProjectCard extends Component {
  constructor(props) {
    super(props);
    this.viewProject = this.viewProject.bind(this);
    this.goToEditPage = this.goToEditPage.bind(this);

    this.state = {
      redirectview: false,
      redirectedit: false,
      company: null,
      flag: false
    };
  }
  
  viewProject() {
    this.setState({ redirectview: true });
  }
  componentDidMount() {
    axios
      .get(`${server}/api/partners/${this.props.project.companyId}`)
      .then(res => {
        return res.data;
      })
      .then(a =>
        this.setState({
          company: a.data.firstName + " " + a.data.lastName
        })
      );
  }

  DeletePage = () => {
    const requestOptions = {
      method: "DELETE"
    };
    fetch(
      `${server}/api/partners/${
        this.props.project.companyId
      }/deleteProject/${this.props.project._id}`,
      requestOptions
    )
      .then(response => {
        return response.json();
      })
      .then(result => {
        console.log(result);
        if (result.status === 404) alert(result.error);
        if (result.status === 200) {
          alert(result.msg);
        }
        if (result.status === 400) alert(result);
        else alert(result.msg);
      });
  };

  goToEditPage() {
    this.setState({ redirectedit: true });
  }

  render() {
    console.log("hello")
    const { classes } = this.props;
    if (this.state.redirectview ) {
      const path = `/Projects/${this.props.project._id}`;
      return <Redirect to={path} />;
    } else if (this.state.redirectedit) {
      const path = `/MyProject/edit/${this.props.project._id}`;
      return <Redirect to={path} />;
    } else if (this.state.company) {
      return (
        <div 
    className={classes.block}
    
    >
        <Paper 
        className={classes.card}
        >
          
          <a
  // onClick={this.viewProject}
  href= {""}
  className={classes.Link} onClick={this.viewProject}
  >
  {this.props.project.name.toString()}

    </a>
          
          <Typography className={classes.firstTypo}>
          company name
          </Typography>
          <Typography className={classes.secondTypo}>
          {this.state.company}
          </Typography>

          <Typography className={classes.firstTypo}>
          description
          </Typography>
          <Typography className={classes.secondTypo}>
          {this.props.project.description}
          </Typography>

          <Typography className={classes.firstTypo}>
          life cycle
          </Typography>
          <Typography className={classes.secondTypo}>
          {this.props.project.lifeCycle}
          </Typography>
           {(this.props.edit ||this.props.type ==="admin")? <div ><Button variant="contained"  onClick={this.goToEditPage}>Edit</Button>
            </div>:"" }

        </Paper>
    
    </div>


      );
    } else {
      return <div> </div>;
    }
  }
}

MyProjectCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MyProjectCard);
