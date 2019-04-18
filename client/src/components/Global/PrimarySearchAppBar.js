import React from 'react';
import  { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import axios from "axios";
import Notif from "../Notification/NotificationView";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
const server = require('../../config')
const styles = theme => ({
  root: {
    width: '100%',
  },
  app:{
    backgroundColor:'#000000',
  },
  menu:{
    color:'#767070',
    
  },
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: 50,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

class PrimarySearchAppBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      redirectHome:false,
      redirectProfile:false,
      redirectEdit:false,
      anchorEl: null,
      anchorEl2:null,
      mobileMoreAnchorEl: null,
      numberOfNotifications:0,
      notifications:null,
      id:JSON.parse(localStorage.getItem('user'))._id,
      type:localStorage.getItem('type'),
      value:this.props.value,
      redirectEvents:false,
      redirectProjects:false
    };
    localStorage.setItem('nav',this.state.value)
    // if(localStorage.getItem('nav')){
    //   var value = parseInt(localStorage.getItem('nav'))
    //   console.log('resetting to : '+ value)
    //   this.setState({value})
    // }
    // console.log("-----" + this.state.value)

  }
  


  async componentDidMount(){
    if(this.state.type==="member"){
      await axios
      .get(
        `${server}/api/${this.state.type}s/${this.state.id}/notifications`
      )
      .then(res => {
        return res.data;
      })
      .then(json =>
        this.setState({
          notifications: json.data
        })
        );
      var newNotifications = this.state.notifications.filter(Notification => (Notification.seen === false))
      this.setState({numberOfNotifications:newNotifications.length})
    }
    console.log("they are : "+ this.state.value + " other  "+ localStorage.getItem('nav'))
    if(this.state.value !==parseInt(localStorage.getItem('nav'))){
      console.log('in')
      this.setState({value:parseInt(localStorage.getItem('nav'))})
    }
  }
  homeClicked = event => {
    this.setState({redirectHome:true});

  };
  profileClicked = event => {
    this.setState({redirectProfile:true});

  };
  editClicked = event => {
    this.setState({redirectEdit:true});
  };
  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleNotificationsMenuOpen = event => {
    this.setState({ anchorEl2: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null,anchorEl2: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
    
  };
  handleChange = (event,value) => {
    if(this.state.value!==value){
    this.setState({ value });
    console.log("handle change: "+ value)
    localStorage.setItem('nav',value)
    if(value===1){
      this.setState({redirectProjects:true})
    }
    if(value===2){
      this.setState({redirectEvents:true})
    }
    }

    
  };  

  render() {
    const { anchorEl, mobileMoreAnchorEl,numberOfNotifications,anchorEl2 } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMenuOpen2 = Boolean(anchorEl2);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.profileClicked}>Profile</MenuItem>
        <MenuItem onClick={this.editClicked}>Edit My Profile</MenuItem>
      </Menu>
    );
    const notificationsMenu = (
      <Menu
        anchorEl={anchorEl2}
        className={classes.menu}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen2}
        onClose={this.handleMenuClose}
      >
      <Notif notifications = {this.state.notifications }/>
      </Menu>
    );
    

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem >
          <IconButton color="inherit" onClick={this.homeClicked}>
              <HomeIcon/>
          </IconButton>
          <p>Home</p>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <Badge badgeContent={numberOfNotifications} color="secondary"onClick={this.handleNotificationsMenuOpen}>
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );
    if(!this.state.redirectHome&&!this.state.redirectProfile&&!this.state.redirectEdit){
      if(!this.state.redirectProjects&&!this.state.redirectEvents){
        return (
          <div className={classes.root}>
            <AppBar position="static"className={classes.app}>
              <Toolbar>
                <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                  Lirten Hub
                </Typography>
            <div className={classes.tabs}>
            <Tabs value={this.state.value}  onChange={this.handleChange}>
            <Tab className={classes.label} label="Explore" />
            <Tab className={classes.label} label="Projects" />
            <Tab className={classes.label}  label="Events" />
            </Tabs>
  
            </div>
  
  
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                  />
                </div>
  
                <div className={classes.grow} />
                <div className={classes.sectionDesktop}>
                  <IconButton color="inherit"onClick={this.homeClicked}>
                      <HomeIcon/>
                  </IconButton>
                  {this.state.type==="member" ? <IconButton color="inherit">
                    <Badge badgeContent={numberOfNotifications} color="secondary" onClick={this.handleNotificationsMenuOpen}>
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>:""}
                  <IconButton
                    aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleProfileMenuOpen}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                </div>
                <div className={classes.sectionMobile}>
                  <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                    <MoreIcon />
                  </IconButton>
                </div>
              </Toolbar>
            </AppBar>
            {renderMenu}
            {notificationsMenu}
            {renderMobileMenu}
          </div>
        );
      }else{
        if(this.state.redirectProjects)
        return <Redirect to={{pathname:"/projects"}}/>
        else
        return <Redirect to={{pathname:"/events"}}/>
      }
    }else{
      if(this.state.redirectHome)
        return <Redirect to={{ pathname:"/Home" }}/>
      else
        if(this.state.redirectProfile)
          return <Redirect to={{ pathname:"/Profile" }}/>
        else 
          return <Redirect to={{ pathname:"/EditProfile" }}/>
      
    }
  }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PrimarySearchAppBar);