function MemoryStore() {
    this.items = {};
}

MemoryStore.prototype.add = function (newId, callback)
{
    this.items[newId.id] = newId;
    setImmediate(function ()
    {
        callback(null);
    });
};

MemoryStore.prototype.findById = function (findid, callback){


    if (!this.items[findid])
    {
        callback(null, null);
    }
    else
    {
        callback(null, this.items[findid]);
    }
}


MemoryStore.prototype.findAll = function (callback)
{
    var findArr = new Array();
    for ( var itemid in this.items)
    {
        if (this.items.hasOwnProperty(itemid))
        {

            findArr.push(this.items[itemid]);
        }
    }
    callback(null, findArr);
}

MemoryStore.prototype.removeById = function (rmId, callback)
{
    if (this.items.hasOwnProperty(rmId))
    {
        delete this.items[rmId];
    }
    setImmediate(function ()
    {
    callback(null, null);
    }
    );
}

module.exports = MemoryStore;