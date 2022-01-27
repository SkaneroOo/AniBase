function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

let token = getCookie("access_token");
let login = document.getElementById("login");

if (token) {
    let loggedIn = document.createElement("h2");
    loggedIn.innerText = "Logged in";
    login.appendChild(loggedIn);
} else {
    let notLoggedIn = document.createElement("div");
    notLoggedIn.innerHTML = "<a href='https://anilist.co/api/v2/oauth/authorize?client_id=7387&response_type=code'>Login with AniList</a>";
    login.appendChild(notLoggedIn);
}