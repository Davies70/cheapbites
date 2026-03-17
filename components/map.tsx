"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import Map, { Marker, Popup, Source, Layer, MapRef } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { FSQPlace, Coordinates } from "@/types/places";
import { ExternalLink, MapPin } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface MapProps {
  center: Coordinates;
  zoom: number;
  places: FSQPlace[];
  distance: number;
  onPlaceClick: (placeId: string) => void;
  selectedPlaceId?: string;
  handlePlaceView: (placeId: string) => void;
}

const createGeoJSONCircle = (
  center: Coordinates,
  radiusInKm: number,
  points = 64,
) => {
  const distanceX =
    radiusInKm / (111.32 * Math.cos((center.latitude * Math.PI) / 180));
  const distanceY = radiusInKm / 110.574;
  const ret = [];
  for (let i = 0; i < points; i++) {
    const theta = (i / points) * (2 * Math.PI);
    const x = distanceX * Math.cos(theta);
    const y = distanceY * Math.sin(theta);
    ret.push([center.longitude + x, center.latitude + y]);
  }
  ret.push(ret[0]);
  return {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: { type: "Polygon", coordinates: [ret] },
        properties: {},
      },
    ],
  };
};

export default function DiscoveryMap({
  center,
  zoom,
  places,
  distance,
  onPlaceClick,
  selectedPlaceId,
  handlePlaceView,
}: MapProps) {
  const [popupInfo, setPopupInfo] = useState<FSQPlace | null>(null);

  // 1. Create a reference to the map
  const mapRef = useRef<MapRef>(null);

  const circleGeoJSON = useMemo(
    () => createGeoJSONCircle(center, distance),
    [center, distance],
  ) as any;

  // 2. Add an effect that "flies" the camera to the selected place
  useEffect(() => {
    if (selectedPlaceId) {
      const place = places.find((p) => p.fsq_place_id === selectedPlaceId);
      if (place && place.latitude && place.longitude) {
        mapRef.current?.flyTo({
          center: [place.longitude, place.latitude],
          zoom: 16,
          duration: 1500, // Smooth 1.5 second animation
          essential: true,
        });
        setPopupInfo(place); // Auto-open the popup!
      }
    }
  }, [selectedPlaceId, places]);

  return (
    <Map
      ref={mapRef} // 3. Attach the ref to the Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      initialViewState={{
        longitude: center.longitude || 0,
        latitude: center.latitude || 0,
        zoom: zoom > 20 ? 14 : zoom,
        pitch: 45,
        bearing: 0,
      }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      style={{ width: "100%", height: "100%" }}
    >
      {/* Search Radius */}
      <Source id="search-radius" type="geojson" data={circleGeoJSON}>
        <Layer
          id="radius-fill"
          type="fill"
          paint={{ "fill-color": "#f97015", "fill-opacity": 0.05 }}
        />
        <Layer
          id="radius-outline"
          type="line"
          paint={{
            "line-color": "#f97015",
            "line-width": 2,
            "line-opacity": 0.5,
          }}
        />
      </Source>

      {/* User Location (Pulsing Dot) - Now it stays put! */}
      {center.latitude !== 0 && (
        <Marker
          longitude={center.longitude}
          latitude={center.latitude}
          anchor="center"
        >
          <div className="relative flex h-6 w-6 items-center justify-center">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500 border-2 border-white shadow-md"></span>
          </div>
        </Marker>
      )}

      {/* Restaurant Markers */}
      {places.map((place) => {
        const isSelected = place.fsq_place_id === selectedPlaceId;
        return (
          <Marker
            key={place.fsq_place_id}
            longitude={place.longitude}
            latitude={place.latitude}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              onPlaceClick(place.fsq_place_id);
            }}
          >
            <div
              className={`cursor-pointer transition-all duration-300 ${isSelected ? "scale-125 -translate-y-2" : "scale-100 hover:scale-110"}`}
            >
              <div className="relative drop-shadow-md">
                <MapPin
                  size={isSelected ? 40 : 32}
                  className={
                    isSelected
                      ? "text-primary fill-primary"
                      : "text-gray-800 fill-white"
                  }
                />
              </div>
            </div>
          </Marker>
        );
      })}

      {/* Popup */}
      {popupInfo && (
        <Popup
          anchor="bottom"
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          onClose={() => setPopupInfo(null)}
          className="z-50 rounded-xl overflow-hidden shadow-2xl"
          maxWidth="280px"
          offset={40}
        >
          <div className="flex flex-col gap-2 p-1">
            <h3 className="text-sm font-bold text-gray-900 truncate">
              {popupInfo.name}
            </h3>
            <div className="relative w-full h-28 rounded-md overflow-hidden bg-gray-100">
              <Image
                src={
                  popupInfo.categories[0]?.icon
                    ? `${popupInfo.categories[0].icon.prefix}bg_64${popupInfo.categories[0].icon.suffix}`
                    : "/placeholder-place.png"
                }
                alt={popupInfo.name}
                fill
                className="object-cover"
              />
            </div>
            <Button
              size="sm"
              className="w-full mt-1"
              onClick={() => handlePlaceView(popupInfo.fsq_place_id)}
            >
              View Place
            </Button>
          </div>
        </Popup>
      )}
    </Map>
  );
}
