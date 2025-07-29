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
import { ReturnedPlace, Coordinates, Place } from '@/types/places';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Image as ImageType } from '@/types/images';

interface MapProps {
  center: Coordinates;
  zoom: number;
  places: ReturnedPlace[];
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

// const createSvgIcon = () => {
//   const div = document.createElement('div');
//   div.innerHTML = `
//     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#21c45d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin-icon lucide-map-pin"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
//   `;

//   return new Icon({
//     iconUrl: 'data:image/svg+xml;base64,' + btoa(div.innerHTML),
//     iconSize: [24, 24],
//     iconAnchor: [12, 24],
//     popupAnchor: [0, -24],
//   });
// };

// const svgIcon = createSvgIcon();

const customIcon = new Icon({
  iconUrl: `/map-pin.png`,
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -24],
});

// Rest of your component remains the same...
const CustomPopup = ({
  place,
  onPlaceClick,
  image,
}: {
  place: ReturnedPlace;
  onPlaceClick: (placeId: string) => void;
  image: ImageType;
}) => (
  <div className='w-64 p-2'>
    <div className='flex items-center justify-between mb-2'>
      <h3 className='text-lg font-semibold'>{place.name}</h3>
    </div>
    <div className='mb-2 h-32 relative rounded-md overflow-hidden'>
      <Image
        src={
          image?.prefix
            ? `${image.prefix}300x200${image.suffix}`
            : '/placeholder-place.png'
        }
        alt={place.name}
        layout='fill'
        objectFit='cover'
        placeholder='blur'
        blurDataURL='/placeholder-place.png'
        sizes='300px'
      />
    </div>
    <p className='text-sm mb-2'>{place.address}</p>
    <div className='flex items-center justify-between'>
      <p className='text-xs text-gray-600'>
        {place.categories.map((cat) => cat.name).join(', ')}
      </p>
      <Button
        variant='outline'
        size='sm'
        className='text-xs'
        onClick={() => onPlaceClick(place.id)}
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
  // Only initialize with a default center and zoom
  const initialPosition: LatLngExpression = [
    center.latitude || 0,
    center.longitude || 0,
  ];

  return (
    <MapContainer
      center={initialPosition}
      zoom={zoom}
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={true}
    >
      {/* Keep tile layer static */}
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />

      {/* Circle showing search radius */}
      <Circle
        center={[center.latitude, center.longitude]}
        radius={distance * 1000}
        color='#f97015'
        fillOpacity={0.1}
        weight={3}
      />

      {/* Place markers */}
      {places.map((place) => (
        <Marker
          key={place.id}
          position={[
            place.geocodes?.main?.latitude ?? 0,
            place.geocodes?.main?.longitude ?? 0,
          ]}
          icon={customIcon}
        >
          <Popup>
            <CustomPopup
              place={place}
              image={place.images[0]}
              onPlaceClick={onPlaceClick}
            />
          </Popup>
        </Marker>
      ))}

      {/* Imperatively control map view changes */}
      <MapView center={[center.latitude, center.longitude]} zoom={zoom} />
    </MapContainer>
  );
}
