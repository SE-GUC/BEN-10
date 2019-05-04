import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Axios from "axios";
import Rating from 'material-ui-rating'
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const server = require("../../config");

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width:500
      },
      dense: {
        marginTop: 16,
      },
      menu: {
        width: 200,
      },
      title:{
          color:"#283593",
          marginLeft:10
      },
      topic:{
          color:"#212121",
          fontFamily:"Arial",
          fontWeight:"bold",
          fontSize:13
          
  
      }
  
});
class requestor extends React.Component{
    constructor(props){
        super(props);
        this.state={
            id:JSON.parse(localStorage.getItem('event')).requestorId,
            requestor:null,
            num:0

        }
    }
     componentDidMount(){
        
            Axios.get(`https://lirtenben.herokuapp.com/api/partners/${this.state.id}`)
            .then(res => res.data)
            .then(p =>
                { 
                    if(typeof p.data !==undefined)
                     this.setState({requestor:p.data})
                     this.setState({num:1})
                }
        
        )

        
       Axios.get(`https://lirtenben.herokuapp.com/api/consultancyagency/${this.state.id}`)
            .then(res => res.data)
            .then(p => {
                
                if((typeof p.data).toString()!=="undefined"){
                    console.log("hello")
                this.setState({requestor:p.data})
                this.setState({num:2})

                }
            }
        )
            

            
        
    }
    render(){
        const { classes } = this.props;
        console.log(this.state.requestor)
        if(this.state.num==0){
        return(
        <div>
           nothing to show 
           sorry dear:(

        </div>
        );
        }
        if(this.state.num==2){
            return(
                <div>
                <TextField
              id="outlined-read-only-input"
              label="Name"
              defaultValue={this.state.requestor.name}
              className={classes.textField}
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
             <br/>
    
             <TextField
              id="outlined-read-only-input"
              
              label="About"
              multiline
              rowsMax="5"
              defaultValue={this.state.requestor.about}
              className={classes.textField}
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
             <br/>
            <TextField
              id="outlined-read-only-input"
              label="Experience Years"
              defaultValue={this.state.requestor.yearsOfExperience}
              className={classes.textField}
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
             <br/>
           
    
            <TextField
              id="outlined-read-only-input"
              label="Email"
              defaultValue={this.state.requestor.email}
              className={classes.textField}
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
     <br/>
            <TextField
              id="outlined-read-only-input"
              label="Mobile Number"
              defaultValue={this.state.requestor.telephoneNumber}
              className={classes.textField}
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
             <br/>
            <Typography variant={"h6"} className={classes.title}>Rating</Typography>
            <Rating
          onRate={() => console.log('onRate')}
          value={this.state.requestor.rating}
          max={5}
          onChange={() => console.log('onChange')}
          readOnly
        />



            </div>
            )

        }
        else {
            return(
                <div>
                <TextField
              id="outlined-read-only-input"
              label="Name"
              defaultValue={this.state.requestor.firstName +" "+this.state.requestor.lastName}
              className={classes.textField}
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
    
             <TextField
              id="outlined-read-only-input"
              label="Nationality"
              defaultValue={this.state.requestor.nationality}
              className={classes.textField}
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
            
            <TextField
              id="outlined-read-only-input"
              label="Gender"
              multiline
              rowsMax="5"
              defaultValue={(this.state.requestor.gender)?"Female":"Male"}
              className={classes.textField}
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
    
            <TextField
              id="outlined-read-only-input"
              label="Email"
              defaultValue={this.state.requestor.email}
              className={classes.textField}
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
    
            <TextField
              id="outlined-read-only-input"
              label="Mobile Number"
              defaultValue={this.state.requestor.mobileNumber}
              className={classes.textField}
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
            </div>
            )
        }
    }
}


requestor.propTypes = {
    classes: PropTypes.object.isRequired
  };
  
  export default withStyles(styles)(requestor);