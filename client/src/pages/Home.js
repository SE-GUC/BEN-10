import React, { Component } from "react";
import Nav from '../components/Global/PrimarySearchAppBar'
const server = require("../../src/config");

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            parId:this.props.user_id
        };
        console.log("hi")
    }
    render(){
        return(<div> 
            <Nav value={0}/>
        <h1>Home</h1>
        </div>);
    }
}
export default Home;