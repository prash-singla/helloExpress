/*
 * filter which will return the
 * results which have same as passed one
 * as arg.
 */
heloExpress.filter('inCity', function() {

  retutn function(items, city) {
    if(!city) return items;
    var arrayToReturn = [];
    for(var i=0; i<items.length, i++) {
      if(items[i].where.city == city)
        arrayToReturn.push(items[i]);
    }
    return arrayToReturn;
  }
});
