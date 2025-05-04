//Asked chat gpt how to use maps for memoization
function tsp_hk(distance_matrix) {
  var city_arr = Object.keys(distance_matrix);
  var cities = new Set(city_arr);

  var memo = new Map();
  var minTour = Infinity;

  for (c of cities) {
    minTour = Math.min(minTour, heldKarp(cities, c, distance_matrix, memo));
  }
  return minTour;
}

function heldKarp(cities, start, dm, memo) {
  if (cities.size <= 2) {
    for (c of cities) {
      if (c != start) { return dm[start][c]; }
    }
    return 0;
  }

  let key = [...cities].sort().join(',') + '|' + start;
  if (memo.has(key)) { return memo.get(key); }

  var minDis = Infinity;
  var city;
  for (c of cities) {
    if (c != start) {
      var dis = dm[start][c];
      if (dis < minDis) { 
        minDis = dis; 
        city = c;
      }
    }
  }
  var nextCities = new Set(cities);
  nextCities.delete(start);

  var result = heldKarp(nextCities, city, dm, memo) + minDis;
  memo.set(key, result);
  return result;
}
