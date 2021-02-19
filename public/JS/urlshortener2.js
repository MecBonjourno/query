var endpoint = "https://www.jsonstore.io/8ba4fd855086288421f770482e372ccb5a05d906269a34da5884f39eed0418a1";

 getUser = ()=>{
    // firebase.auth().onAuthStateChanged(function(user) {
    //     if (user) {
    //     console.log(user)
    //       return user
    //     }
    //     })
    var user = firebase.auth().currentUser;
    var userID = user.uid;
    console.log(user)
    return userID
}

 geturl = () =>{

    // var url = document.getElementById("urlinput").value;
    // var user =  firebase.auth().onAuthStateChanged;
    // var userID = user.uid
    var user = this.getUser();
    var url = "https://querymobile.co/profile.html?uid=" + user;

    var url_string = (window.location.href);
    var urlsite = new URL(url_string);

    console.log(url)
    console.log(user)
    // console.log(userID)
    console.log(urlsite)

    var protocol_ok = url.startsWith("http://") || url.startsWith("https://") || url.startsWith("ftp://");
    if(!protocol_ok){
        newurl = "http://"+url;
        return newurl;
        }else{
            return url;
        }
}



function getrandom() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

function genhash(){
    if (window.location.hash == ""){
        window.location.hash = getrandom();
    }
}

function send_request(url) {
    this.url = url;
    $.ajax({
        'url': endpoint + "/" + window.location.hash.substr(1),
        'type': 'POST',
        'data': JSON.stringify(this.url),
        'dataType': 'json',
        'contentType': 'application/json; charset=utf-8'
})
}

function shorturl(){
    var longurl = geturl();
    genhash();
    send_request(longurl);
}

var hashh = window.location.hash.substr(1)

if (window.location.hash != "") {
    $.getJSON(endpoint + "/" + hashh, function (data) {
        data = data["result"];

        if (data != null) {
            window.location.href = data;
        }

    });
}
