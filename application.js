const map = L.map('mapid').setView([48.8566, 2.3522], 12); // Zoom out a bit
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

fetch('placemarks.json')
    .then(response => response.json())
    .then(data => {
        data.forEach((placemark, index) => {
            if (placemark.coordinates) {
                const marker = L.marker([placemark.coordinates.latitude, placemark.coordinates.longitude]).addTo(map);
                marker.bindPopup(`<b>${placemark.name}</b><br>${placemark.description}`);
                //Optionnel: Choix aleatoire d'un marqueur et initialisation d'exercice
                if(index == 0){
                  map.setView([placemark.coordinates.latitude, placemark.coordinates.longitude],14);
                  document.getElementById("instruction").textContent = `Où se trouve ${placemark.name} ? Place le marqueur !`;
                  let userMarker = null;
                  map.on('click', function(e){
                      if (userMarker){
                        map.removeLayer(userMarker);
                      }
                       userMarker = L.marker(e.latlng).addTo(map);
                    });
                     document.getElementById('checkButton').addEventListener('click', function(){
                       if(userMarker){
                            const userLatLng = userMarker.getLatLng();
                            const targetLatLng = marker.getLatLng();

                            const distance = userLatLng.distanceTo(targetLatLng);

                            document.getElementById("feedback").textContent= "Distance: " + Math.round(distance) + " m";
                            if(distance < 100) {
                                document.getElementById("feedback").textContent = "Bravo, bien placé !"
                            } else {
                                document.getElementById("feedback").textContent += " Réessaye";
                            }
                        } else {
                            document.getElementById("feedback").textContent = "Veuillez placer le marqueur !";
                        }
                    });
               }

            }
        });
    });
