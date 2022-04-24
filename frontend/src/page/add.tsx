import { Component } from "react";
// import "../css/add_page";

interface AddPageState {
    classNameUser: string;
    classNameMusic: string;
    classNamePlaylist: string;
    
}

class AddPage extends Component<{}, AddPageState>{
    constructor(props:any){
        super(props)
        this.state = {
            
        };
        
    }

    changeClassNameUser(e:any){

    }

    render(){
        return(
            <div>
                <div className = "DomainList">
                    <button onClick={this.changeClassNameUser} className={this.state.classNameUser}>User/Artist/Admin</button>
                    <button onClick={this.changeClassNameMusic} className={this.state.classNameMusic}>Music</button>
                    <button onClick={this.changeClassNamePlaylist} className={this.state.classNamePlaylist}>Playlist</button>
                </div>

                {this.state.stateDomainSelector}
            </div>


        )
    }
}

export default AddPage;