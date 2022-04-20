// interfaces for data that has been fetch from api, related to User
import GeneralResponse from "./GeneralResponse";
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

export interface UserButSecret extends User {
    Email?:string;
    Password?:string;
    Salt?:string;
    IsDelete?:string;
    Secret?:string;
    TimeCreated?:Date;
}

export interface QueryManyUsers extends GeneralResponse{
    users: User[] | null;
}

export interface QueryOneUser extends GeneralResponse {
    user: UserWithFollowerFollowee | null;
}

