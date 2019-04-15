import EachPartner from './EachPartner'
import React from "react";
import axios from "axios";
const server = require("../../config");


class allPartners extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // eventId : this.props.id ,
      partners: null,
      isLoaded: false
    };
  }
  componentDidMount() {
    axios
      .get(`${server}/api/partners/`)
      .then(res => {
        return res.data;
      })
      .then(a => this.setState({ partners: a.data, isLoaded: true }));
  }

  render() {
    if (this.state.isLoaded) {
    return (
    <div className="App">
         {this.state.partners.map((partner,i) => <EachPartner key={i} partners={partner}/> )
        
        }
    </div>
    )
}
    else return <label>Loading...</label>;
  }
}
export default allPartners;