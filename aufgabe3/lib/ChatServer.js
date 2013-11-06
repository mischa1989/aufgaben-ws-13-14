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
{ var that = this;
    this.userStore.findById(UserID, function (err, user)
    {
        if (user === null)
        {
          callback(new Error("Unknown user"))
        }
        else
        {
            that.userStore.removeById(UserID, function (err){
                if (err)
                {
                 callback(err);
                }
                else
                {
                    that.emit("user removed",
                    {
                        user : user
                    })
                    callback(null);
                }
            });

        }
});
}

ChatServer.prototype.sendMessage = function (userId, text, callback)
{var that = this;
 this.userStore.findById(userId, function(err, user){
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

            that.messageStore.add(message, function (err){
                that.emit("new message", {
                    sender: user,
                    message: message

                })
                callback(null, message);
            });

        }
    });


}
ChatServer.prototype.getAllMessages = function (callback)
{
    this.messageStore.findAll(callback);
}

module.exports = ChatServer;