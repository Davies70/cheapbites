'use client';

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import TrendingPlaceCard from './trending-place-card';
import { FSQPlace } from '@/types/places';
import { Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface UserRecommendationsProps {
  recommendations: FSQPlace[];
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
          {recommendations.map((place: FSQPlace) => (
            <div
              key={place.fsq_place_id}
              className='w-40 sm:w-72 flex-shrink-0'
            >
              <TrendingPlaceCard
                name={place.name}
                category={place.categories[0].name}
                priceForTwo={0}
                address={place.location.address}
                id={place.fsq_place_id}
                distance={place.distance}
                images={place.categories[0].icon}
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

export default UserRecommendations;
