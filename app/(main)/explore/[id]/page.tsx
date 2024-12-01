'use client';
import { useState, useEffect, useCallback } from 'react';
import { Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import { ReturnedPlace } from '@/types/places';
import { useParams, useRouter } from 'next/navigation';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import getClientLocation from '@/helpers/get-client-location';
import TrendingPlaceCard from '@/components/trending-place-card';

const codeToHeader = (id: string) => {
  switch (id) {
    case '13352':
      return 'Best Thai this week';
    case '13030':
      return 'Hidden Gems';
    case '13236':
      return 'Top-rated Italian';
    default:
      return 'Hot and Trending';
  }
};

export default function ExplorePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [places, setPlaces] = useState<ReturnedPlace[]>([]);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  const fetchPlaces = useCallback(
    async (lat: number, lon: number) => {
      try {
        const response = await fetch(`/api/places/search/${lat}/${lon}/${id}`);

        if (!response.ok) {
          throw new Error('Places not found');
        }

        const data = await response.json();
        setPlaces(data.places);
      } catch (error) {
        setError('Failed to fetch places');
      } finally {
        setIsLoading(false);
      }
    },
    [id]
  );

  useEffect(() => {
    const initializePage = async () => {
      if (!userLocation) {
        try {
          const res = await getClientLocation();
          const newLocation = { lat: res.latitude, lon: res.longitude };
          setUserLocation(newLocation);
          await fetchPlaces(newLocation.lat, newLocation.lon);
        } catch (error) {
          setError('Failed to fetch location');
          setIsLoading(false);
        }
      }
    };

    initializePage();
  }, [userLocation, fetchPlaces]);

  if (error) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <Alert variant='destructive' className='mt-12'>
          <AlertCircle className='h-4 w-4' />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader2 className='h-8 w-8 animate-spin text-primary' />
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <header className='bg-white shadow'>
        <div className='container mx-auto px-4 py-6 flex items-center justify-between'>
          <Button
            variant='ghost'
            onClick={() => router.back()}
            className='flex items-center text-gray-600 hover:text-gray-900'
          >
            <ArrowLeft className='mr-2 h-4 w-4' />
            Back
          </Button>
          <h1 className='text-3xl font-bold text-gray-900'>
            {codeToHeader(id)}
          </h1>
          <div className='w-24'></div> {/* Spacer for alignment */}
        </div>
      </header>
      <main className='container mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20'>
          {places.map((place) => (
            <TrendingPlaceCard
              key={place.id}
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
          ))}
        </div>
        {places.length === 0 && (
          <div className='text-center py-12'>
            <p className='text-xl text-gray-600'>
              No places found for this category.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
