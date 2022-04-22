import { Component } from "react";
import RowVerticalCard from "../component/RowVerticalCard";
import { MusicWithUserName } from "../model/Music"
import { searchMusicsByMusicName } from "../controller/MusicController";
import "../css/search.css";
import UserSearchBar from "../component/UserSearchBar";

interface SearchPageState{
    musicsComponent: MusicWithUserName[] | null; // lists of component to be display
}
class SearchPage extends Component<{}, SearchPageState>{
    
    constructor(prop:any){
        super(prop);
        this.state = { 
            musicsComponent: null
        };
    }

    componentDidMount(){
        searchMusicsByMusicName("%25").then(res => {
            if(res.error){
                return;
            }
            this.setState({musicsComponent: res.musics})
            return res;
        });
    }

    render() {
        return (
            <div>
                <UserSearchBar/>
                <div className="container music-container">
                    <div className="row my-3">
                        <div className="col-lg-1"></div>
                        <div className="col-lg-10 music-title">Popular musics</div>
                        <div className="col-lg-1"></div>
                    </div>
                    <RowVerticalCard musics={this.state.musicsComponent} type={"music"}/>
                </div>
            </div>
        );
    }
}

export default SearchPage;
