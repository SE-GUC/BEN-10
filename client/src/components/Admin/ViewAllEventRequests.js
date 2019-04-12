// DOOOOODIE'S WORLD

import React,{Component} from "react"
import EventRequest from "./EventRequest"
import Loading from "../Global/loading"
export default class ViewAllEventRequests extends Component{
    constructor(props){
        super(props);
        this.state={
            id:this.props.admin_id,
            eventRequests:null

        }
    }
    componentDidMount(){
        fetch(`http://localhost:5000/api/admins/${this.state.id}/eventRequests`)
    .then(res=>{return res.json()}).then(
       result=>{
        this.setState({
            eventRequests:result.data
        })
       }
    )
    }
    render(){
        if(this.state.eventRequests!=null){
        return(
            
                 <div >

                 
                 {
            this.state.eventRequests.map(e=>(
                <EventRequest body={e}/>
                
            ))
            }
            </div>
            

        )
        }
        else{
            return (
                <Loading/>
            )

        }
        // return(
            
        //     <div>{
        //     this.state.eventRequests.map(e=>(
        //         <EventRequest body={e.data}/>
                
        //     ))
        //     }
        //     </div>

        // )
        
    }


}