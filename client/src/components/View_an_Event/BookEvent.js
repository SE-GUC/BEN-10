import React from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import Snackbar from '@material-ui/core/Snackbar';

const theme1 = createMuiTheme({
  overrides: {
    // Name of the component ⚛️ / style sheet
    MuiButton: {
      // Name of the rule
      text: {
        // Some CSS
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      },
    },
  },
  typography: { useNextVariants: true },
  button:{
    backgroundColor:"#283593",
    marginLeft:550,
    color:"#fff"
  }
});


const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles1 = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

function MySnackbarContent(props) {
  const { classes, className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

MySnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

const styles2 = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
});


class bookEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      eventId:this.props.eventId,
      type :this.props.type,
      member:this.props.member,
      show:false,
      showMessage:[],
      snack:false,
    };
  }

  handleClick = () => {
    // this.props.sendClicked();
    this.setState({ open: true });
    
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      this.setState({ open: false,success:false,info:false,warning:false,danger:false });
      return;
    }

    
  };
  async sendClicked() {
    console.log("its clicked")
    console.log("its="+ "bearer " + localStorage.getItem('token'))
    if(this.state.type==="member"){
      await axios
      .put(
        `https://lirtenben.herokuapp.com/api/members/${this.state.member._id}/bookEvent/${this.state.eventId}`,{},{
          headers: { "Content-Type": "application/json",
          "Authorization": "bearer " + localStorage.getItem('token')
         }
        }
      )
      .then(res => {
        console.log(res);
        return res;
      })
      .then(json =>
        {if(json.data.msg){
        this.setState({
          showMessage: json.data.msg,
        })    
        console.log(this.state.showMessage)
      }
        else{this.setState({
          showMessage: json.data.error
        })}
      }
      );
    }
    if(this.state.showMessage=="You can't book this event"){
      this.setState({warning:true})
     
    }
    if(this.state.showMessage==="You already booked this event"){
      this.setState({info:true})
    }
    if(this.state.showMessage==="Event booked successfully"){
      this.setState({success:true})
    }
    if(this.state.showMessage==="invalid ID"){
      this.setState({danger:true})
    }
    this.handleClick();
    
  }

  async componentDidMount() {
    if(this.state.type==='member'){
      this.setState({show:true})
    }
    
  }

  render() {
    const { classes } = this.props;

    if ( this.state.show) {
      return (
        <div>
             <Button className={classes.button} onClick={()=>{this.sendClicked()}} >
                Book this event
                </Button>
                
                <div>
                <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open &&this.state.success}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <MySnackbarContentWrapper
            onClose={this.handleClose}
            variant="success"
            message={this.state.showMessage}
          />
        </Snackbar>
               <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open&&this.state.danger}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <MySnackbarContentWrapper
          variant="error"
          className={classes.margin}
          message={this.state.showMessage}
        />
        </Snackbar>
               <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open&&this.state.warning}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
         <MySnackbarContentWrapper
          variant="warning"
          className={classes.margin}
          message={this.state.showMessage}
        />
        </Snackbar>
               <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open&&this.state.info}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <MySnackbarContentWrapper
          variant="info"
          className={classes.margin}
          message={this.state.showMessage}
        />
        </Snackbar>
                </div>
        </div>
      );
    }
    else{
      return(null);}
  }
}
bookEvent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(theme1)(bookEvent);

