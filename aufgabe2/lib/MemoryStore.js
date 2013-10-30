function MemoryStore() {

}

var item = {id: String};

MemoryStore.prototype.items = new Object();
this.items [item.id] = item;

MemoryStore.prototype.add = function(newId)
{
    for (var i = 0; i < this.items.length; i++)
    {
        if (item.id === newId)
        {
            this.items[item.id] = newId;
        }
        else
        {
            new item[newId];
        }
    };
}

MemoryStore.prototype.findById = function (findId)
{

    if (this.items[findId] === null)
    {
        exports.findById = null;
    }
    else
    {
        exports.findById = items[findId];
    };
}

MemoryStore.prototype.findAll = function ()
{
    var findArr = new Array();
    for (item.id in this.items)
    {
        if (this.items.hasOwnProperty(item.id))
        {
            findArr[item.id] = item;
        }
    }
    exports.findAll = findArr;
}

MemoryStore.prototype.removeById = function (rmId)
{
    if (this.items.hasOwnProperty(rmId))
    {
        this.items[rmId] = null;
    }
}

module.exports = MemoryStore;