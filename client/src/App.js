import React, { Component } from "react";
import "./App.css";
import MyProjects from "./pages/MyProjects";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
//import Route  from "react-router-dom/Route";



class App extends Component {
  state = {
    partner_id:null,
    partner_name:null
  };
  
  componentDidMount() {
    axios.get("http://localhost:5000/api/partners/")
    .then(res => {
      return res.data;
    })
    .then(a => this.setState({partner_id: a.data[0]._id, partner_name:a.data[0].name }));
  }

  render() {
    if(this.state.partner_id!==null){
      console.log(this.state.partner_id)
    return (
        <div className="App">
        <MyProjects id={this.state.partner_id}/>
              {/* <Route path="./pages/MyProjects" render={(props) => <MyProjects {...props} partner_id={this.state.partner_id} partner_name={this.state.partner_name} />}/> */}
        </div>
    );
    }else{
      return(
        <Router>
        <div className="App">
        {/* <MyProjects id={this.state.partner_id}/> */}
        {/* <Route path="./pages/MyProjects" render={(props) => <MyProjects {...props} partner_id={this.state.partner_id} partner_name={this.state.partner_name} />}/> */}

      </div>
      </Router>
      )
    }
  }
}

export default App;
