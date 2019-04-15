import EachCA from './EachCA'
import React from "react";
import axios from "axios";
const server = require("../../config");


class allCAs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // eventId : this.props.id ,
      cas: null,
      isLoaded: false
    };
  }
  componentDidMount() {
    axios
      .get(`${server}/api/consultancyagency/`)
      .then(res => {
        return res.data;
      })
      .then(a => this.setState({ consultancyagency: a.data, isLoaded: true }));
  }

  render() {
    if (this.state.isLoaded) {
    return (
    <div className="App">
         {this.state.consultancyagency.map((ca,i) => <EachCA key={i} consultancyagency={ca}/> )
        
        }
    </div>
    )
}
    else return <label>Loading...</label>;
  }
}
export default allCAs;