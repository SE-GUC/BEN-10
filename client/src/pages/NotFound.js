import React ,{Component} from 'react';
import Notfound from "./NotFound.css"
class NotFound extends Component{
    constructor(props){
        super(props);
        this.state={

        }

    }
    render(){
        return(
            <div class="page">

            <label>Whoops</label>
            <div class="side2">
            <h id="word">Can't Find Any Results !!!!</h>

            </div>
            

            </div>


        );
    }

}
export default NotFound;
