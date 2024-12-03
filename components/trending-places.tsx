'use client';

import { useEffect, useState } from 'react';
import { ReturnedPlace } from '@/types/places';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import TrendingPlaceCard from '@/components/trending-place-card';
import { Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface TrendingPlacesProps {
  userLocation: { lat: number; lon: number };
}

const TrendingPlaces = ({ userLocation }: TrendingPlacesProps) => {
  const [trendingPlaces, setTrendingPlaces] = useState<ReturnedPlace[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocationAndTrendingPlaces = async () => {
      try {
        const resPlaces = await fetch(
          `/api/places/trending/${userLocation?.lat}/${userLocation?.lon}`
        );
        const data = await resPlaces.json();
        if (data.places.length === 0) setError('No trending places found');
        setTrendingPlaces(data.places);
      } catch (error) {
        console.error('Error fetching location or places:', error);
        setError('Failed to fetch location or trending places');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocationAndTrendingPlaces();
  }, [isLoading, userLocation]);

  if (error) {
    return (
      <Alert variant='destructive' className='mt-12'>
        <AlertCircle className='h-4 w-4' />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (isLoading) {
    return (
      <div className='mt-12 flex items-center justify-center'>
        <Loader2 className='h-8 w-8 animate-spin text-primary' />
        <span className='ml-2 text-lg font-medium sm:text-base'>
          Loading trending places...
        </span>
      </div>
    );
  }

  return (
    <div className='mt-12'>
      <h2 className='text-xl sm:text-2xl font-semibold mb-4'>
        Trending Places
      </h2>
      <ScrollArea className='w-full whitespace-nowrap rounded-md border custom-scrollbar'>
        <div className='flex w-max space-x-4 p-4'>
          {trendingPlaces.map((place) => (
            <div key={place.id} className='w-64 sm:w-72 flex-shrink-0'>
              <TrendingPlaceCard
                name={place.name}
                category={place.categories[0].name}
                priceForTwo={0}
                address={place.address}
                id={place.id}
                latitude={place.lat}
                longitude={place.lon}
                distance={place.distance}
                images={place.images}
              />
            </div>
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
