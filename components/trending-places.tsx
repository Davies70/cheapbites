'use client';

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import RestaurantCard from '@/components/restuarant-card-old';
import { useState, useEffect } from 'react';
import { Place } from '@/types/places';
import { data } from '../db';
import { Loader2 } from 'lucide-react';
// import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const TrendingPlaces = () => {
  const [trendingPlaces, setTrendingPlaces] = useState<Place[]>();
  const stockImages: string[] = [
    'Block-House.png',
    'Giovanni.jpg',
    'Wochenmarkt.jpg',
    'JanHein.jpg',
    'Bakeliet.jpg',
    'Lyck.jpg',
  ];

  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  const [isDefault, setIsDefault] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/geolocation', {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache',
      },
    })
      .then((res) => res.json())
      .then(({ latitude, longitude }) => {
        setUserLocation({
          lat: latitude,
          lon: longitude,
        });
        console.log('User location:', latitude, longitude);
      })
      .catch((error) => {
        console.error('Failed to fetch geolocation:', error);
      });
  }, []);

  useEffect(() => {
    if (userLocation) {
      fetch(`/api/places/trending/${userLocation.lat}/${userLocation.lon}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setTrendingPlaces(data.places);
          setIsDefault(false);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Failed to fetch trending places:', error);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
      setTrendingPlaces(data.results.slice(0, 5));
    }
  }, [userLocation]);

  if (isLoading && trendingPlaces?.length === 0) {
    return (
      <div className='mt-12 flex items-center justify-center'>
        <Loader2 className='h-8 w-8 animate-spin text-primary' />
        <span className='ml-2 text-lg font-medium'>
          Loading trending places...
        </span>
      </div>
    );
  }

  // if (error) {
  //   return (
  //     <Alert variant='destructive' className='mt-12'>
  //       <AlertCircle className='h-4 w-4' />
  //       <AlertTitle>Error</AlertTitle>
  //       <AlertDescription>{error}</AlertDescription>
  //     </Alert>
  //   );
  // }

  return (
    <div className='mt-12'>
      <h2 className='text-2xl font-semibold mb-4'>Trending Places</h2>
      <ScrollArea className='w-full whitespace-nowrap rounded-md border custom-scrollbar'>
        <div className='flex w-max space-x-4 p-4'>
          {trendingPlaces?.map((place, i) => (
            <RestaurantCard
              key={place.fsq_id}
              name={place.name}
              categories={[place.categories[0]?.name || 'Unknown']}
              priceForTwo={0}
              address={place.location.formatted_address}
              id={place.fsq_id}
              latitude={place.geocodes.roof?.latitude}
              longitude={place.geocodes.roof?.longitude}
              distance={place.distance}
              defaultImage={stockImages[i % stockImages.length]}
              isDefault={isDefault}
            />
          ))}
        </div>
        <ScrollBar
          orientation='horizontal'
          className='custom-scrollbar-thumb'
        />
      </ScrollArea>
    </div>
  );
};

export default TrendingPlaces;
