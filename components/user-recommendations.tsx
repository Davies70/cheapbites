'use client';

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import TrendingPlaceCard from './trending-place-card';
import { ReturnedPlace } from '@/types/places';
import { Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface UserRecommendationsProps {
  recommendations: ReturnedPlace[];
  onChangePreferences: () => void;
  error: string | null;
  isLoading: boolean;
}

const UserRecommendations = ({
  recommendations,
  onChangePreferences,
  error,
  isLoading,
}: UserRecommendationsProps) => {
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
          Loading places based on your preferences...
        </span>
      </div>
    );
  }

  return (
    <div className='mt-12'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-2 sm:space-y-0'>
        <h2 className='text-xl sm:text-2xl font-semibold'>
          Your Personalized Recommendations
        </h2>
        <Button
          onClick={onChangePreferences}
          variant='outline'
          className='w-full sm:w-auto'
        >
          Change Preferences
        </Button>
      </div>
      <ScrollArea className='w-full whitespace-nowrap rounded-md border custom-scrollbar'>
        <div className='flex w-max space-x-4 p-4'>
          {recommendations.map((place: ReturnedPlace) => (
            <div key={place.id} className='w-40 sm:w-72 flex-shrink-0'>
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

export default UserRecommendations;
