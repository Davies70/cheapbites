// components/Map.tsx
'use client';

import { useEffect } from 'react';
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
import { Place, Coordinates } from '@/types/places';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface MapProps {
  center: Coordinates;
  zoom: number;
  places: Place[];
  distance: number;
  onPlaceClick: (placeId: string) => void;
}

function MapView({ center, zoom }: { center: LatLngExpression; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

const customIcon = new Icon({
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const CustomPopup = ({
  place,
  onPlaceClick,
}: {
  place: Place;
  onPlaceClick: (placeId: string) => void;
}) => (
  <div className='w-64 p-2'>
    <div className='flex items-center justify-between mb-2'>
      <h3 className='text-lg font-semibold'>{place.name}</h3>
    </div>
    <div className='mb-2 h-32 relative rounded-md overflow-hidden'>
      <Image
        src={
          place.categories[0].icon.prefix +
          'bg_64' +
          place.categories[0].icon.suffix
        }
        alt={place.name}
        layout='fill'
        objectFit='cover'
      />
    </div>
    <p className='text-sm mb-2'>{place.location.formatted_address}</p>
    <div className='flex items-center justify-between'>
      <p className='text-xs text-gray-600'>
        {place.categories.map((cat) => cat.name).join(', ')}
      </p>
      <Button
        variant='outline'
        size='sm'
        className='text-xs'
        onClick={() => onPlaceClick(place.fsq_id)}
      >
        <ExternalLink className='w-3 h-3 mr-1' />
        View Details
      </Button>
    </div>
  </div>
);

export default function Map({
  center,
  zoom,
  places,
  distance,
  onPlaceClick,
}: MapProps) {
  return (
    <MapContainer
      center={[center.latitude, center.longitude]}
      zoom={zoom}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
      <Circle
        center={[center.latitude, center.longitude]}
        radius={distance * 1000}
      />
      {places.map((place) => (
        <Marker
          key={place.fsq_id}
          position={[
            place.geocodes.main.latitude,
            place.geocodes.main.longitude,
          ]}
          icon={customIcon}
        >
          <Popup>
            <CustomPopup place={place} onPlaceClick={onPlaceClick} />
          </Popup>
        </Marker>
      ))}
      <MapView center={[center.latitude, center.longitude]} zoom={zoom} />
    </MapContainer>
  );
}
