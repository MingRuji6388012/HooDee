// interfaces for data that has been fetch from api, related to User
import GeneralResponse from "./GeneralResponse";
import { PlaylistWithUserName } from "./Playlist";
export interface User {
    UserID: number;
    UserName:string;
    FirstName:string;
    LastName:string;
    DOB:Date;
    UserProfileIMG:string;
    Role:number;
}

export interface UserWithFollowerFollowee extends User{    
    Followers: {FollowerID: number}[];
    Followees: {FolloweeID: number}[]; // only ids were fetched
}

export interface UserButInSessionStorage extends UserWithFollowerFollowee {
    Email:string;
    TimeCreated:Date;
    Playlists: PlaylistWithUserName[];
    PlaylistsFollow: PlaylistWithUserName[];
}

export interface ResponseFromAuthen extends GeneralResponse {
    user: UserButInSessionStorage;
    token: string;
    authenticate: boolean;
}

export interface QueryManyUsers extends GeneralResponse{
    users: User[] | null;
}

export interface QueryOneUser extends GeneralResponse {
    user: UserWithFollowerFollowee | null;
}

