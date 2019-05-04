import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import Route from "react-router-dom/Route";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import green from "@material-ui/core/colors/green";
import Fab from "@material-ui/core/Fab";
import CheckIcon from "@material-ui/icons/Check";
import SaveIcon from "@material-ui/icons/Save";
const server = require("../config");

const styles = theme => ({
  root: {
    display: "flex",
    alignItems: "center"
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: "relative"
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700]
    }
  },
  fabProgress: {
    color: green[500],
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
});

class ApproveFinalWork extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      approvingID: this.props.id,
      pID: this.props.pid,
      type: this.props.type,
      loading: false,
      success: false
    };
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleButtonClick = () => {
    if (!this.state.loading) {
      this.setState(
        {
          success: false,
          loading: true
        },
        () => {
          this.timer = setTimeout(() => {
            this.setState({
              loading: false,
              success: true
            });
          }, 2000);
        }
      );
    }
  };

  Approve = () => {
    if (this.state.type === "consultancyagency") {
      axios
        .put(
          `${server}/api/consultancyagency/${
            this.state.approvingID
          }/decide/${this.state.pID}/approve`,{
            headers: { "Content-Type": "application/json",
            "Authorization": "bearer " + localStorage.getItem('token')
           }
          }
        )
        .then(res => {
          console.log(res);
          return res.data;
        });
      if (!this.state.loading) {
        this.setState(
          {
            success: false,
            loading: true
          },
          () => {
            this.timer = setTimeout(() => {
              this.setState({
                loading: false,
                success: true
              });
            }, 2000);
          }
        );
      }
    } else {
      if (this.state.type === "partner") {
        axios
          .put(
            `${server}/api/partners/${
              this.state.approvingID
            }/myprojects/${this.state.pID}/finalreview/approve`,{
              headers: { "Content-Type": "application/json",
              "Authorization": "bearer " + localStorage.getItem('token')
             }
            }
          )
          .then(res => {
            console.log(res);
            return res.data;
          });
        if (!this.state.loading) {
          this.setState(
            {
              success: false,
              loading: true
            },
            () => {
              this.timer = setTimeout(() => {
                this.setState({
                  loading: false,
                  success: true
                });
              }, 2000);
            }
          );
        }
      }
    }
  };

  Disapprove = () => {
    if (this.state.type === "consultancyagency") {
      axios
        .put(
          `${server}/api/consultancyagency/${
            this.state.approvingID
          }/decide/${this.state.pID}/disapprove`,{
            headers: { "Content-Type": "application/json",
            "Authorization": "bearer " + localStorage.getItem('token')
           }
          }
        )
        .then(res => {
          console.log(res);
          return res.data;
        });
      if (!this.state.loading) {
        this.setState(
          {
            success: false,
            loading: true
          },
          () => {
            this.timer = setTimeout(() => {
              this.setState({
                loading: false,
                success: true
              });
            }, 2000);
          }
        );
      }
    } else {
      if (this.state.type === "partner") {
        axios
          .put(
            `${server}/api/partners/${
              this.state.approvingID
            }/myprojects/${this.state.pID}/finalreview/decline`,{
              headers: { "Content-Type": "application/json",
              "Authorization": "bearer " + localStorage.getItem('token')
             }
            }
          )
          .then(res => {
            console.log(res);
            return res.data;
          });
        if (!this.state.loading) {
          this.setState(
            {
              success: false,
              loading: true
            },
            () => {
              this.timer = setTimeout(() => {
                this.setState({
                  loading: false,
                  success: true
                });
              }, 2000);
            }
          );
        }
      }
    }
  };

  render() {
    const { loading, success } = this.state;
    const { classes } = this.props;
    const buttonClassname = classNames({
      [classes.buttonSuccess]: success
    });
    return (
      <div className={classes.root}>
        <div className={classes.wrapper}>
          <Fab
            color="primary"
            className={buttonClassname}
            onClick={this.handleButtonClick}
          >
            {success ? <CheckIcon /> : <SaveIcon />}
          </Fab>
          {loading && (
            <CircularProgress size={68} className={classes.fabProgress} />
          )}
        </div>
        <div className={classes.wrapper}>
          <Button
            variant="contained"
            color="primary"
            className={buttonClassname}
            disabled={loading}
            onClick={this.Approve.bind(this)}
          >
            Approve Final Work
          </Button>{" "}
          <Button
            variant="contained"
            color="primary"
            className={buttonClassname}
            disabled={loading}
            onClick={this.Disapprove.bind(this)}
          >
            Disapprove Final Work
          </Button>
          {loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </div>
      </div>
    );
  }
}

ApproveFinalWork.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ApproveFinalWork);
