var EventEmitter = require("events").EventEmitter;

function ChatServer(userStore, messageStore)
{
    var ChatServer,
        user = {
            id: "hans"
        };
}

ChatServer.prototype = fuction()
{
    var chatServer,
        userStore,
        messageStore;
}
//object.create(EventEmitter);

ChatServer.prototype.addUser = function(user)
{
    userStore.add(user);
}

ChatServer.prototype.removeUserById = function(id)
{
    userStore.remove(id);
}

ChatServer.prototype.sendMessage = function(id, text)
{
    TimeStamp = new Date();
    TimeStamp = Date.now();
    var Messages = new Array();
    Messages[TimeStamp]["ID"] =  id;
    Messages[TimeStamp]["Text"]= text;
    if (userStore.findById(id)!= null)
    {
        messageStore.add(Messages[TimeStamp]);
    }
    else
    {
        console.log("Unknown User");
    }

}
ChatServer.prototype.getAllMessages = function()
{
    for (i = 0; i <= messageStore.length; i++)
    {
        console.log(messageStore);
    }
}


module.exports = ChatServer;