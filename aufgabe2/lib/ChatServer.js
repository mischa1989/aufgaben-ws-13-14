ChatServer(userStore, messageStore) = function extends EventEmitter()
{

    this.userStore = userStore;
    this.messageStore = messageStore;
}

var EventEmitter = require("events").EventEmitter;

ChatServer.prototype.addUser = function (newUser)
{
    ChatServer.userStore.add(newUser);
}

ChatServer.prototype.removeUserById = function (rmUser)
{
    if (ChatServer.userStore.findById(rmUser) === null)
    {
        console.log('unknown User')
    }
    else
    {
        ChatServer.userStore.removeById(rmUser);
        this.emit(rmUser);
    }

}

ChatServer.prototype.sendMessage = function (userId, text)
{
    if (ChatServer.userStore.findById(userId) === null)
    {
        console.log('unknown User')
    }
    else
    {
        var message =
        {
            id : Date.now(),
            SenderId : userId,
            text: text
        };

        ChatServer.messageStore.add(message);
        this.emit(userId, text);
    }

}
ChatServer.prototype.getAllMessages = function ()
{
    exports.getAllMessages = ChatServer.messageStore.findAll();
}

module.exports = ChatServer;