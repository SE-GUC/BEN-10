import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import PostProjectMessage from "./PostProjectMessage"


const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
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
      description:"",
      category:"",
      want_consultancy:false,
      response:null
    };
  }

  clear() {
    this.setState({
      description: "",
      category:"",
    })
  }
  
  
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  

  render() {
    const { classes } = this.props;
    
    return (
      <div>
        <div>
          <label>
            Request a project
          </label>
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
            label="Select Consultancy"
            className={classes.textField}
            value={this.state.want_consultancy}
            onChange={this.handleChange("want_consultancy")}
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
          <PostProjectMessage className={classes.button} description={this.state.description} category={this.state.category}
          want_consultancy={this.state.want_consultancy} companyID={this.props.companyID} clear={this.clear}/>
        </div>
      </div>
  );
    
  }
  
}


PostProjectForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PostProjectForm);