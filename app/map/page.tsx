'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
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
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ChevronUp,
  ChevronDown,
  Loader,
  Clock,
  ExternalLink,
} from 'lucide-react';
import PlaceCard from '@/components/place-card';
import { PlaceCardSkeleton } from '@/components/place-card-skelenton';
import { Place, Coordinates } from '@/types/places';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Image from 'next/image';

const customIcon = new Icon({
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function MapView({ center, zoom }: { center: LatLngExpression; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

function assignMood(categories: { name: string }[]): string {
  const casualCategories = [
    'Café',
    'Bar',
    'Fast Food Restaurant',
    'Burger Joint',
    'Pizza Place',
    'Ice Cream Parlor',
    'Coffee Shop',
    'Bistro',
    'Bakery',
  ];
  const fancyCategories = [
    'Steakhouse',
    'French Restaurant',
    'Seafood Restaurant',
    'Fine Dining Restaurant',
  ];
  const familyFriendlyCategories = [
    'Ice Cream Parlor',
    'Pizzeria',
    'Family Restaurant',
  ];
  const businessCategories = ['Coffee Shop', 'Business Center'];
  const romanticCategories = [
    'Fine Dining Restaurant',
    'Wine Bar',
    'Cocktail Bar',
  ];

  for (const category of categories) {
    if (romanticCategories.includes(category.name)) return 'Romantic';
    if (businessCategories.includes(category.name)) return 'Business';
    if (familyFriendlyCategories.includes(category.name))
      return 'Family-friendly';
    if (fancyCategories.includes(category.name)) return 'Fancy';
    if (casualCategories.includes(category.name)) return 'Casual';
  }

  return 'Neutral';
}

const moodTypes = [
  'All',
  'Casual',
  'Fancy',
  'Romantic',
  'Business',
  'Family-friendly',
  'Neutral',
];

export default function DiscoveryMap() {
  const router = useRouter();
  const [distance, setDistance] = useState<number>(2);
  const [center, setCenter] = useState<Coordinates>({
    latitude: 54.315,
    longitude: 10.132,
  });
  const [zoom, setZoom] = useState<number>(13);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([]);
  const [likedPlaces, setLikedPlaces] = useState<Set<string>>(new Set());
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [moodFilter, setMoodFilter] = useState<string>('All');
  const [places, setPlaces] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getPlaces = useCallback(async (latitude: number, longitude: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/places/search/${latitude}/${longitude}`
      );
      if (!response.ok) throw new Error('Failed to fetch places data');
      const data = await response.json();
      setPlaces(data.places);
      setFilteredPlaces(data.places);
    } catch (error) {
      console.error('Error fetching places:', error);
      setError('Failed to fetch places. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const getUserLocation = async () => {
      try {
        const response = await fetch('/api/geolocation');
        if (!response.ok) throw new Error('Failed to fetch user location');
        const location = await response.json();
        setCenter({
          latitude: location.latitude,
          longitude: location.longitude,
        });
        await getPlaces(location.latitude, location.longitude);
      } catch (error) {
        console.error('Error fetching user location:', error);
        setError('Failed to get your location. Using default location.');
      }
    };

    getUserLocation();
  }, [getPlaces]);

  const filterPlaces = useCallback(() => {
    const maxDistanceMeters = distance * 1000;
    return places.filter((place) => {
      const categoryMatch =
        categoryFilter === 'All' ||
        place.categories.some((cat) => cat.name === categoryFilter);
      const moodMatch =
        moodFilter === 'All' || assignMood(place.categories) === moodFilter;
      const withinDistance = place.distance <= maxDistanceMeters;
      return categoryMatch && moodMatch && withinDistance;
    });
  }, [distance, categoryFilter, moodFilter, places]);

  useEffect(() => {
    const filtered = filterPlaces();
    setFilteredPlaces(filtered);
  }, [filterPlaces]);

  const categoryTypes = useMemo(() => {
    return [
      'All',
      ...new Set(
        places?.flatMap((place) => place.categories.map((cat) => cat.name))
      ),
    ];
  }, [places]);

  const focusOnPlace = useCallback((latitude: number, longitude: number) => {
    setCenter({ latitude, longitude });
    setZoom(16);
  }, []);

  const toggleLike = useCallback((id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedPlaces((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  const CustomPopup = ({ place }: { place: Place }) => (
    <div className='w-64 p-2'>
      <div className='flex items-center justify-between mb-2'>
        <h3 className='text-lg font-semibold'>{place.name}</h3>
        {/* {place.hours?.open_now && (
          <div className='flex items-center text-green-600'>
            <Clock className='w-4 h-4 mr-1' />
            <span className='text-xs'>Open now</span>
          </div>
        )} */}
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
          onClick={() => router.push(`/places/${place.fsq_id}`)}
        >
          <ExternalLink className='w-3 h-3 mr-1' />
          View Details
        </Button>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className='w-8 h-8 animate-spin text-primary' />
      </div>
    );
  }

  return (
    <div className='relative h-screen w-full overflow-hidden'>
      {error && (
        <Alert variant='destructive' className='mb-4'>
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className='absolute inset-0 z-0 w-screen'>
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
          {filteredPlaces.map((place) => (
            <Marker
              key={place.fsq_id}
              position={[
                place.geocodes.main.latitude,
                place.geocodes.main.longitude,
              ]}
              icon={customIcon}
            >
              <Popup>
                <CustomPopup place={place} />
              </Popup>
            </Marker>
          ))}
          <MapView center={[center.latitude, center.longitude]} zoom={zoom} />
        </MapContainer>
      </div>

      <div
        className={`
          absolute bottom-0 left-0 right-0 bg-white shadow-md transition-all duration-300 ease-in-out z-10
          md:w-1/3 md:right-auto md:top-0 md:h-full
          ${isExpanded ? 'h-[80%]' : 'h-48'}
          rounded-t-3xl md:rounded-none
        `}
      >
        <div className='sticky top-0 z-20 bg-white border-b p-4 rounded-t-3xl md:rounded-none'>
          <div className='flex justify-between items-center'>
            <h2 className='text-lg font-semibold'>
              Places ({filteredPlaces.length})
            </h2>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => setIsExpanded(!isExpanded)}
              className='md:hidden'
            >
              {isExpanded ? (
                <ChevronDown className='h-6 w-6' />
              ) : (
                <ChevronUp className='h-6 w-6' />
              )}
            </Button>
          </div>
          <div className='mt-4 space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Distance:{' '}
                <span className='font-bold'>{distance.toFixed(1)} km</span>
              </label>
              <Slider
                value={[distance]}
                onValueChange={(value) => setDistance(value[0])}
                max={20}
                step={0.5}
                min={1}
              />
            </div>
            <div className='flex space-x-2'>
              <div className='flex-1'>
                <Select onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder='Category' />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryTypes.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className='flex-1'>
                <Select onValueChange={setMoodFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder='Mood' />
                  </SelectTrigger>
                  <SelectContent>
                    {moodTypes.map((mood) => (
                      <SelectItem key={mood} value={mood}>
                        {mood}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <div className='overflow-y-auto h-[calc(100%-8rem)] md:h-[calc(100%-12rem)] p-4'>
          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => (
                <PlaceCardSkeleton key={index} />
              ))
            : filteredPlaces.map((place) => (
                <PlaceCard
                  key={place.fsq_id}
                  name={place.name}
                  icon={
                    place.categories[0].icon.prefix +
                    'bg_64' +
                    place.categories[0].icon.suffix
                  }
                  category={place.categories[0].name}
                  distance={place.distance}
                  onFocus={() =>
                    focusOnPlace(
                      place.geocodes.main.latitude,
                      place.geocodes.main.longitude
                    )
                  }
                  isLiked={likedPlaces.has(place.fsq_id)}
                  onLike={(e) => toggleLike(place.fsq_id, e)}
                  mood={assignMood(place.categories)}
                  goToPage={(e) => {
                    e.stopPropagation();
                    router.push(`/places/${place.fsq_id}`);
                  }}
                />
              ))}
        </div>
      </div>
    </div>
  );
}
