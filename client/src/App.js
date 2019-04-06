import React, { Component } from "react";
import "./App.css";
import MyProjects from "./pages/MyProjects";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import Route  from "react-router-dom/Route";



class App extends Component {
  state = {
    partner_id:null,
    partner_name:null
  };
  
  componentDidMount() {
    axios.get("http://localhost:5000/api/partners")
    .then(res => {
      return res.data;
    })
    .then(a => this.setState({ partner_id: a.data[0]._id, partner_name:a.data[0].name }));
  }

  render() {
    if(this.state.partner_id!==null){
    return (
      <Router>
        <div className="App">
        {
          console.log(this.state.partner_id)
        }
              {/* <Route path="/MyProjects" render={(props) => <MyProjects {...props} partner_id={this.state.partner_id} partner_name={this.state.partner_name} />}/> */}
              <MyProjects partner_id={this.state.partner_id}/>
        </div>
      </Router>
      
    );
    }else{
      return(
        <Router>
        <div className="App">
        <Route path="/MyProjects" render={
        ()=>{
          return <label>Loading...</label>
        }
      }
      />
      </div>
      </Router>
      )
    }
  }
}

export default App;
