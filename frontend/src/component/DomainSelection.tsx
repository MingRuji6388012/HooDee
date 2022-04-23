import React, { Component } from 'react'
import "../css/DomainSelection.css";


interface DomainSelectionState{
    classNameUser: string;
    classNameMusic: string;
    classNamePlaylist: string;
    IsUserPage: boolean;
    IsMusicPage: boolean;
    IsPlaylistPage: boolean;
}

class DomainSelection extends Component<{},DomainSelectionState>{
    constructor(props:any){
        super(props)
        this.state = {
            classNameUser: 'DomainButton',
            classNameMusic: 'DomainButton',
            classNamePlaylist: 'DomainButton',
            IsUserPage: false,
            IsMusicPage: false,
            IsPlaylistPage: false
        }
        this.changeClassNameUser = this.changeClassNameUser.bind(this);
    }

    changeClassNameUser = () => {
        this.setState({
            classNameUser: 'DomainButtonChanged',
            classNameMusic: 'DomainButton',
            classNamePlaylist: 'DomainButton',
            IsUserPage: true,
            IsMusicPage: false,
            IsPlaylistPage: false
        })
    }
    
    changeClassNameMusic = () => {
        this.setState({
            classNameUser: 'DomainButton',
            classNameMusic: 'DomainButtonChanged',
            classNamePlaylist: 'DomainButton',
            IsUserPage: false,
            IsMusicPage: true,
            IsPlaylistPage: false
        })
    }

    changeClassNamePlaylist = () => {
        this.setState({
            classNameUser: 'DomainButton',
            classNameMusic: 'DomainButton',
            classNamePlaylist: 'DomainButtonChanged',
            IsUserPage: false,
            IsMusicPage: false,
            IsPlaylistPage: true
        })
    }

    render(){
        return(
            <div className = "DomainList">
                <button onClick={this.changeClassNameUser} className={this.state.classNameUser}>User/Artist/Admin</button>
                <button onClick={this.changeClassNameMusic} className={this.state.classNameMusic}>Music</button>
                <button onClick={this.changeClassNamePlaylist} className={this.state.classNamePlaylist}>Playlist</button>
            </div>
        )
    }
}

export default DomainSelection;