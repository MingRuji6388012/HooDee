import GeneralResponse from "../model/GeneralResponse";
import { QueryManyUsers, QueryOneUser, ResponseFromAuthen, UserButInSessionStorage } from "../model/User";
import { API_PORT } from "../setting"

const API_URL = `http://localhost:${API_PORT}/api/user`;

export async function searchUserByUserID(userID: number){
    // return a user that has user id provided.
    return fetch(`${API_URL}/search_by_id/${userID}`).then(res => res.json() as Promise<QueryOneUser>);
}

export async function seachUsersByUserName(queryStr: string){
    return fetch(`${API_URL}/search_by_username?UserName=${queryStr}`).then(res => res.json() as Promise<QueryManyUsers>);
}

export async function userFollowUser(followeeID: string, followerID: string){
    return fetch(`${API_URL}/api/user/follow`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            FolloweeID : followeeID,
            FollowerID : followerID
        })
    })
    .then(res => res.json() as Promise<GeneralResponse>);
}

export async function userUnfollowUser(followerID: number, followeeID: number){
    return fetch(`${API_URL}/api/user/follow`, {
        method: "delete",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "FollowerID" : followerID,
            "FolloweeID" : followeeID
        })
    })
    .then(res => res.json() as Promise<GeneralResponse>);
}

export async function removeUser(userID: number){
    return fetch(`${API_URL}/api/user/remove`, {
        method: "delete",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            UserID: userID
        })
    })
    .then(res => res.json() as Promise<GeneralResponse>);
}

export async function login(email:string, password:string, fa2:string){
    return fetch(`${API_URL}/authentication`, {
        headers: {
            'Content-Type' : 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ "User": {"Email": email, "Password": password}, "Code": fa2 }),
    })
    .then(res => res.json() as Promise<ResponseFromAuthen>);
}

export async function signup(email:string, fname:string, lname:string, username:string, password:string){
    const auth = { "User" : {"Email": email, "FirstName": fname, "Lastname": lname, "UserName": username, "Password": password} };
    return fetch(`${API_URL}/registeration`, {
        headers: {
            'Content-Type' : 'application/json',
            'Accept': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(auth),
    })
    .then(res => res.json() as any);
}

export async function signup2FA(code:string, email:string){
    return fetch(`${API_URL}/sign-up-2fa`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            code: code,
            email: email
        })
    })
    .then(res => res.json() as Promise<ResponseFromAuthen>);
}
