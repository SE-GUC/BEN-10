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

const styles = {
  card: {
    maxWidth: 345
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: "cover"
  }
};


class EachMember extends React.Component {
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
    const member = this.props.members;
    const { classes } = this.props;
    if(this.state.show){
      const path =`/myProfile/${member._id}`
      return <Redirect to={path}/>;
    }else
    console.log(member)
    return (
      <Card className={classes.card}>
        <CardActionArea onClick={this.viewProfile} >
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
            </Typography>
                {member.firstName ? member.firstName : "None"} {member.lastName ? member.lastName : "None"}
            <br/>
            Email : {member.email ? member.email : "None"}
            <br />  
            Birth Date : {member.birthDate ? member.birthDate : "None"}
            <br />
            Mobile Number : {member.mobileNumber ? member.mobileNumber : "None"}
            <br />
            Nationality: {member.nationality ? member.nationality : "None"}
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

EachMember.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EachMember);
