import { useCallback, useMemo, useRef, useState } from "react";
import {
  GoogleMap,
  MarkerF,
  Circle,
  DirectionsRenderer,
} from "@react-google-maps/api";
import Search from "../search/Search";

import style from "./Map.module.scss";

function Map() {
  const mapRef = useRef();
  const [time, setTime] = useState(null);
  //設定計算路線所需 state
  const [destination, setDestination] = useState();
  const [directionsResponse, setDirectionsResponse] = useState(null);
  //設定使用者現在位置
  const [currentPosition, setCurrentPosition] = useState();
  //設定回到原點，在<GoogleMap>設定 onLoad={(map) => setMap(map)}
  const [map, setMap] = useState(/** @type google.maps.Map  */ (null));

  //設定預設中心點（台北101）
  const defaultCenter = useMemo(
    () => ({ lat: 25.033671, lng: 121.564427 }),
    []
  );

  //返回預設位子或是使用者現在位子
  const panToDefaultCenterHandle = () => {
    map.panTo(defaultCenter);
  };

  //定義了地圖的一些選項
  const options = useMemo(
    () => ({
      disableDefaultUI: false,
      clickableIcons: false,
      zoomControl: true,
      mapTypeControl: false,
    }),
    []
  );

  // 抓取現在螢幕中心點
  const onLoad = useCallback((map) => {
    mapRef.current = map;
    setMap(map);
  }, []);

  //把search元件裡的destination回傳
  const changeDestinationHandle = (newValue) => {
    setDestination(newValue);
  };

  //更換中心點的function
  const centerChangeHandler = () => {
    if (time) {
      clearTimeout(time);
    }
    const newTime = setTimeout(() => {
      if (map) {
        const newCenter = map.getCenter();
        // console.log(newCenter.lat(), newCenter.lng());
      }
    }, 500);
    setTime(newTime);
  };

  return (
    <div className={style.content}>
      <Search
        defaultCenter={panToDefaultCenterHandle}
        changeDestination={changeDestinationHandle}
        currentPosition={currentPosition}
        setDirectionsResponse={setDirectionsResponse}
      />
      {/* zoom負責縮放、center地圖中心 */}
      <GoogleMap
        zoom={16}
        center={defaultCenter}
        options={options}
        mapContainerClassName={style.map_container}
        onLoad={(map) => setMap(map)}
        onCenterChanged={centerChangeHandler}
      >
        {/* react18要改用MarkerF不能用Marker */}
        <MarkerF position={defaultCenter} />
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
        <Circle center={defaultCenter} radius={15000} options={farOptions} />
      </GoogleMap>
      {/* <button onClick={() => map.panTo(defaultCenter)}>回到預設點</button> */}
    </div>
  );
}

export default Map;

const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
};
const closeOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.05,
  strokeColor: "#8BC34A",
  fillColor: "#8BC34A",
};
const middleOptions = {
  ...defaultOptions,
  zIndex: 2,
  fillOpacity: 0.05,
  strokeColor: "#FBC02D",
  fillColor: "#FBC02D",
};
const farOptions = {
  ...defaultOptions,
  zIndex: 1,
  fillOpacity: 0.05,
  strokeColor: "#FF5252",
  fillColor: "#FF5252",
};
