import GeneralResponse from "../model/GeneralResponse";
import { QueryManyMusics, QueryOneMusic } from "../model/Music";
import { API_PORT } from "../setting"

const API_URL = `http://localhost:${API_PORT}/api/music`;

export async function searchMusicsByUserID(userID: number){
    // return every musics that user from user id own.
    return fetch(`${API_URL}/search_by_authorid/${userID}`).then(res => res.json() as Promise<QueryManyMusics>);
}

export async function searchMusicsByMusicName(queryStr: string){
    return fetch(`${API_URL}/search_by_musicname/${queryStr}`).then(res => res.json() as Promise<QueryManyMusics>)
}

export async function removeMusic(musicID: number){
    return fetch(`${API_URL}/remove`, {
        method: "delete",
        body: JSON.stringify({MusicID: musicID}),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json() as Promise<GeneralResponse>);
}

export async function searchMusicByAuthorName(queryStr: string) {
    return fetch(`${API_URL}/search_by_authorname/${queryStr}`)
    .then(res => res.json() as Promise<QueryManyMusics>);
}

export async function searchMusicsByMusicID(music_id:number) {
    return fetch(`${API_URL}/search_by_musicid/${music_id}`)
    .then(res => res.json() as Promise<QueryOneMusic>);
}

export async function createMusic(userid:number, musicName: string, musicFile:string, musicIMG: string) {
    const music = {Music : {UserID: userid, MusicName: musicName, MusicFile: musicFile, MusicIMG: musicIMG}};
    return fetch(`${API_URL}/add`, {
        method: "post",
        body: JSON.stringify(music),
        headers: {"Content-Type": "application/json"}
    }).then(res => res.json() as Promise<GeneralResponse>);
}
