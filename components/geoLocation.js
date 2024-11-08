import * as Location from "expo-location";

const fetchGeoLocation = async () => {
  try {
    const status = await Location.requestForegroundPermissionsAsync();
    if (!status.granted) {
      throw new Error("Location permission denied");
    }

    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
    const data = await response.json();

    console.log("Received inverse geocoding data");

    const city = {
      name: data.city,
      latitude: data.latitude,
      longitude: data.longitude,
      admin1: data.principalSubdivision,
      isCurrentLocation: true,
    };

    return city;
  } catch (error) {
    console.error("Error in the geolocation or reverse geocoding process:", error);
    throw new Error("Error in geolocation or reverse geocoding");
  }
};

export default fetchGeoLocation;
