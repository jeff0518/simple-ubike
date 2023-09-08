import { TiDelete, TiLocationArrowOutline } from "react-icons/ti";
import { Autocomplete } from "@react-google-maps/api";

import InputUI from "../ui/inputUI/InputUI";
import ButtonUI from "../ui/buttonUI/ButtonUI";

import style from "./Search.module.scss";
import { useRef, useState } from "react";

function Search(props) {
  const {
    currentCenter,
    changeDestination,
    currentPosition,
    setDirectionsResponse,
    panToDestination,
  } = props;

  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const destinationRef = useRef();

  //抓取input內容並計算距離跟時間
  const calculateRoute = async () => {
    if (destinationRef.current.value === "") {
      return;
    }
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode(
      { address: destinationRef.current.value },
      (results, status) => {
        if (status === "OK") {
          const { location } = results[0].geometry;
          changeDestination({ lat: location.lat(), lng: location.lng() });
          panToDestination({ lat: location.lat(), lng: location.lng() });
        } else {
          alert(
            "Geocode was not successful for the following reason: " + status
          );
        }
      }
    );

    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: currentPosition,
      destination: destinationRef.current.value,
      travelMode: google.maps.TravelMode.BICYCLING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  };
  // 清除全部內容
  const clearRoute = () => {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    destinationRef.current.value = "";
  };

  return (
    <div className={style.content}>
      <div className={style.inputBox}>
        <Autocomplete>
          <InputUI
            inputId="search__destination"
            inputStyle="search"
            inputType="text"
            inputPlaceholder="Destination"
            inputRef={destinationRef}
          />
        </Autocomplete>
      </div>
      <div className={style.buttonBox}>
        <ButtonUI
          text="Calculate Route"
          btnStyle="btn__pill__small"
          onClick={calculateRoute}
        />
      </div>
      <div className={style.del}>
        <TiDelete className={style.tiDelete} size={30} onClick={clearRoute} />
      </div>
      <div className={style.distanceBox}>Distance:{distance}</div>
      <div className={style.durationBox}>Duration:{duration}</div>
      <div className={style.userCenter}>
        <TiLocationArrowOutline
          className={style.tiLocation}
          size={30}
          onClick={() => currentCenter()}
        />
      </div>
    </div>
  );
}

export default Search;
