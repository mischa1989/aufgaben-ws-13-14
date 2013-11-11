(function chat(io) {
    "use strict";

    var socket = io.connect(),
        chatInput = document.getElementById("chat-input"),
        chatContainer = document.getElementById("chat"),
        me;

    socket.on("initial messages", function (users, messages) {
        messages.forEach(function forEachMessage(message) {
            renderMessage(users[message.senderId].name, message.text);
        });
    });

    socket.on("remote message", renderMessage);

    socket.on("me", function onMe(user) {
        document.body.className ="is-ready";
        me = user;
    });

    chatInput.addEventListener("keyup", function onKeyUp(event) {
        var message;

        if (event.keyIdentifier === "Enter" || event.keyCode === 13) {
            message = chatInput.value;
            socket.emit("message", me.id, message);
            chatInput.value = "";
            renderMessage(me.name, message);
        }
    });

    function renderMessage(userName, message) {
        var p = document.createElement("p");

        // never do this in production code!!
        // @see http://en.wikipedia.org/wiki/Cross-site_scripting
        p.innerHTML = "<strong>" + userName + "</strong>&nbsp;" + message;

        chatContainer.insertBefore(p, chatInput);
    }
})(io);