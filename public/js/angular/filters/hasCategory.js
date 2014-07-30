/*
 * filter which will return the
 * results which belongs to same category as passed one
 * as arg.
 */
helloExpress.filter('hasCategory', function() {

  return function(items, categories) {
    if(categories.length<0) return items;
    var arrayToReturn = [];
    if(items) {
      items.forEach(function(match) {
        categories.forEach(function(category) {
          if(match.category == category)
            arrayToReturn.push(match);
        })
      });
    }
    if(arrayToReturn.length > 0)
      return arrayToReturn;

      return items;
  }
});
