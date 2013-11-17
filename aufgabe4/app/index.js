"use strict";

var connect = require("connect"),
    Faker = require("Faker"),
    path = require("path"),
    MemoryStore = require("../lib/MemoryStore.js"),
    ChatServer = require("../lib/ChatServer.js"),
    fs = require("fs"),
    http = require("http");

var app = connect(),
    roomStore = new MemoryStore(),
    messageStore = new MemoryStore(),
    chatServer = new ChatServer(roomStore, messageStore),
    io,
    server;

/*************************************************
 * Hier kommen die Connect-Middlewares hin
 *************************************************/


server = http.createServer(app);    // Erzeugt eine Server-Instanz mit den Connect-Middlewares
var pathIoRoot = path.resolve(__dirname, "..", "public");
function serveFile(req, res, next) {
    var path = pathIoRoot + req.url;

    fs.exists(path, function onPathExists(result) {
        if (!result) {
            res.statusCode = 404;
            fs.createReadStream(pathIoRoot + "/404.html").pipe(res);
            return;
        }
        res.statusCode = 200;
        fs.createReadStream(path).pipe(res);
    });
}

app.use(connect.logger())
   .use(connect.static(pathIoRoot))
   .use(serveFile);

io = require("socket.io").listen(server);   // Socket.IO an den HTTP-Server binden
server.listen(3000);

io.sockets.on("connection", function onSocketConnection(socket) {
    /*************************************************
     * Hier der Code pro Client
     *************************************************/
var userName = Faker.Name.firstName(),
       user = {id : userName, name : userName};
    chatServer.addUser(user, function(err)
        {
            if (err){
            throw err;
            }
            socket.emit("me", user);
        });

    socket.on("message", function onMessageReceive(userId, text) {
        chatServer.sendMessage(userId,text, function (err)
            {
                if (err){
                    throw err;
                }
                socket.broadcast.emit("remote message", userId, text);
            }
        )

    });

});

