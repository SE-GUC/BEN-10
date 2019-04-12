// DOOOOODIE'S WORLD

import Component from "react"
import Approve from "./ApproveRequest"
import Disapprove from "./DisapproveRequest"
 export default class EventRequest extends Component{
    constructor(props){
        super(props);
        this.state={
            body:this.props.body,
            requestorName:""

        }
    }
    componentDidMount(){
        fetch(`http://localhost:5000/api/consultancyagency/${this.state.body.requestorId}`)
    .then(res=>{return res.json()}).then(
       result=>{
        this.setState({
            requestorName:result.data.name
        })
       }
    )
    fetch(`http://localhost:5000/api/partners/${this.state.body.requestorId}`)
    .then(res=>{return res.json()}).then(
       result=>{
        this.setState({
            requestorName:result.data.name
        })
       }
    )
        

    }    
    render(){
        return(
            <div>
                <Card style={{ width: '18rem' }}>
                <Card.Body>
                <Card.Title>{this.state.requestorName} sends an event request</Card.Title>
                <Card.Text>
                    <h1>Descrption</h1>
                    {
                        this.state.body.description
                    }
                </Card.Text>
                <Card.Text>
                    <h1>Type Of Event</h1>
                    {
                        this.state.body.eventType
                    }
                </Card.Text>
                <Card.Text>
                    <h1>Location</h1>
                    {
                        this.state.body.eventLocation
                    }
                </Card.Text>
                <Card.Text>
                    <h1>Date</h1>
                    {
                        this.state.body.eventDate
                    }
                </Card.Text>
                <Approve/>
                <Disapprove/>
                
                
                </Card.Body>
                </Card>;
            </div>
        )
        
    }


}