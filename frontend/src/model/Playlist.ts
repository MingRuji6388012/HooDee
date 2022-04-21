import GeneralResponse from "./GeneralResponse";
import { MusicWithUserName } from "./Music";


export interface Playlist {
    PlaylistID: number;
    PlaylistCreator: number;
    PlaylistName: string;
    PlaylistIMG: string;
    TimeCreated: Date;
}

export interface PlaylistWithUserName extends Playlist {
    UserName:string;
}

export interface QueryManyPlaylists extends GeneralResponse{
    playlists: PlaylistWithUserName[] | null;
}

export interface QueryOnePlaylist extends GeneralResponse {
    playlist: PlaylistWithUserName | null;
}
export interface QueryMusicInPlaylist extends QueryOnePlaylist{
    musics: MusicWithUserName[] | null;
};
