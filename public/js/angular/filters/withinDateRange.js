/*
 * filter which will return the
 * results which lies within the date range
 * use selected.
 */
helloExpress.filter('withinDateRange', function() {

  return function(items, dates) {
    console.log('dates are -- ' +dates+'and dates length is  '+dates.length);
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
  console.log('filtering with from')
  var ary = [];
  var fromDate = new Date(from)
  items.forEach(function(match) {
    var matchDate = new Date(match.when)
    if(matchDate >= fromDate)
      ary.push(match)
  })
  console.log('returning ary length is ' +ary.length)
  return ary;
}

function fromTo(items, dates) {
  console.log('filtering with from and to')
  var ary= [];
  var from  = new Date(dates[0])
  var to = new Date(dates[1])
  items.forEach(function(match) {
    var matchDate = new Date(match.when)
    if(matchDate >= from && matchDate <= to)
      ary.push(match);
  })
  console.log('returning ary length is ' +ary.length)
  return ary;
}
