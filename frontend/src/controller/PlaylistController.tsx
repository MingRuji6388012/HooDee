import GeneralResponse from "../model/GeneralResponse";
import { QueryManyPlaylists, QueryMusicInPlaylist } from "../model/Playlist";
import { API_PORT } from "../setting"

const API_URL = `http://localhost:${API_PORT}/api/playlist`;

export async function searchPlaylistsByUserID(userID: number){
    // return every playlists that user from user id own.
    return fetch(`${API_URL}/search_by_userid/${userID}`).then(res => res.json() as Promise<QueryManyPlaylists>);
}

export async function searchPlaylistsByPlaylistName(queryStr: string){
    return fetch(`${API_URL}/search_by_playlistname/${queryStr}`).then(res => res.json() as Promise<QueryManyPlaylists>);
}

export async function addNewMusicToPlaylist(music_id: number, playlist_id: number){
    return fetch(`${API_URL}/add_music`,  {
        method: "put",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            MusicID: music_id,
            PlaylistID: playlist_id
        })
    })
    .then(res => res.json() as Promise<GeneralResponse>);
}

export async function playlistFollow(userID:number, playlistID:number){
    return fetch(`${API_URL}/user_follow`,  {
        method: "post",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            UserID: userID,
            PlaylistID: playlistID
        })
    })
    .then(res => res.json() as Promise<GeneralResponse>);
}

export async function removePlaylist(playlistID: number){
    return fetch(`${API_URL}/delete`, {
        method: "delete",
        body: JSON.stringify({PlaylistID: playlistID}),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json() as Promise<GeneralResponse>);
}

export async function playlistUnfollow(userID: number, playlistID: number){
    return fetch(`${API_URL}/user_follow`, {
        method: "delete",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            UserID: userID,
            PlaylistID: playlistID
        })
    })
    .then(res => res.json() as Promise<GeneralResponse>);
}

export async function searchPlaylistFollowedByUserID(userID: number){
    return fetch(`${API_URL}/user_follow/${userID}`).then(res => res.json() as Promise<QueryManyPlaylists>);
}

export async function searchMusicInPlaylist(playlist_id:number){ // it is questionable that this one should be in this file or music
    return fetch(`${API_URL}/musics_in_playlist?PlaylistID=${playlist_id}`, {
        method: "GET"
    }).then(res => res.json() as Promise<QueryMusicInPlaylist>);
}
