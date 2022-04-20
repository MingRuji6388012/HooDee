import GeneralResponse from "./GeneralResponse";


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
