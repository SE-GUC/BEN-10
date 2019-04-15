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
      show: false
    };
  //  this.onUpdate = this.onUpdate.bind(this);
  }

  render() {
    console.log(this.props.type)
    const { classes } = this.props;
    if (this.props.type === "member") {
      return <div className="App">{<EditMember member={this.props.user} />}</div>;
    } else {
      if (this.props.type === "partner") {
        return <div className="App">{<EditPartner partner={this.props.user} />}</div>;
      } else {
        if (this.props.type === "admin") {
          return <div className="App">{<EditAdmin admin={this.props.user} />}</div>;
        } else {
          if (this.props.type === "consultancyagency") {
            return (
              <div className="App">
                {<EditConsultancyAgency agency={this.props.user} />}
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
