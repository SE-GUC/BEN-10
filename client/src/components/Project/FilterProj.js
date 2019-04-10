import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class SimpleMenu extends React.Component {
  state = {
    anchorEl: null,
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
          <MenuItem onClick={this.handleClose}>Negotiation</MenuItem>
          <MenuItem onClick={this.handleClose}>Approved</MenuItem>
          <MenuItem onClick={this.handleClose}>Final Draft</MenuItem>
          <MenuItem onClick={this.handleClose}>Canceled</MenuItem>
          <MenuItem onClick={this.handleClose}>Posted</MenuItem>
          <MenuItem onClick={this.handleClose}>In Progress</MenuItem>
          <MenuItem onClick={this.handleClose}>Final Review</MenuItem>
          <MenuItem onClick={this.handleClose}>Finished</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default SimpleMenu;
