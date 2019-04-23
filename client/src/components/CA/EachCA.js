import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {Redirect} from 'react-router-dom'
const server = require("../../config");

const styles = {
  card: {
    maxWidth: 345
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: "cover"
  }
};


class EachCA extends React.Component {
  constructor(props) {
    super(props);
    this.viewProfile=this.viewProfile.bind(this);
    this.state = {
     show: false
        
    }
    
  }
  viewProfile() {
    this.setState({ show: true });
    console.log("hello");
  }
  render() {
    const ca = this.props.consultancyagency;
    const { classes } = this.props;
    if(this.state.show){
      const path =`/Profile/${ca._id}`
      return <Redirect to={path}/>;
    }else
    console.log(ca)
    return (
      <Card className={classes.card}>
        <CardActionArea onClick={this.viewProfile} >
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
            </Typography>
                {ca.name ? ca.name : "None"} 
            <br/>
            About : {ca.about ? ca.about : "None"}
            <br />  
            Telephone Number : {ca.telephoneNumber ? ca.telephoneNumber : "None"}
            <br />
            Email : {ca.email ? ca.email : "None"}
            <br />
            Years Of Experience : {ca.yearsOfExperience ? ca.yearsOfExperience : "None"}
       </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Show profile
          </Button>
        </CardActions>
      </Card>
    );
  }
}

EachCA.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EachCA);
