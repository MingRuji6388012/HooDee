// interfaces for data that has been fetch from api, related to User
export interface User {
    UserID: number;
    UserName:string;
    FirstName:string;
    LastName:string;
    DOB:Date;
    UserProfileIMG:string;
    Role:number;
}

export interface UserButSecret extends User {
    Email?:string;
    Password?:string;
    Salt?:string;
    IsDelete?:string;
    Secret?:string;
    TimeCreated?:Date;
}

export interface QueryManyUsers {
    error: string;
    users: [User] | null;
    message: string;
}