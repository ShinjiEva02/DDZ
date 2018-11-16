
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

            var markers = new L.markerClusterGroup();
		    var markersList = [];
            
            function populate() {
                for (var i = 0; i < data.length; i++) {
                    var m = new L.marker(data[i].gps)
                    .bindPopup(`<b>${data[i].name}</b><br /> <img src="${data[i].url}" alt="${data[i].name}">`).openPopup();
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
