function ChatServer(userStore, messageStore)
{

    this.userStore = userStore;
    this.messageStore = messageStore;
}

var EventEmitter = require("events").EventEmitter;
ChatServer.prototype = Object.create (EventEmitter.prototype);

ChatServer.prototype.addUser = function (newUser)
{
    this.userStore.add(newUser);
    this.emit("user added", {
            user: newUser
    }
    )

}

ChatServer.prototype.removeUserById = function (UserID)
{
    var user = this.userStore.findById(UserID);
    if (user === null)
    {
        throw new Error("Unknown user")
    }
    else
    {
        this.userStore.removeById(UserID);
        this.emit("user removed", {
            user : user
        })
    }

}

ChatServer.prototype.sendMessage = function (userId, text)
{
    var user = this.userStore.findById(userId);
    if (user === null)
    {
        throw new Error("Unknown user")
    }
    else
    {
        var message =
        {
            id : Date.now(),
            senderId : userId,
            text: text
        };

        this.messageStore.add(message);
        this.emit("new message", {
            sender: user,
            message: message

        });
    }

}
ChatServer.prototype.getAllMessages = function ()
{
    return this.messageStore.findAll();
}

module.exports = ChatServer;