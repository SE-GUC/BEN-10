// DOOOOODIE'S WORLD

import Component from "react"

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
        return(
            eventRequests.filter(e=>{
                console.log(e);
            })

        )
        
    }


}