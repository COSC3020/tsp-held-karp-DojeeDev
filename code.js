function tsp_hk(distance_matrix) {
  var city_arr = Object.keys(distance_matrix);
  var start = city_arr[0];
  var cities = new Set(city_arr);

  var minTour = Infinity;

  for (c of cities) {
    minTour = Math.min(minTour, heldKarp(cities, c, distance_matrix));
  }
  return minTour;
}

function heldKarp(cities, start, dm) {
  if (cities.size <= 2) {
    for (c of cities) {
      if (c != start) { return dm[start][c]; }
    }
    return 0;
  }

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
  return heldKarp(nextCities, city, dm) + minDis;
}
