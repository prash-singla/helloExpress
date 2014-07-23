/*
 * filter which will return the
 * results which contains same city as passed one
 * as arg.
 */
helloExpress.filter('inCity', function() {

  return function(items, city) {
    if(!city) return items;
    var arrayToReturn = [];
    for(var i=0; i<items.length; i++) {
      if(items[i].where.city == city)
        arrayToReturn.push(items[i]);
    }
    return arrayToReturn;
  }
});
