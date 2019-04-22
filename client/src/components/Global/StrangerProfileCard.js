import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';

const styles = {
  block:{
    // marginLeft:100,
    // maxWidth: 845,
    // display: "inline-block"

  },
  card: {
    marginLeft:10,
    maxWidth: 860,
    marginBottom:5
    // backgroundColor:""
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
  Link:{
    fontFamily:"Arial",
    fontStyle: "normal",
    // fontVariant: "small-caps",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "justify",
    paddingLeft:10
    // marginLeft:30
    // display: "inline-block"
    },
  
  
  secondTypo:{
      fontFamily:"Montserrat",
      fontStyle: "normal",
      fontSize:16,
      color:"#616161",
      textAlign: "justify",
      paddingLeft:10
      // marginLeft:30
      // display: "inline-block"

  }
};


class StrangerProfileCard extends React.Component{
    constructor(props){
        super(props);
        this.state={
            type:this.props.type,
            user:this.props.user
            // type:"member",
            // user:{
            //     events:[],
            //     projects:["5cae5dbe9ef1de2600e06891"],
            //     skillSet:["mernstack","java","python"],
            //     _id:"5cae3044a972db1e007da3e9",
            //     firstName:"ahmad",
            //     lastName:"hisham",
            //     SSN:"29808161200322",
            //     birthDate:"1998-08-16T00:00:00.000Z",
            //     gender:false,
            //     nationality:"egyptian",
            //     maritalStatus:"single",
            //     drivingLicense:true,
            //     country:"Egypt",
            //     city:"cairo",
            //     area:"tagmoa'3",
            //     postalCode:200,
            //     email:"ahmedhisham16898@gmail.com",
            //     password:"ahmadaaadt@200",
            //     mobileNumber:"01015161711",
            //     alternativeMobileNumber:"0102006146",
            // }

        }
    }
    handleClick = () =>{

    }
    render(){
        const { classes } = this.props;

        if(this.state.type==="admin" || this.state.type==="member" || this.state.type==="partner"){
        return(
    <div 
    className={classes.block}
    
    >
        <Paper 
        className={classes.card}
        >
          
          <a
  href= {`/Profile/${this.props.user._id}`}
  className={classes.Link}
  >
  {this.state.user.firstName +" "+this.state.user.lastName}

    </a>
          
          <Typography className={classes.secondTypo} >
          email: {this.state.user.email} <br/>
          mobile number: {this.state.user.mobileNumber} <br/>
           </Typography>

        </Paper>
    
    </div>
        );
        
      
      }
        
        else{
            return(
    <div 
    className={classes.block}
    
    >
        <Paper 
        className={classes.card}
        >
          
          <a
  href= {`/Profile/${this.props.user._id}`}
  className={classes.Link}
  >
  {this.state.user.name}

    </a>
          
          <Typography className={classes.secondTypo} >
          Our Agency offers {this.state.user.about+" "}<br></br>
          you can contact us on email {this.state.user.email+" "}
          or telephone {this.state.user.telephoneNumber}
           </Typography>

        </Paper>
    
    </div>
            );

        }
    }

}
StrangerProfileCard.propTypes = {
    classes: PropTypes.object.isRequired,
  };
export default withStyles(styles)(StrangerProfileCard)