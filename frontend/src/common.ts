import { searchPlaylistFollowedByUserID, searchPlaylistsByUserID } from "./controller/PlaylistController";
import { searchUserByUserID } from "./controller/UserController";
import { UserButInSessionStorage } from "./model/User";

export function get_parameter(): object{
    // return dict of get parameter, like $_GET in PHP
    const url = window.location.href;
    let url_split = url.split("?");
    if(url_split.length < 2) return {};
    let parameters = url_split[1].split("&");
    let dict:any = {};
    parameters.forEach(element => {
        let [key, value] = element.split("=");
        dict[key] = value;
    });
    return dict;
}

export async function refetchUserInfo(){
    // refetch user's information
    let userJSON = sessionStorage.getItem("user");
    if(userJSON === null) return;
    let user_info = JSON.parse(userJSON) as UserButInSessionStorage;
    let tmp_user_info:any;

    Promise.all([searchUserByUserID(user_info.UserID), searchPlaylistsByUserID(user_info.UserID), searchPlaylistFollowedByUserID(user_info.UserID)]).then((values) => {
        const [refetch_user_info, playlists_own, playlists_follow] = values;
        if(!refetch_user_info.error && !playlists_own.error && !playlists_follow.error){
            tmp_user_info = refetch_user_info.user;
            tmp_user_info["Playlists"] = playlists_own.playlists;
            tmp_user_info["PlaylistsFollow"] = playlists_follow.playlists;
            tmp_user_info = tmp_user_info as UserButInSessionStorage;
            sessionStorage.setItem("user", JSON.stringify(tmp_user_info));
        }
        else{
            console.log("refetch has some problem");
            console.log(JSON.stringify(refetch_user_info));
            console.log(JSON.stringify(playlists_own ));
            console.log(JSON.stringify(playlists_follow ));
        }
    });
}

export const ROLES = {
    user: 0,
    admin: 1,
    artist: 2
};

export function goHomeKiddos(){
    // for unauthorized access
    window.location.replace("/"); 
    // alert("Normies can't access"); 
    return;
}

export function is_user_followed(user_id:number, users_followee:{FolloweeID: number}[]){
    return users_followee.map(v => v.FolloweeID === user_id).reduce((a, b) => a || b, false);
}

export function is_playlist_followed(playlist_id:number, playlists_followed:{PlaylistID: number}[]){
    return playlists_followed.map(v => v.PlaylistID === playlist_id).reduce((a, b) => a || b, false);;
}