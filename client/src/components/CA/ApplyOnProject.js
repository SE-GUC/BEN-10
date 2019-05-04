import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ApplyingMessage from '../Member/SubmitWork/Message';
const server = require("../../config");





const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
  });

  class ApplyOnProject extends Component{

    constructor(props){
        super(props);
        this.state={
            id:this.props.CA_id,
            project_id:this.props.project_id,
            msg:null,
            context:null    
        }
        this.applyClick=this.applyClick.bind(this)
    }
    applyClick(){
         fetch(`https://lirtenben.herokuapp.com/api/consultancyagency/${this.state.id}/caApplyProject/${this.state.project_id}`, {
        method: 'PUT',
        body: {}
    })
    .then((response) => {return response.json()})
    .then((result)=>{
        if(result.msg=="Consultancy agent applied successfully"){
          this.setState({
              msg:true,
              context:result.msg
        })
        }
        else{
          this.setState({
              msg:false,
              context:result.error
        })
          
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
                (this.state.msg)?<ApplyingMessage msg={this.state.msg} context={this.state.context}/>:<ApplyingMessage msg={this.state.msg} context={this.state.context}/>
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
  
  
ApplyOnProject.propTypes = {
    classes: PropTypes.object.isRequired,
  }


  export default withStyles(styles)(ApplyOnProject);