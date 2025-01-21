const map = L.map('mapid').setView([48.8566, 2.3522], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// (Exemple avec un seul marqueur du fichier KML)
const targetMarker = L.marker([48.8566, 2.3522]).addTo(map);
document.getElementById("instruction").textContent="Où est la Tour Eiffel ? Place le marqueur !";

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
        const targetLatLng = targetMarker.getLatLng();

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