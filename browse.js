// declare the map variable
var map;

// create the map and PlacesService objects when the page loads
window.onload = function() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 32.715736, lng: -117.161087},
    zoom: 15
  });

  placesService = new google.maps.places.PlacesService(map);

  // add event listener for the search form
  var form = document.getElementById('search-form');
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    console.log("search button was clicked");
    var query = document.getElementById('search-input').value;

    var request = {
      query: query,
      type: ['restaurant', 'tourist_attraction', 'lodging']
    };

    // use the PlacesService object to search for places
    placesService.textSearch(request, function(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        // process the search results
        var searchResults = document.getElementById('search-results');
        searchResults.innerHTML = '';

        // create a new bounds object
        var bounds = new google.maps.LatLngBounds();

        for (var i = 0; i < results.length; i++) {
          var place = results[i];
          var name = place.name;
          var address = place.formatted_address;
          var photo = place.photos ? place.photos[0].getUrl({maxWidth: 100, maxHeight: 100}) : '';

          // create a new div for the place
          var placeDiv = document.createElement('div');
          placeDiv.classList.add('place');
          placeDiv.setAttribute('data-place-id', place.place_id);

          // add an event listener to the div
          placeDiv.addEventListener('click', function() {
            // get the place details and display them in an info window
            var placeId = this.getAttribute('data-place-id');
            var request = {
              placeId: placeId,
              fields: ['name', 'formatted_address', 'formatted_phone_number', 'website', 'photos']
            };
            placesService.getDetails(request, function(place, status) {
              if (status === google.maps.places.PlacesServiceStatus.OK) {
                var content = '<div>' +
                  '<h3>' + place.name + '</h3>' +
                  '<p>' + place.formatted_address + '</p>' +
                  '<p>' + place.formatted_phone_number + '</p>' +
                  '<p><a href="' + place.website + '">' + place.website + '</a></p>' +
                  '<img src="' + place.photos[0].getUrl({maxWidth: 400}) + '">' +
                  '</div>';
                var infoWindow = new google.maps.InfoWindow({
                  content: content
                });
                infoWindow.open(map, marker);
              }
            });
          });

          // add the HTML for the place to the div
          placeDiv.innerHTML = '<h3>' + name + '</h3>' +
            '<p>' + address + '</p>' +
            '<img src="' + photo + '">';

          // add the div to the search results
          searchResults.appendChild(placeDiv);

          // extend the bounds to include this place's location
          bounds.extend(place.geometry.location);
        }

        // fit the map to the bounds of the search results
        map.fitBounds(bounds);

        map.setZoom(13);
      }
    });
  });
};
