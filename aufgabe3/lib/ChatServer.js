function ChatServer(userStore, messageStore)
{

    this.userStore = userStore;
    this.messageStore = messageStore;
}

var EventEmitter = require("events").EventEmitter;
ChatServer.prototype = Object.create (EventEmitter.prototype);

ChatServer.prototype.addUser = function (newUser, callback)
{
    this.userStore.add(newUser, callback);
    this.emit("user added", {
            user: newUser
    }
    )

}

ChatServer.prototype.removeUserById = function (UserID, callback)
{
    this.userStore.findById(UserID, function (callback, user)
    {
        if (user === null)
        {
          callback(new Error("Unknown user"))
        }
        else
        {
            this.userStore.removeById(user, callback); this.emit("user removed",
            {
                user : user
            })
        }
        setImmediate(function ()
        {
            callback(null, null);
        }); });
}

ChatServer.prototype.sendMessage = function (userId, text, callback)
{
    var user = this.userStore.findById(userId, callback);
    if (user === null)
    {
        //throw new Error("Unknown user")
        callback(new Error("Unknown user"));
    }
    else
    {
        var message =
        {
            id : Date.now(),
            senderId : userId,
            text: text
        };

        this.messageStore.add(message, callback);
        this.emit("new message", {
            sender: user,
            message: message

        })
    }
        setImmediate(function ()
        {
            callback(null, message);
        }
        );

}
ChatServer.prototype.getAllMessages = function (callback)
{
    setImmediate(function ()
    {
        callback (null, this.messageStore.findAll());
    }
    );
}

module.exports = ChatServer;