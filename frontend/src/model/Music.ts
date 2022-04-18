
// interfaces for data that has been fetch from api, related to music

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

export interface QueryManyMusics {
    error:boolean;
    musics:[MusicWithUserName] | null;
    message:string;
}
