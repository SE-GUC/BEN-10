import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PartnerMyProject from './PartnerMyProjects'

class SimpleMenu extends React.Component {
  state = {
    anchorEl: null,
    filter : null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          Open Menu
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.state.filter = "Negotiation"}>Negotiation</MenuItem>
          <MenuItem onClick={this.state.filter = "Approved"}>Approved</MenuItem>
          <MenuItem onClick={this.state.filter = "Final Draft"}>Final Draft</MenuItem>
          <MenuItem onClick={this.state.filter = "Canceled"}>Canceled</MenuItem>
          <MenuItem onClick={this.state.filter = "Posted"}>Posted</MenuItem>
          <MenuItem onClick={this.state.filter = "In Progress"}>In Progress</MenuItem>
          <MenuItem onClick={this.state.filter = "Final Review"}>Final Review</MenuItem>
          <MenuItem onClick={this.state.filter = "Finished"}>Finished</MenuItem>
        </Menu>
         <PartnerMyProject filter={this.state.filter} id={this.state.parId} /> 
      </div>
    );
  }
}

export default SimpleMenu;
