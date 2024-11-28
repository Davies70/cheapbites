'use client';

import { useEffect, useState } from 'react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { ReturnedPlace } from '@/types/places';
import TrendingPlaceCard from './trending-place-card';

interface RecommendationsProps {
  quizAnswers: string[];
  dietaryPreferences: string[];
  userLocation: { lat: number; lon: number };
  onChangePreferences: () => void;
}

const Recommendations = ({
  quizAnswers,
  dietaryPreferences,
  userLocation,
  onChangePreferences,
}: RecommendationsProps) => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<ReturnedPlace[]>([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await fetch(
          `api/recommendations/${userLocation.lat}/${
            userLocation.lon
          }/${quizAnswers[0].toLowerCase()}/${dietaryPreferences
            .join(',')
            .toLowerCase()
            .replace('-', '')}`
        );
        const data = await res.json();
        setRecommendations(data.places);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        setError('Failed to fetch recommendations');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, [userLocation, quizAnswers, dietaryPreferences]);

  if (error) {
    return (
      <Alert variant='destructive' className='mt-12'>
        <AlertCircle className='h-4 w-4' />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (isLoading || recommendations.length === 0) {
    return (
      <div className='mt-12 flex items-center justify-center'>
        <Loader2 className='h-8 w-8 animate-spin text-primary' />
        <span className='ml-2 text-lg font-medium'>
          Loading places based on your preferences...
        </span>
      </div>
    );
  }

  return (
    <div className='mt-12'>
      <h2 className='text-2xl font-semibold mb-4'>Based on your preferences</h2>
      <ScrollArea className='w-full whitespace-nowrap rounded-md border custom-scrollbar'>
        <div className='flex w-max space-x-4 p-4'>
          {recommendations.map((place) => (
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
        <ScrollBar
          orientation='horizontal'
          className='custom-scrollbar-thumb'
        />
      </ScrollArea>
    </div>
  );
};

export default Recommendations;
