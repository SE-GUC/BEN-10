import React, { Component } from "react";
import PropTypes from "prop-types";
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
  card: {
    width: 300,
    backgroundColor: "#006064",
    marginBottom: 10,
    marginLeft: 530
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: "cover"
  },
  text: {
    color: "#ffc107"
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
    const { classes } = this.props;
    if (this.state.redirectview ) {
      const path = `/Projects/${this.props.project._id}`;
      return <Redirect to={path} />;
    } else if (this.state.redirectedit) {
      const path = `/MyProject/edit/${this.props.project._id}`;
      return <Redirect to={path} />;
    } else if (this.state.company) {
      return (
        <Card className={classes.card}>
          <CardActionArea onClick={this.viewProject}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2" />
              <Typography className={classes.text} component="p">
                Company Name:{this.state.company}
                <br />
                Description: {this.props.project.description}
                <br />
                Life Cycle:{this.props.project.lifeCycle}
                <br />
              </Typography>
            </CardContent>
          </CardActionArea>
          {(this.props.edit ||this.props.type ==="admin")? <div><Button onClick={this.goToEditPage}>Edit</Button>
            </div>:"" }
            
          <CardActions />
        </Card>
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
