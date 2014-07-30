/*
 * filter which will return the
 * results which lies within the date range
 * use selected.
 */
helloExpress.filiter('withinDateRange', function() {

  return function(items, dates) {
    var datesLength = dates.length
    switch(datesLength) {
      case 0:
        return items;
        break;
      case 1:
        return onlywithFrom(items, dates[0])
        break;
      case 2:
        return fromTo(items, dates)
        break;
    }
  }
});

function onlywithFrom(items, from) {
  var ary = [];
  var fromDate = new Date(from)
  items.forEach(function(match) {
    if(match.when >= fromDate)
      ary.push(match)
  })
  return ary;
}

function fromTo(items, dates) {
  var ary= [];
  var from  = new Date(dates[0])
  var to = new Date(dates[1])
  items.forEach(function(match) {
    if(match.when >= from && match.when <= to)
      ary.push(match);
  })
  return ary;
}
