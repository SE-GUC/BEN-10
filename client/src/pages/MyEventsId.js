import React,{Component} from "react";
import Event from "../components/viewAnEvent/viewAnEvent.js";


class MyEventsId extends Component{

    constructor(props){
        super(props);
        this.state={
        eventID:this.props.match.params.id}
    }

    render(){
        return(
       <div className="App">
            <Event id={this.state.eventID}/>
       </div>

        );
    }
}
export default MyEventsId;