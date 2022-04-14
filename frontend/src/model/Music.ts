
// interfaces for data that has been fetch from api

export interface Music{
    MusicID:Number;
    UserID:Number;
    MusicName:string;
    MusicIMG:string;
    MusicFile:string;
    TimeCreated:Date;
}

export interface MusicWithUserName extends Music{
    UserName:string;
}

export interface SearchMusics {
    error?:boolean;
    musics?:[MusicWithUserName];
    message?:string;
}
