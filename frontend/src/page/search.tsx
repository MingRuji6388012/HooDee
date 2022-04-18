import { Component } from "react";
import SearchBar from "../component/SearchBar";
import "../css/search_bar.css";
import "../css/search.css";
import { QueryManyMusics } from "../model/Music"
import RowVerticalCard from "../component/RowVerticalCard";


class Search extends Component<{}, {data:QueryManyMusics;}>{
    
    constructor(prop:any){
        super(prop);
        // this.fetchSearch = this.fetchSearch.bind(this);
        this.state = { 
            data : {
                error: true,
                musics: null,
                message: ""
            }
        };
    }

    componentDidMount(){
        // document.getElementById("search-history-append")?.addEventListener("load", this.fetchSearch);
        fetch(`http://127.0.0.1:3001/api/music/search_by_musicname/%25`, {method: "GET",})
            .then(res => res.json())
            .then(res => {
                console.log(res);
                if(res.error){
                    return;
                }
                this.setState({data: res})
                return res;
            }
        );
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
                    <RowVerticalCard musics={this.state.data.musics} type={"music"}/>
                </div>
            </div>
        );
    }
}

export default Search;
