let map;

function initMap(latitude, longitude) {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: latitude, lng: longitude },
        zoom: 20
    });
}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
} else {
    alert("Geolocation is not supported by this browser.");
}

function onSuccess(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    const api_key = "AIzaSyDk-cXlHM9HQU9P_pikIEiovT8r3eG2XFI";
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${api_key}`;

    fetch(url)
        .then(response => response.json())
        .then(result => 
            {
                let details = result.results[0].components;
                let {country, postcode, province} = details;

                document.getElementById("result").innerHTML = `
                <p>Country: ${country}</p>
                <p>Postcode: ${postcode}</p>
                <p>Province: ${province}</p>`;

                initMap(latitude, longitude); // Initialize the map here
            })
}

function onError(error) {
    if (error.code === 1) {
        alert("Error: " + error.message);
    } else if (error.code === 2) {
        alert("User doesn't allow access");
    } else {
        alert("Error");
    }
}
