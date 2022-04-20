import { QueryManyUsers, QueryOneUser } from "../model/User";
import { API_PORT } from "../setting"

const API_URL = `http://localhost:${API_PORT}/api/user`;

export async function searchUserByUserID(userID: string){
    // return a user that has user id provided.
    return fetch(`${API_URL}/search_by_id/${userID}`).then(res => res.json() as Promise<QueryOneUser>);
}

export async function seachUsersByUserName(queryStr: string){
    return fetch(`${API_URL}/search_by_username?UserName=${queryStr}`).then(res => res.json() as Promise<QueryManyUsers>);
}