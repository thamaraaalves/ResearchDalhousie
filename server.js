var ws = require("nodejs-websocket")
var ip = "134.190.144.234"
    //var ip = "192.168.0.3"
    // Create a Websocket in node.js 
var server = ws.createServer(function (conn) {
    conn.nickname = null
    console.log("New connection")
    conn.on("text", function (str) {
        if (conn.nickname === null) {
            conn.nickname = str
            console.log(conn.nickname + " is connected")
        } else {
            console.log("Received " + str + " from " + conn.nickname)
        }
        server.connections.forEach(function (connection) {
            connection.sendText(str);
        })
    })

    conn.on("close", function (code, reason) {
        console.log("Connection closed")
    })
    conn.on("error", function () {})
}).listen(9001, ip);

// Create a web server in node.js 
var port = 8080;
var http = require("http");
var path = require("path");
var fs = require("fs");

console.log("Starting web server at " + ip + ":" + port);

http.createServer(function (req, res) {

    var now = new Date();

    var filename = req.url || "index.html";
    var ext = path.extname(filename);
    var localPath = __dirname;
    localPath += filename;
    var validExtensions = {
        ".html": "text/html",
        ".js": "application/javascript",
        ".css": "text/css",
        ".txt": "text/plain",
        ".jpg": "image/jpeg",
        ".gif": "image/gif",
        ".ico": "image/ico",
        ".png": "image/png"
    };
    var isValidExt = validExtensions[ext];

    fs.exists(localPath, function (exists) {
        if (exists) {
            getFile(localPath, res, isValidExt);
        } else {
            console.log("File not found: " + localPath);
            res.writeHead(404);
            res.end();
        }
    });


}).listen(port, ip);

function getFile(localPath, res, mimeType) {
    fs.readFile(localPath, function (err, contents) {
        if (!err) {
            res.setHeader("Content-Length", contents.length);
            res.setHeader("Content-Type", mimeType);
            res.statusCode = 200;
            res.end(contents);
        } else {
            res.writeHead(500);
            res.end();
        }
    });
}