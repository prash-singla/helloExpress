/*
 * filter which will return the
 * results which belongs to same category as passed one
 * as arg.
 */
helloExpress.filter('hasCategory', function() {

  return function(items, categories) {
    if(!category) return items;
    var arrayToReturn = [];
    items.forEach(function(match) {
      categories.forEach(function(category) {
        if(match.category == category)
          arrayToReturn.push(match);
      })
    })

    return arrayToReturn;
  }
});
