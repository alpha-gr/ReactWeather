import * as Location from "expo-location";

export default fetchGeoLocation = async () => {
  return new Promise((resolve, reject) => {
    Location.requestForegroundPermissionsAsync()
      .then((status) => {
        if (!status.granted) {
          reject("Location permission denied");
          return; // Exit early if permission is denied
        }
        return Location.getCurrentPositionAsync({});
      })
      .then(location => {
        if (location) {
          const coords = location.coords;
          // Now chain the reverse geocoding fetch
          return fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coords.latitude}&longitude=${coords.longitude}&localityLanguage=en`);
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log("Received inverse geocoding data");
        
        let city = {};
        city.name = data["city"];
        city.latitude = data["latitude"];
        city.longitude = data["longitude"];
        city.admin1 = data["principalSubdivision"];
        city.isCurrentLocation = true;

        resolve(city); // Resolve with city data
      })
      .catch(error => {
        console.error("Error in the geolocation or reverse geocoding process:", error);
        reject("Error in geolocation or reverse geocoding");
      });
  });
};
