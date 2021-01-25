window.onload = function() {
    try {
        var url_string = (window.location.href).toLowerCase();
        var url = new URL(url_string);
var name = url.searchParams.get("name");
        var geo = url.searchParams.get("geo");
        var size = url.searchParams.get("size");
console.log(geo + size +name);
    } catch (err) {
        console.log("Issues with Parsing URL Parameter's - " + err);
    }
}