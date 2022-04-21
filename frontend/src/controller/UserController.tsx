import GeneralResponse from "../model/GeneralResponse";
import { QueryManyUsers, QueryOneUser } from "../model/User";
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
    return fetch("/api/user/follow", {
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
    return fetch(`/api/user/follow`, {
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
    return fetch("/api/user/remove", {
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