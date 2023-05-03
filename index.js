require("dotenv").config();
const constants = require("./constant");
const http = require("http")
const fs = require("fs");
const path = require("path");

const handleRequest = function(req, res) {
   
    if(req.method == 'POST') {
        res.setHeader("Content-Type", "application/json")
        res.writeHeader(200);
        res.end("{message: 'Hello World!'}");
    } else {
        var file = "index.html";
        switch(req.url) {
            case '/':
                file = "index.html";
                break;
            case '/page1.html':
                file = "page1.html";
                break;
            case '/page2.html':
                file = "page2.html";
                break;
            case '/page3.html':
                file = "page3.html";
                break;
            default:
                file = "index.html";
                break;
        }

        fs.readFile(path.join(__dirname, file), function(err, buffer) {
            res.writeHeader(constants.HTTP_RESPONSE_OK);
            res.end(buffer);
        })
    }
    
}

const server = http.createServer(handleRequest)

const serve = server.listen(constants.HTTP_PORT, "localhost", function() {
    console.log("Server is running on port", serve.address().port);
})