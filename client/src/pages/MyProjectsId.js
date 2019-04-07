import React,{Component} from "react";
import Project from "../components/getProjectId/getProjectId.js";


class MyProjectsId extends Component{

    constructor(props){
        super(props);
        this.state={
        projectID:this.props.match.params.id}
    }

    render(){
        return(
       <div className="App">
            <Project id={this.state.projectID}/>
       </div>

        );
    }
}
export default MyProjectsId;