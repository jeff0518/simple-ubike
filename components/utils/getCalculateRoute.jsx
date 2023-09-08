export const getCalculateRoute = async (
  address,
  changeDestination,
  panToDestination,
  origin,
  setDirectionsResponse,
  setDistance,
  setDuration
) => {
  // const [distance, setDistance] = useState("");
  // const [duration, setDuration] = useState("");

  const geocoder = new google.maps.Geocoder();

  geocoder.geocode({ address: address }, (results, status) => {
    if (status === "OK") {
      const { location } = results[0].geometry;
      changeDestination({ lat: location.lat(), lng: location.lng() });
      panToDestination({ lat: location.lat(), lng: location.lng() });
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });

  const directionsService = new google.maps.DirectionsService();
  const results = await directionsService.route({
    origin: origin,
    destination: address,
    travelMode: google.maps.TravelMode.BICYCLING,
  });
  setDirectionsResponse(results);
  setDistance(results.routes[0].legs[0].distance.text);
  setDuration(results.routes[0].legs[0].duration.text);
};
