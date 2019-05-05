import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Message from "./ApplyingMessage"
import ApplyingMessage from './ApplyingMessage';
const server = require("../../../config");





const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
  });

  class ApplyButton extends Component{

    constructor(props){
        super(props);
        this.state={
            member_id:this.props.member_id,
            project_id:this.props.project_id,
            msg:null    
        }
        this.applyClick=this.applyClick.bind(this)
    }
    applyClick(){
      console.log("token " + localStorage.getItem('token'))
        fetch(`https://lirtenben.herokuapp.com/api/members/${this.state.member_id}/projects/${this.state.project_id}/apply`, {
        method: 'POST',
        headers: { "Content-Type": "application/json",
        "Authorization": "bearer " + localStorage.getItem('token')
       }
    })
    .then((response) => {
      console.log(response)
      return response})
    .then((result)=>{

        if(result.status===200){
          this.setState({msg:true})
        }
        else{
          this.setState({msg:false})
          
        }
        
    })
       
    }
    render(){
        const { classes } = this.props;
       
        if(this.state.msg!=null){
            console.log("daghaaat l zoraaar")
        return( 
            <div>
                
            <Button variant="contained" color="primary" className={classes.button} onClick={this.applyClick}>
            Apply
            </Button>
            
            {
                (this.state.msg)?<ApplyingMessage msg={this.state.msg}/>:<ApplyingMessage msg={this.state.msg}/>
            }
            </div>
                 
                 );  
            }
            else{
                console.log("lsaa madghthooosh")
                return(
                    <Button variant="contained" color="primary" className={classes.button} onClick={this.applyClick}>
            Apply
            </Button>
                )

            }
    }
}
  
  
ApplyButton.propTypes = {
    classes: PropTypes.object.isRequired,
  }


  export default withStyles(styles)(ApplyButton);