
export function get_parameter(): object{
    // return dict of get parameter, like $_GET in PHP
    const url = window.location.href;
    let url_split = url.split("?");
    let parameters = url_split[1].split("&");
    let dict:any = {};
    parameters.forEach(element => {
        let [key, value] = element.split("=");
        dict[key] = value;
    });
    return dict;
}
