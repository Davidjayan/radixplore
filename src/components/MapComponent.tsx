import React, { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
  useMap,
} from "react-leaflet";
import { Icon } from "leaflet";
import { OpenWeatherModal } from "./Modals/OpenWeatherModal";
function LocationMarker({ pos }: { pos: any }) {
  const [position, setPosition] = useState<any>(null);

  const openWeatherModalRef = useRef<any>();
  const map = useMap();
  const mapEvents = useMapEvents({
    click(e) {
      if (e.originalEvent.shiftKey) {
        // mapEvents.flyTo(e.latlng, mapEvents.getZoom());
        openWeatherModalRef.current.setPosition([e.latlng.lat, e.latlng.lng]);
        openWeatherModalRef.current.handleOpen();
      }
    },
    locationfound(e) {
      setPosition(e.latlng);
      console.log(e.latlng);

      mapEvents.flyTo(e.latlng, mapEvents.getZoom());
    },
  });
  useEffect(() => {
    if (pos) {
      setPosition(pos);
      map.whenReady(() => {
        map.flyTo({ lat: pos[0], lng: pos[1] }, map.getZoom());
        // map.locate();
      });
    }
  }, [pos]);

  return (
    <>
      <OpenWeatherModal ref={openWeatherModalRef} />
      {position && (
        <>
          <Marker
            zIndexOffset={99999999}
            position={position}
            icon={
              new Icon({
                iconUrl:
                  "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
              })
            }
          >
            <Popup>You are here</Popup>
          </Marker>
        </>
      )}
    </>
  );
}
export const MapComponent = ({ position }: { position?: any }) => {
  return (
    <MapContainer
      center={position ?? [51.505, -0.09]}
      zoom={13}
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        borderRadius: 20,
        outline: "none",
      }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker pos={position} />
    </MapContainer>
  );
};
