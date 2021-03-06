import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import PostProjectMessage from "./PostProjectMessage"

const server = require("../../config");

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width:500,
    float:"left"
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 50
  }
});

const states = [
  {
    value: "true",
    label: "Yes"
  },
  {
    value: "false",
    label: "No"
  }
];

class PostProjectForm extends React.Component {
  
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.clear = this.clear.bind(this)

    this.state = {
      name:"",
      description:"",
      category:"",
      wantConsultancy:false,
      response:null
    };
  }

  clear() {
    this.setState({
      name:"",
      description: "",
      category:"",
    })
  }
  
  handleChange = name => event => {
    console.log((this.state.wantConsultancy));

    this.setState({
      [name]: event.target.value
      
    });
    console.log((this.state.wantConsultancy));
  };


  render() {
    const { classes } = this.props;
    
    return (
      <div>
        <div>
          <TextField
            id="projectName"
            label="Project Name"
            className={classes.textField}
            value={this.state.name}
            onChange={this.handleChange("name")}
            margin="normal"
            variant="outlined"
          />
          <br />
          </div>
        <div>
          <TextField
            id="description"
            label="Description"
            className={classes.textField}
            onChange={this.handleChange("description")}
            value={this.state.description}
            margin="normal"
            variant="outlined"
            multiline
            rows="4"
          />
          {/* <br /> */}
        </div>
        <div>
          <TextField
            id="projectCategory"
            label="Project Category"
            className={classes.textField}
            value={this.state.category}
            onChange={this.handleChange("category")}
            margin="normal"
            variant="outlined"
          />
          <br />
        </div>
        <div>
          <TextField
            id="want_consultancy"
            select
            label="Need Consultancy"
            className={classes.textField}
            value={this.state.wantConsultancy}
            onChange={this.handleChange("wantConsultancy")}
            margin="normal"
            variant="outlined"
          >
            {states.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <br />
        </div>
       
        <div>
          <PostProjectMessage className={classes.button} name={this.state.name} description={this.state.description} category={this.state.category}
          wantConsultancy={this.state.wantConsultancy} companyID={this.props.companyID} clear={this.clear}/>
        </div>
      </div>
  );
    
  }
  
}


PostProjectForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PostProjectForm);