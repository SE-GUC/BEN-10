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


class EachPartner extends React.Component {
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
    const partner = this.props.partners;
    const { classes } = this.props;
    if(this.state.show){
      const path =`/myProfile/${partner._id}`
      return <Redirect to={path}/>;
    }else
    console.log(partner)
    return (
      <Card className={classes.card}>
        <CardActionArea onClick={this.viewProfile} >
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
            </Typography>
                {partner.firstName ? partner.firstName : "None"} {partner.lastName ? partner.lastName : "None"}
            <br/>
            Email : {partner.email ? partner.email : "None"}
            <br />  
            Birth Date : {partner.birthdate ? partner.birthdate : "None"}
            <br />
            Gender : {partner.gender ? partner.gender : "None"}
            <br />
            Nationality: {partner.nationality ? partner.nationality : "None"}
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

EachPartner.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EachPartner);
