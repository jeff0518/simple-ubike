import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GoogleMap, MarkerF, Circle } from "@react-google-maps/api";
import Search from "../search/Search";
import { getYouBike2Data } from "../utils/api/getYouBikeAPI";
import Modal from "../modal/Modal";
import locationPerson from "../../public/images/location.png";

import style from "./Map.module.scss";
import { redirect } from "next/dist/server/api-utils";

export function debounce(fn, delay = 500) {
  let timer;

  return (...args) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

function Map() {
  //設定預設中心點（台北101）
  const defaultCenter = useMemo(
    () => ({ lat: 25.033671, lng: 121.564427 }),
    []
  );

  const mapRef = useRef();
  const [time, setTime] = useState(null);
  //設定計算路線所需 state
  const [destination, setDestination] = useState();
  const [directionsResponse, setDirectionsResponse] = useState(null);
  //設定使用者現在位置
  const [currentPosition, setCurrentPosition] = useState(defaultCenter);
  //設定回到原點，在<GoogleMap>設定 onLoad={(map) => setMap(map)}
  const [map, setMap] = useState(/** @type google.maps.Map  */ (null));
  const [isShowModal, setIsShowModal] = useState(false);
  const [clickData, setClickData] = useState();

  // 抓取資料
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    getYouBike2Data().then((data) => {
      setPlaces(data);
    });
  }, []);

  const iconLocation = {
    url: "/images/location.png",
    scaledSize: { width: 36, height: 36 },
  };

  const iconBike = {
    url: "https://icon-library.com/images/cycling-icon-png/cycling-icon-png-15.jpg",
    scaledSize: { width: 36, height: 36 },
  };

  //過濾掉1公里外的站點
  // const filteredMarkers = places.filter((marker) => {
  //   const markerDistance =
  //     google.maps.geometry.spherical.computeDistanceBetween(
  //       new google.maps.LatLng(currentPosition),
  //       new google.maps.LatLng(marker.lat, marker.lng)
  //     );

  //   return markerDistance < 1000;
  // });

  //返回預設位子或是使用者現在位子
  const panToCurrentCenterHandle = () => {
    map.panTo(currentPosition);
  };

  const panToDestinationHandle = (newValue) => {
    map.panTo(newValue);
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
        setDestination({ lat: newCenter.lat(), lng: newCenter.lng() });
      }
    }, 500);
    setTime(newTime);
  };

  // 點擊Marker
  const showModalHandler = (props) => {
    setIsShowModal(true);
    setClickData(props);
  };

  // 關閉資訊欄
  const delShowModalHandler = () => {
    setIsShowModal(false);
    setClickData("");
  };

  // 拿取當前使用者位子
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        console.log("無法顯示或拒絕定位");
        setCurrentPosition(defaultCenter);
      }
    );
  }, []);

  return (
    <>
      <div className={style.content}>
        <Search
          currentCenter={panToCurrentCenterHandle}
          changeDestination={changeDestinationHandle}
          currentPosition={currentPosition}
          setDirectionsResponse={setDirectionsResponse}
          panToDestination={panToDestinationHandle}
        />
        {/* zoom負責縮放、center地圖中心 */}
        <GoogleMap
          zoom={16}
          center={currentPosition}
          options={options}
          mapContainerClassName={style.map_container}
          onLoad={onLoad}
          onCenterChanged={centerChangeHandler}
        >
          {/* react18要改用MarkerF不能用Marker */}
          <MarkerF position={currentPosition} icon={iconLocation} />
          {places.map((data) => {
            let amount = null;
            if (data.sbi > 3) {
              amount = true;
            } else {
              amount = false;
            }
            return (
              <MarkerF
                key={data.sno}
                position={{ lat: data.lat, lng: data.lng }}
                onClick={() => showModalHandler(data)}
                icon={
                  amount
                    ? iconBike
                    : {
                        url: "/images/bike.png",
                        scaledSize: { width: 36, height: 36 },
                      }
                }
              />
            );
          })}
          {isShowModal && (
            <Modal data={clickData} onClose={delShowModalHandler} />
          )}
          {directionsResponse && (
            <>
              <MarkerF
                position={destination}
                icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
              />
              <Circle
                center={destination}
                radius={500}
                options={closeOptions}
              />
            </>
          )}
          {/* 顯示從Ａ到Ｂ的路線 */}
          {/* {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )} */}
        </GoogleMap>
      </div>
    </>
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
