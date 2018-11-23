
window.addEventListener('DOMContentLoaded', () => {
    let data,
        request = new XMLHttpRequest();
    
    request.open('GET', 'js/getClass.json');
    request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    request.send();

    request.addEventListener('readystatechange', function() {
        
        if(request.readyState == 4 && request.status == 200) {
            data = JSON.parse(request.response);
            
            var mymap = L.map('mapid').setView([53.682374, 23.835182], 13);

            L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
                maxZoom: 18,
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                id: 'mapbox.streets'
            }).addTo(mymap);
            
            //Map with more details and long load
            // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			// 	maxZoom: 18,
			// 	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Points &copy 2012 LINZ'
            // }).addTo(mymap);

            var markers = new L.markerClusterGroup();
		    var markersList = [];
            var customIcon = L.Icon.extend({
                options: {
                    shadowUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png'
                }
            });
                
            // Function for getting new default icon
            function getDefaultIcon(props) {
                return new customIcon({
                    iconUrl: props
                });
            }
            
            function populate() {
                for (var i = 0; i < data.length; i++) {
                    var m = L.marker(new L.LatLng(data[i].gps[0], data[i].gps[1]), { icon: getDefaultIcon(data[i].url) } )
                    markersList.push(m);
                    markers.addLayer(m);
                }
                return false;
            }
            
            populate();
            mymap.addLayer(markers);

            // for(let i = 0; i < data.length; i++) {
            //     L.marker(data[i].gps).addTo(mymap)
            //         .bindPopup(`<b>${data[i].name}</b><br /> <img src="${data[i].url}" alt="${data[i].name}">`).openPopup();    
            // }
            
            // var popup = L.popup()
            //     .setLatLng([53.682374, 23.835182])
            //     .setContent("I am Hrodno.")
            //     .openOn(mymap);

            // function onMapClick(e) {
            //     popup
            //         .setLatLng(e.latlng)
            //         .setContent("You clicked the map at " + e.latlng.toString())
            //         .openOn(mymap);
            // }
    
            // mymap.on('click', onMapClick);
        }
    });

    // class GPS {
    //     constructor(props) {
    //         this.name = name;
    //         this.gps = gps;
    //         this.url = url;
    //     }
    // }

});

// var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 18,
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Points &copy 2012 LINZ'
// }),
// latlng = L.latLng(-37.82, 175.24);

// var map = L.map('mapid', {center: latlng, zoom: 13, layers: [tiles]});

// var markers = L.markerClusterGroup();
// // Custom icon class without iconUrl
// var customIcon = L.Icon.extend({
// options: {
//     shadowUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png'
// }
// });


// // Function for getting new default icon
// function getDefaultIcon() {
// return new customIcon({
//     iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png'
// });
// }



// for (var i = 0; i < addressPoints.length; i++) {
// var a = addressPoints[i];
// var title = a[2];
// var marker = L.marker(new L.LatLng(a[0], a[1]), { title: title , icon: getDefaultIcon() } );
// marker.bindPopup(title);


// markers.addLayer(marker);


// }

// map.addLayer(markers);


