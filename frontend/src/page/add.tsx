import { Component } from "react";
// import "../css/add_page";
import DomainSelection from '../component/DomainSelection';

class AddPage extends Component{
    constructor(props:any){
        super(props)
        const stateDomainSelector = <DomainSelection/>
    
    }

    render(){
        return(
            <DomainSelection/>
        )
    }
}

export default AddPage;