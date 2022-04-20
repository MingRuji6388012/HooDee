import { QueryManyMusics } from "../model/Music";
import { API_PORT } from "../setting"

const API_URL = `http://localhost:${API_PORT}/api/music`;

export async function searchMusicsByUserID(userID:string){
    // return every musics that user from user id own.
    return fetch(`${API_URL}/search_by_authorid/${userID}`).then(res => res.json() as Promise<QueryManyMusics>);
}

export async function searchMusicsByMusicName(queryStr:string){
    return fetch(`${API_URL}/search_by_musicname/${queryStr}`).then(res => res.json() as Promise<QueryManyMusics>)
}