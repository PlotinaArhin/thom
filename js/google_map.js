var google;

function init() {
    // Coordinates for map center
    var myLatlng = new google.maps.LatLng(40.69847032728747, -73.9514422416687);

    var mapOptions = {
        zoom: 7,
        center: myLatlng,
        scrollwheel: false,
        styles: [
            { "featureType": "administrative.land_parcel", "elementType": "all", "stylers": [{ "visibility": "off" }] },
            { "featureType": "landscape.man_made", "elementType": "all", "stylers": [{ "visibility": "off" }] },
            { "featureType": "poi", "elementType": "labels", "stylers": [{ "visibility": "off" }] },
            { "featureType": "road", "elementType": "labels", "stylers": [{ "visibility": "simplified" }, { "lightness": 20 }] },
            { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "hue": "#f49935" }] },
            { "featureType": "road.highway", "elementType": "labels", "stylers": [{ "visibility": "simplified" }] },
            { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "hue": "#fad959" }] },
            { "featureType": "road.arterial", "elementType": "labels", "stylers": [{ "visibility": "off" }] },
            { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "visibility": "simplified" }] },
            { "featureType": "road.local", "elementType": "labels", "stylers": [{ "visibility": "simplified" }] },
            { "featureType": "transit", "elementType": "all", "stylers": [{ "visibility": "off" }] },
            { "featureType": "water", "elementType": "all", "stylers": [{ "hue": "#a1cdfc" }, { "saturation": 30 }, { "lightness": 49 }] }
        ]
    };

    var mapElement = document.getElementById('map');
    var map = new google.maps.Map(mapElement, mapOptions);

    var addresses = ['Brooklyn'];

    // Loop through addresses
    for (let x = 0; x < addresses.length; x++) {
        $.getJSON(`https://maps.googleapis.com/maps/api/geocode/json?address=${addresses[x]}&key=YOUR_API_KEYs`, null, function (data) {
            if (data.results.length > 0) {
                var p = data.results[0].geometry.location;
                var latlng = new google.maps.LatLng(p.lat, p.lng);
                new google.maps.Marker({
                    position: latlng,
                    map: map,
                    icon: 'images/loc.png' // Ensure this path is correct
                });
            } else {
                console.error(`Address not found: ${addresses[x]}`);
            }
        });
    }
}

google.maps.event.addDomListener(window, 'load', init);
