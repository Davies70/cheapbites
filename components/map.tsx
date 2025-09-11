// components/Map.tsx
'use client';

import { useEffect, useMemo, useState, memo } from 'react';
import {
  MapContainer,
  TileLayer,
  Circle,
  Marker,
  Popup,
  useMap,
} from 'react-leaflet';
import { Icon, LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FSQPlace, Coordinates } from '@/types/places';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface MapProps {
  center: Coordinates;
  zoom: number;
  places: FSQPlace[];
  distance: number;
  onPlaceClick: (placeId: string) => void;
  selectedPlaceId?: string; // 👈 add this prop
}

function MapView({ center, zoom }: { center: LatLngExpression; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

const CustomPopup = ({
  place,
  onPlaceClick,
}: {
  place: FSQPlace;
  onPlaceClick: (placeId: string) => void;
}) => (
  <div className='w-64 p-3 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow'>
    {/* Header with name + distance */}
    <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2'>
      <h3 className='text-lg font-semibold text-gray-800 truncate'>
        {place.name}
      </h3>
      {place.distance !== undefined && (
        <span className='text-xs text-gray-500 mt-1 sm:mt-0 sm:ml-2 shrink-0'>
          {place.distance < 1000
            ? `${place.distance} m away`
            : `${(place.distance / 1000).toFixed(1)} km away`}
        </span>
      )}
    </div>

    {/* Image */}
    <div className='mb-3 h-32 relative rounded-lg overflow-hidden'>
      <Image
        src={
          place.categories[0]?.icon.prefix +
          'bg_64' +
          place.categories[0]?.icon.suffix
        }
        alt={place.name}
        fill
        className='object-cover'
        placeholder='blur'
        blurDataURL='/placeholder-place.png'
        sizes='300px'
      />
    </div>

    {/* Address */}
    <p className='text-sm text-gray-700 mb-2 line-clamp-2'>
      {place.location.formatted_address}
    </p>

    {/* Footer with categories + button */}
    <div className='flex items-center justify-between'>
      <p className='text-xs text-gray-600 truncate mr-2'>
        {place.categories.map((cat) => cat.name).join(', ')}
      </p>
      <Button
        variant='outline'
        size='sm'
        className='text-xs flex items-center gap-1'
        onClick={() => onPlaceClick(place.fsq_place_id)}
      >
        <ExternalLink className='w-3 h-3' />
        View
      </Button>
    </div>
  </div>
);

const MemoMarker = memo(
  ({
    place,
    onPlaceClick,
    icon,
  }: {
    place: FSQPlace;
    onPlaceClick: (id: string) => void;
    icon: Icon;
  }) => (
    <Marker
      position={[place.latitude ?? 0, place.longitude ?? 0]}
      icon={icon}
      eventHandlers={{
        click: () => onPlaceClick(place.fsq_place_id), // 👈 highlight on marker click
      }}
    >
      <Popup>
        <CustomPopup place={place} onPlaceClick={onPlaceClick} />
      </Popup>
    </Marker>
  ),
  (prevProps, nextProps) =>
    prevProps.place.fsq_place_id === nextProps.place.fsq_place_id &&
    prevProps.icon === nextProps.icon
);

MemoMarker.displayName = 'MemoMarker';

export default function Map({
  center,
  zoom,
  places,
  distance,
  onPlaceClick,
  selectedPlaceId,
}: MapProps) {
  const initialPosition: LatLngExpression = [
    center.latitude || 0,
    center.longitude || 0,
  ];

  // Default icon
  const defaultIcon = useMemo(
    () =>
      new Icon({
        iconUrl: `/map-pin.png`,
        iconSize: [24, 24],
        iconAnchor: [12, 24],
        popupAnchor: [0, -24],
      }),
    []
  );

  // Highlight icon
  const highlightIcon = useMemo(
    () =>
      new Icon({
        iconUrl: `/green-map-pin.svg`, // 👈 upload/design a brighter/different pin
        iconSize: [32, 32], // larger
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      }),
    []
  );

  return (
    <MapContainer
      center={initialPosition}
      zoom={zoom}
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={true}
    >
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />

      <Circle
        center={[center.latitude, center.longitude]}
        radius={distance * 1000}
        color='#f97015'
        fillOpacity={0.1}
        weight={3}
      />

      {places.map((place) => (
        <MemoMarker
          key={place.fsq_place_id}
          place={place}
          icon={
            place.fsq_place_id === selectedPlaceId ? highlightIcon : defaultIcon
          }
          onPlaceClick={onPlaceClick}
        />
      ))}

      <MapView center={[center.latitude, center.longitude]} zoom={zoom} />
    </MapContainer>
  );
}
