import React, { Component } from "react";
import "./App.css";
import MyProjects from "./pages/MyProjects";
import axios from "axios";
import { BrowserRouter as Router  , Redirect , withRouter } from "react-router-dom";
import Route  from "react-router-dom/Route";
import EditMyProject from './pages/EditMyProject';

import { createHashHistory } from 'history'
export const history = createHashHistory()



class App extends Component {
  state = {
    partner_id:null,
    partner_name:null,
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
      <Router history={history}>
        <div className="App">
              <Route exact path="/MyProjects" render={
                (props) => <MyProjects {...props} partner_id={this.state.partner_id} 
                partner_name={this.state.partner_name} />}/>
                              
                <Route exact path="/MyProject/edit/:id" component={EditMyProject}/>
               
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

export default  App;
