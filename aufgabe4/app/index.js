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
io = require("socket.io").listen(server);   // Socket.IO an den HTTP-Server binden
server.listen(3000);

io.sockets.on("connection", function onSocketConnection(socket) {
    /*************************************************
     * Hier der Code pro Client
     *************************************************/
});

