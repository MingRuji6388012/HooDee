

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

export interface QueryManyPlaylists {
    error: boolean;
    playlists: PlaylistWithUserName[] | null;
    message: string;
}
