// interfaces for data that has been fetch from api, related to music
import GeneralResponse from "./GeneralResponse";

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

export interface QueryManyMusics extends GeneralResponse {
    musics: MusicWithUserName[] | null;
}

export interface QueryOneMusic extends GeneralResponse {
    music: MusicWithUserName | null;
}