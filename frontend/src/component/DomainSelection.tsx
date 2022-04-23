import React, { Component } from 'react'
import "../css/DomainSelection.css";


// class DomainList extends Component{
    
// }

// interface EditPageState{
//     buttonStateQuantifier: DomainList
// }
interface DomainSelectionState{
    classNameUser: string;
    classNameMusic: string;
    classNamePlaylist: string;
}

class DomainSelection extends Component<{},DomainSelectionState>{
    constructor(props:any){
        super(props)
        this.state = {
            classNameUser: 'DomainButton',
            classNameMusic: 'DomainButton',
            classNamePlaylist: 'DomainButton'
        }
        this.changeClassNameUser = this.changeClassNameUser.bind(this);
    }

    changeClassNameUser = () => {
        this.setState({
            classNameUser: 'DomainButtonChanged',
            classNameMusic: 'DomainButton',
            classNamePlaylist: 'DomainButton'
        })
    }
    
    changeClassNameMusic = () => {
        this.setState({
            classNameUser: 'DomainButton',
            classNameMusic: 'DomainButtonChanged',
            classNamePlaylist: 'DomainButton'
        })
    }

    changeClassNamePlaylist = () => {
        this.setState({
            classNameUser: 'DomainButton',
            classNameMusic: 'DomainButton',
            classNamePlaylist: 'DomainButtonChanged'
        })
    }

    render(){
        return(
            <div className = "DomainList">
                <button onClick={this.changeClassNameUser} className={this.state.classNameUser}>User/Artist</button>
                <button onClick={this.changeClassNameMusic} className={this.state.classNameMusic}>Music</button>
                <button onClick={this.changeClassNamePlaylist} className={this.state.classNamePlaylist}>Playlist</button>
            </div>
        )
    }
}

export default DomainSelection;