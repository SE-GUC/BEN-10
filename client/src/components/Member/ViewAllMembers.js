import EachMember from './EachMember'
import React from "react";
import axios from "axios";


class allMembers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // eventId : this.props.id ,
      members: null,
      isLoaded: false
    };
  }
  componentDidMount() {
    axios
      .get(`http://localhost:5000/api/members/`)
      .then(res => {
        return res.data;
      })
      .then(a => this.setState({ members: a.data, isLoaded: true }));
  }

  render() {
    if (this.state.isLoaded) {
    return (
    <div className="App">
         {this.state.members.map((member,i) => <EachMember key={i} members={member}/> )
        
        }
    </div>
    )
}
    else return <label>Loading...</label>;
  }
}
export default allMembers;