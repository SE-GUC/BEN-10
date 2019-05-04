import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Axios from "axios";
import { Paper } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const server = require("../../config");
const styles = theme => ({
    paper:{
        marginBottom:10

    },
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
          fontSize:16,
          fontVariant:"small-caps"
          
  
      }
  
});
class booker extends React.Component{
    constructor(props){
        super(props);
        this.state={
            arr:JSON.parse(localStorage.getItem('event')).bookedMembers,
            members:[]

        }
    }
    componentDidMount(){

        this.state.arr.map(i=>{




            Axios.get(`/api/members/${i}`)
            .then(res => res.data)
            .then(p =>
                { 
                    if(typeof p.data !==undefined)
                     this.state.members.push(p.data)
                })
            



            

        })
        
        
    }
    render(){
        const { classes } = this.props;
        console.log(this.state.members)
        return(
        <div>
           {this.state.members.map(mem=>

<Paper className={classes.paper}>
<TextField
id="outlined-read-only-input"
label="Name"
defaultValue={mem.firstName +" "+mem.lastName}
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
label="Nationality"
defaultValue={mem.nationality}
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
label="Gender"
multiline
rowsMax="5"
defaultValue={(mem.gender)?"Female":"Male"}
className={classes.textField}
margin="normal"
InputProps={{
readOnly: true,
}}
variant="outlined"
/>
<br/>
<Grid container spacing={16}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" className={classes.title}>
              Skills:
            </Typography>
            <div className={classes.demo}>
              <List >
              {mem.skillSet.map(e=> <ListItem>       
                    <ListItemText
                      primary={<Typography className={classes.topic}>{e}</Typography>}
                    />
                  </ListItem>)}
                 
                
              </List>
            </div>
          </Grid>
          </Grid>
          <br/>

<TextField
id="outlined-read-only-input"
label="Email"
defaultValue={mem.email}
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
defaultValue={mem.mobileNumber}
className={classes.textField}
margin="normal"
InputProps={{
readOnly: true,
}}
variant="outlined"
/>
</Paper>



        )}

        </div>
        );
    }
}


booker.propTypes = {
    classes: PropTypes.object.isRequired
  };
  
  export default withStyles(styles)(booker);