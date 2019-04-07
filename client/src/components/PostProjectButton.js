import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class ContainedButtons extends React.Component {
    

    render(){
        const { classes  } = this.props;
        
        
        return (
            <div>
      
      <Button onClick={this.props.routeChange} variant="contained" color="secondary" className={classes.button}>
        {this.props.name}
      </Button>
      
      
    </div>
  );
  }
}


ContainedButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContainedButtons);
