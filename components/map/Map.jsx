import { useMemo } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

import style from "./Map.module.scss";

function Map() {
  const center = useMemo(() => ({ lat: 44, lng: -80 }));
  return (
    <GoogleMap
      zoom={10}
      center={center}
      mapContainerClassName={style.map_container}
    >
      <Marker position={center}></Marker>
    </GoogleMap>
  );
}

export default Map;
