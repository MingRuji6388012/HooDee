import { Component } from "react";
import SearchBar from "../component/SearchBar";
import RowVerticalCard from "../component/RowVerticalCard";
import { MusicWithUserName } from "../model/Music"
import { searchMusicsByMusicName } from "../controller/MusicController";
import "../css/search.css";

interface SearchPageState{
    musics: MusicWithUserName[] | null;
}
class SearchPage extends Component<{}, SearchPageState>{
    
    constructor(prop:any){
        super(prop);
        this.state = { 
            musics: null
        };
    }

    componentDidMount(){
        searchMusicsByMusicName("%25").then(res => {
            if(res.error){
                return;
            }
            this.setState({musics: res.musics})
            return res;
        });
    }

    render() {
        return (
            <div>
                <SearchBar/>
                <div className="container music-container">
                    <div className="row my-3">
                        <div className="col-lg-1"></div>
                        <div className="col-lg-10 music-title">Popular musics</div>
                        <div className="col-lg-1"></div>
                    </div>
                    <RowVerticalCard musics={this.state.musics} type={"music"}/>
                </div>
            </div>
        );
    }
}

export default SearchPage;
