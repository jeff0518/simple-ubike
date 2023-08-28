import { useCallback, useMemo, useState } from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";

import style from "./Map.module.scss";

function Map() {
  //設定使用者現在位置
  const [currentPosition, setCurrentPosition] = useState(null);
  const [showPosition, setShoePosition] = useState(false);

  //設定預設中心點（台北101）
  const defaultCenter = useMemo(
    () => ({ lat: 25.033671, lng: 121.564427 }),
    []
  );

  //定義了地圖的一些選項
  const options = useMemo(
    () => ({
      disableDefaultUI: false,
      zoomControl: true,
      mapTypeControl: false,
    }),
    []
  );

  const handleLoad = useCallback((map) => {
    mapRef.current = map;
  });
  return (
    // zoom負責縮放、center地圖中心
    <GoogleMap
      zoom={16}
      center={defaultCenter}
      options={options}
      mapContainerClassName={style.map_container}
    >
      {/* react18要改用MarkerF不能用Marker */}
      <MarkerF position={defaultCenter} />
    </GoogleMap>
  );
}

export default Map;
