function MemoryStore() {
    var MemoryStore;
}

MemoryStore.prototype.add = function(item)
{
    id: String;
    var items = new Array();
    items [item.id] = item;
}

MemoryStore.prototype.findById = function (id)
{
    //items.id = id;
    //items.item.id = id;
    if (items[id] != null)
    {

        console.log(items[id]);
    }
    else {
        console.log('null');
    }
}

MemoryStore.prototype.findAll = function ()
{
    for (var i = 0; i < items.length; i++);
    console.log(items[item.id]);
}

MemoryStore.prototype.removeById = function(id)
{
    items.splice(id,1);
}

module.exports = MemoryStore;