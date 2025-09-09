'use client';

import { useEffect, useState, useRef } from 'react';
import { FSQPlace } from '@/types/places';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import TrendingPlaceCard from '@/components/trending-place-card';
import { Loader2, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface TrendingPlacesProps {
  userLocation: { lat: number; lon: number };
}

const TrendingPlaces = ({ userLocation }: TrendingPlacesProps) => {
  const [trendingPlaces, setTrendingPlaces] = useState<FSQPlace[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Fetch places
  useEffect(() => {
    const fetchLocationAndTrendingPlaces = async () => {
      try {
        setIsLoading(true);
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

    if (userLocation) fetchLocationAndTrendingPlaces();
  }, [userLocation]);

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
    <div className='mt-12 relative'>
      <h2 className='text-xl sm:text-2xl font-semibold mb-4'>
        Trending Places
      </h2>

      <ScrollArea className='w-full rounded-md border custom-scrollbar'>
        <div
          ref={scrollRef}
          className='flex w-max space-x-4 p-4 scroll-smooth overflow-auto'
        >
          {trendingPlaces.map((place) => (
            <div
              key={place.fsq_place_id}
              className='w-48 sm:w-72 flex-shrink-0'
            >
              <TrendingPlaceCard
                name={place.name}
                category={place.categories[0]?.name || 'Unknown'}
                priceForTwo={0}
                address={place.location.address}
                id={place.fsq_place_id}
                distance={place.distance}
                images={place.categories[0]?.icon}
              />
            </div>
          ))}
        </div>
        <ScrollBar
          orientation='horizontal'
          className='custom-scrollbar-thumb'
        />
      </ScrollArea>

      {/* Mobile swipe hint */}
      <p className='text-center text-sm text-muted-foreground mt-2 md:hidden'>
        👉 Swipe to explore more places
      </p>
    </div>
  );
};

export default TrendingPlaces;
