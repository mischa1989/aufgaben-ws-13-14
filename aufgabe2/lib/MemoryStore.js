function MemoryStore() {

    this.items = {};
}

//this.items [item.id] = item;

MemoryStore.prototype.add = function(newItem)
{

            this.items[newItem.id] = newItem;
  }

MemoryStore.prototype.findById = function (findId)
{

    if (!this.items[findId])
    {
        return null;
    }
    else
    {
        //function callback(){
        return this.items[findId];
      //  }
    };
}

MemoryStore.prototype.findAll = function ()
{
    var findArr = new Array();
    for ( var itemid in this.items)
    {
        if (this.items.hasOwnProperty(itemid))
        {

            findArr.push(this.items[itemid]);
        }
    }
    return findArr;
}

MemoryStore.prototype.removeById = function (rmId)
{
    if (this.items.hasOwnProperty(rmId))
    {
        delete this.items[rmId]
    }
}

module.exports = MemoryStore;