import React from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';

const theme = createMuiTheme({
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
});

class feedBackSending extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventId:this.props.eventId,
      type :this.props.type,
      ownerId:this.props.ownerId,
      reqId:this.props.reqId,
      show:false
    };
  }

  async sendClicked() {
    console.log(this.state.type);
    if(this.state.type==="partner"){
      await axios
      .post(
        `http://localhost:5000/api/partners/${this.state.ownerId}/rating/${this.state.eventId}`
      )
      .then(res => {
        console.log(res);
        return res.data;
      })
      .then(json =>
        this.setState({
          showMessage: json.data
        })
      );
        alert("Attendees are notified");}
      else{
        if(this.state.type==="consultancyagency"){
          await axios
          .post(
            `http://localhost:5000/api/consultancyagency/${this.state.ownerId}/rating/${this.state.eventId}`
          )
          .then(res => {
            console.log(res);
            return res.data;
          })
          .then(json =>
            this.setState({
              showMessage: json.data
            })
          );
            alert("Attendees are notified");
        }
        else{
          if(this.state.type==="admin"){
            console.log("here");
          await axios
          .post(
            `http://localhost:5000/api/admins/${this.state.ownerId}/events/${this.state.eventId}/sendFeedBackForm`
          )
          .then(res => {
            console.log(res);
            return res.data;
          })
          .then(json =>
            this.setState({
              showMessage: json.data
            })
          );
            alert("Attendees are notified");

        }
      }

      }


  }

  async componentDidMount() {
    console.log(this.state.ownerId);
    console.log(this.state.reqId)
    console.log(this.state.type)
   console.log(this.state.ownerId.toString()===this.state.reqId.toString())
    if(this.state.ownerId.toString()===this.state.reqId.toString()&&(this.state.type==='partner'||this.state.type==='admin'||this.state.type==='consultancyagency')){
      this.setState({show:true})
      console.log(this.state.show)
    }
    
    
  }

  
  render() {
    if (this.state.show) {
      return (
        <div>
             <MuiThemeProvider theme={theme}> <Button onClick={()=>{this.sendClicked()}} variant="primary">
                Send FeedBack
              </Button></MuiThemeProvider>
              
        </div>
      );
    }
    else{
      return(null);}
  }
}
export default withStyles(theme)(feedBackSending);
