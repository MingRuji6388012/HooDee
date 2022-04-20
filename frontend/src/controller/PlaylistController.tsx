import { QueryManyPlaylists } from "../model/Playlist";
import { API_PORT } from "../setting"

const API_URL = `http://localhost:${API_PORT}/api/playlist`;

export async function searchPlaylistsByUserID(userID:string){
    // return every playlists that user from user id own.
    return fetch(`${API_URL}/search_by_userid/${userID}`).then(res => res.json() as Promise<QueryManyPlaylists>);
}

export async function searchPlaylistsByPlaylistName(queryStr: string){
    return fetch(`${API_URL}/search_by_playlistname/${queryStr}`).then(res => res.json() as Promise<QueryManyPlaylists>);
}