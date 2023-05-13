// declare the map variable
var map;

//create interactive map when page loads with given long and lat coordinates
window.onload = function () {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 32.715736, lng: -117.161087 },
    zoom: 15
  });

  placesService = new google.maps.places.PlacesService(map);

  //stores location based on long and lat coordinates
  var location = new google.maps.LatLng(36.1022, -115.1695);

  // Add marker to the map at the specified location
  var marker = new google.maps.Marker({
    position: location,
    map: map,
    icon: {
      url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
    }
  });


  // add event listener for when search button is pressed
  var form = document.getElementById('search-form');
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    console.log("search button was clicked");
    var query = document.getElementById('search-input').value;

    var request = {
      query: query,
      type: ['restaurant', 'tourist_attraction', 'lodging']
    };

    // usees PlacesService object to search for places
    placesService.textSearch(request, function (results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        // process the search results
        var searchResults = document.getElementById('search-results');
        searchResults.innerHTML = '';

        // create new bounds object
        var bounds = new google.maps.LatLngBounds();

        //display results with place, name, address, photo
        for (var i = 0; i < results.length; i++) {
          var place = results[i];
          var name = place.name;
          var address = place.formatted_address;
          var photo = place.photos ? place.photos[0].getUrl({ maxWidth: 100, maxHeight: 100 }) : '';

          // create new div for place
          var placeDiv = document.createElement('div');
          placeDiv.classList.add('place');
          placeDiv.setAttribute('data-place-id', place.place_id);

          // add event listener to the div
          placeDiv.addEventListener('click', function () {
            // get place details and display
            var placeId = this.getAttribute('data-place-id');
            var request = {
              placeId: placeId,
              fields: ['name', 'formatted_address', 'formatted_phone_number', 'website', 'photos']
            };

            placesService.getDetails(request, function (place, status) {
              if (status === google.maps.places.PlacesServiceStatus.OK) {
                var content = '<div>' +
                  '<h3>' + place.name + '</h3>' +
                  '<p>' + place.formatted_address + '</p>' +
                  '<p>' + place.formatted_phone_number + '</p>' +
                  '<p><a href="' + place.website + '">' + place.website + '</a></p>' +
                  '<img src="' + place.photos[0].getUrl({ maxWidth: 400 }) + '">' +
                  '</div>';
                var infoWindow = new google.maps.InfoWindow({
                  content: content
                });
                infoWindow.open(map, marker);
              }
            });
          });

          // add the HTML for result of search query
          placeDiv.innerHTML = '<h3>' + name + '</h3>' +
            '<p>' + address + '</p>' +
            '<img src="' + photo + '">';

          // add div to the search results
          searchResults.appendChild(placeDiv);

          // extend the bounds to include location
          bounds.extend(place.geometry.location);

        }

        // fit the map to the bounds of search results
        map.fitBounds(bounds);

        map.setZoom(13);

        // for sightseeing activities functionality
        function searchSightseeingActivities(location) {
          const service = new google.maps.places.PlacesService(document.createElement("div"));
          const request = {
            location: location,
            rankBy: google.maps.places.RankBy.PROMINENCE, // Sort results by prominence (importance)
            type: ["tourist_attraction", "museum", "park"], // Search for these types of places
          };
          service.nearbySearch(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              // Process the search results here and display them on the page
              console.log(results);
              var suggestions = document.getElementById('sightseeing-suggestions');
              suggestions.innerHTML = '';
              for (var i = 0; i < results.length; i++) {
                var place = results[i];
                var name = place.name;
                var address = place.vicinity;
                var photo = place.photos ? place.photos[0].getUrl({ maxWidth: 100, maxHeight: 100 }) : '';

                // create new div for the suggestion
                var suggestionDiv = document.createElement('div');
                suggestionDiv.classList.add('suggestion');

                // add the HTML for the suggestion to the div
                suggestionDiv.innerHTML = '<h3>' + name + '</h3>' +
                  '<p>' + address + '</p>' +
                  '<img src="' + photo + '">';

                // add the div to the suggestions
                suggestions.appendChild(suggestionDiv);
              }
            }
          });
        }
        searchSightseeingActivities(location);

      }
    });
  });
};
