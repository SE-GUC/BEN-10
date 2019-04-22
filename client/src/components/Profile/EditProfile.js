import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import EditMember from "./EditMember";
import EditPartner from "./EditPartner";
import EditAdmin from "./EditAdmin";
import EditConsultancyAgency from "./EditConusltancyAgency";
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

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      user:JSON.parse(localStorage.getItem('user')),
      type:localStorage.getItem('type')
    };
    console.log(this.state)
  }

  render() {
    console.log(this.state.type)
    const { classes } = this.state;
    if (this.state.type === "member") {
      return <div className="App">{<EditMember member={this.state.user} />}</div>;
    } else {
      if (this.state.type === "partner") {
        return <div className="App">{<EditPartner partner={this.state.user} />}</div>;
      } else {
        if (this.state.type === "admin") {
          return <div className="App">{<EditAdmin admin={this.state.user} />}</div>;
        } else {
          if (this.state.type === "consultancyagency") {
            return (
              <div className="App">
                {<EditConsultancyAgency agency={this.state.user} />}
              </div>
            );
          }
        }
      }
    }
  }
}

EditProfile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EditProfile);
