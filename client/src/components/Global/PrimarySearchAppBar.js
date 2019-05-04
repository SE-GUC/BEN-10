import React from 'react';
import  { Redirect , Link } from 'react-router-dom'
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
import SearchPage from "./SearchPage";
import Profile from '../../pages/Profile';
import logo from './3DNav.png';
import { inherits } from 'util';
const server = require('../../config')
const styles = theme => ({
  root: {
    width: '100%'
  },
  logo:{
    marginRight:'20px',
    marginLeft:'10px',
    marginTop:'10px',
    marginBottom:'10px'
  },
  app:{
    backgroundColor:'#000000',
  },
  menu:{
    
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
      redirectProjects:false,
      searchWord:"",
      GoSearch:false,
      logout:false
    };
    this.handlePress = this.handlePress.bind(this);
    this.keyPress = this.keyPress.bind(this);
    localStorage.setItem('nav',this.state.value)

  }
  


  async componentDidMount(){
    if(this.state.type==="member"){
      await axios
      .get(
        `https://lirtenben.herokuapp.com/api/${this.state.type}s/${this.state.id}/notifications`,{
          headers: { "Content-Type": "application/json",
          "Authorization": "bearer " + localStorage.getItem('token')
         }
        }
      )
      .then(res => {
        return res.data;
      })
      .then(json =>
        this.setState({
          notifications: json.data
        })
        );
      var newNotifications = (this.state.notifications!=null)?(this.state.notifications.filter(Notification => (Notification.seen === false))):""
      this.setState({numberOfNotifications:newNotifications.length})
    }
    if(this.state.value !==parseInt(localStorage.getItem('nav'))){
      this.setState({value:parseInt(localStorage.getItem('nav'))})
    }
  }
  
  homeClicked = event => {
    this.setState({redirectHome:true});

  };
  profileClicked = event => {
    this.setState({redirectProfile:true});

  };
  handlePress(e) {
    this.setState({ searchWord: e.target.value });
 }

 keyPress(e){
    if(e.keyCode == 13){
      //  console.log('value', this.state.searchWord);
       // put the login here
       this.setState({GoSearch:true})
    }
 }
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
    window.location.reload();
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
    localStorage.setItem('nav',value)
    if(value===1){
      this.setState({redirectProjects:true})
    }
    if(value===2){
      this.setState({redirectEvents:true})
    }
    }

    
  }; 
  logoutClicked = async () =>{
    this.setState({logout:true})
    const token = localStorage.getItem('token')
    await fetch(`/logout`, {
      method: "put",
      


      headers: {
        "Content-Type": "application/json",

        Authorization: "bearer " + token
      }
    })
    localStorage.removeItem('token')
  }

  render() {
   if(this.state.logout){
    return(<Redirect to={{pathname:"/login"}}/>);
   }else{
    if(this.state.GoSearch===false){
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
         <Link to ="/profile">
            <MenuItem >Profile</MenuItem>
         </Link>
         <Link to="/EditProfile">
            <MenuItem onClick={this.editClicked}>Edit My Profile</MenuItem>
         </Link>
          <MenuItem onClick={this.logoutClicked}>logout</MenuItem>
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
          <Link to="/Home">
            <IconButton color="inherit">
                <HomeIcon/>
            </IconButton>
            </Link>
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
                <div className={classes.logo}>
                  <img src={logo} alt="Logo" height={35} width={110}  />
                  </div>
              <div className={classes.tabs}>
              <Tabs value={this.state.value}>
              <Tab className={classes.label} label="Explore" />
              <Link to="/Projects" style={{ color: '#FFF' }}>
                 <Tab className={classes.label} label="Projects" />
              </Link>
              <Link to="/Events" style={{ color: '#FFF' }}>
                 <Tab className={classes.label}  label="Events" />
              </Link>

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
                      value={this.state.searchWord}
                      onKeyDown={this.keyPress} 
                      onChange={this.handlePress}
                    />
                  </div>
    
                  <div className={classes.grow} />
                  <div className={classes.sectionDesktop}>
                  
                  <Link to="/Home" style={{ color: '#FFF' }}>
                    <IconButton color="inherit">
                        <HomeIcon/>
                    </IconButton>
                  </Link>  
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
            return <Link to="/Profile"/>
          else 
            return <Redirect to={{ pathname:"/EditProfile" }}/>
        
      }
    }else{
      // return <SearchPage searchWord={this.state.searchWord} />
      localStorage.setItem('search',this.state.searchWord);
      return <Redirect to={{ pathname:"/Search" ,
       }}/>
  
      
  
    }
   }
  }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PrimarySearchAppBar);