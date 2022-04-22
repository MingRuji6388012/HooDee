import { Component, ReactNode } from "react";
import ReactDOM from "react-dom";
import "../css/DomainSelection.css";

interface DomainListState{
    userPressed: boolean;
    musicPressed: boolean;
    playlistPressed: boolean;
}

class DomainList extends Component<{}, DomainListState>{
    setPressingState(){
        
    }
}

interface EditPageState{
    buttonStateQuantifier: DomainList
}

class DomainSelection extends Component<{}, EditPageState>{
    render(){
        return(
            <div className = "DomainList">
                {/* <button onClick = {this.setPressingState} className = "DomainButton">User/Artist</button>
                <button onClick = {this.setPressingState} className = "DomainButton">Music</button>
                <button onClick = {this.setPressingState} className = "DomainButton">Playlist</button> */}
            </div>
        )
    }
}

export default DomainSelection;