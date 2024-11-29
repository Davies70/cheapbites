'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Utensils, Clock, TrendingUp, Users, Search } from 'lucide-react';
import Image from 'next/image';
import FoodQuiz from '@/components/food-quiz';
import DietaryPreference from '@/components/dietary-preference';
import Recommendations from '@/components/recommendations';
import TrendingPlaces from '@/components/trending-places';
import Nav from '@/components/nav';
import getClientLocation from '@/helpers/get-client-location';
import { Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

// Mock data for featured collections
const featuredCollections = [
  { id: 13352, name: 'Best Thai this week', image: '/thai-food.jpg' },
  { id: 13030, name: 'Hidden Gems', image: '/hidden-gem.jpg' },
  { id: 13236, name: 'Top-rated Italian', image: '/italian.jpg' },
];

export default function HomePage() {
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  const [dietaryPreferences, setDietaryPreferences] = useState<string[]>([]);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lon: number;
  }>({ lat: 0, lon: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const resLocation = await getClientLocation();
        const { latitude, longitude } = resLocation;
        setUserLocation({ lat: latitude, lon: longitude });
      } catch (error) {
        setError('Failed to fetch location');
        console.error('Error fetching location:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocation();
  }, []);

  const handleQuizComplete = (answers: string[]) => {
    setQuizAnswers(answers);
    setQuizCompleted(true);
  };

  const handleDietaryPreferencesSubmit = (preferences: string[]) => {
    setDietaryPreferences(preferences);
    setShowRecommendations(true);
  };

  const handleChangePreferences = () => {
    setQuizCompleted(false);
    setShowRecommendations(false);
  };

  const hour = new Date().getHours();
  let greeting = '';
  if (hour < 12) {
    greeting = 'Good morning';
  } else if (hour < 18) {
    greeting = 'Good afternoon';
  } else {
    greeting = 'Good evening';
  }

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
      <div className='flex items-center justify-center h-screen'>
        <Loader2 className='h-8 w-8 animate-spin text-primary' />
      </div>
    );
  }

  return (
    <>
      <Nav />
      <div className='min-h-screen bg-gray-50'>
        <div className='relative h-[40vh] md:h-[50vh] bg-gradient-to-r from-primary to-primary-foreground flex items-center justify-center text-white'>
          <div className='absolute inset-0'>
            <Image
              src='/food-spread.jpg'
              alt='Delicious food spread'
              className='w-full h-full object-cover opacity-30'
              height={400}
              width={800}
              priority
            />
          </div>
          <div className='relative z-10 text-center space-y-3 md:space-y-4 px-4'>
            <h1 className='text-3xl md:text-4xl lg:text-6xl font-bold'>
              {greeting}, food explorer!
            </h1>
            <p className='text-lg md:text-xl lg:text-2xl'>
              Discover amazing local eats with CheapBites
            </p>
            <Button
              asChild
              size='lg'
              variant='secondary'
              className='px-3 py-2 text-sm md:px-4 md:py-2 md:text-base'
            >
              <Link href='/map'>
                <Search className='mr-2 h-4 w-4 md:h-5 md:w-5' /> Find Cheap
                Bites Near Me
              </Link>
            </Button>
          </div>
        </div>

        <div className='max-w-4xl mx-auto px-4 py-8'>
          <div className='flex justify-center'>
            <div className='w-full max-w-md'>
              {!showRecommendations ? (
                <>
                  {!quizCompleted && (
                    <FoodQuiz onQuizComplete={handleQuizComplete} />
                  )}
                  {quizCompleted && (
                    <DietaryPreference
                      onPreferencesSubmit={handleDietaryPreferencesSubmit}
                    />
                  )}
                </>
              ) : null}
            </div>
          </div>

          {showRecommendations && (
            <>
              <Recommendations
                quizAnswers={quizAnswers}
                userLocation={userLocation}
                dietaryPreferences={dietaryPreferences}
                onChangePreferences={handleChangePreferences}
              />
              <div className='mt-4 flex justify-center'>
                <Button onClick={handleChangePreferences} variant='outline'>
                  Change Preferences
                </Button>
              </div>
            </>
          )}

          <TrendingPlaces userLocation={userLocation} />

          <div className='mt-16'>
            <h2 className='text-2xl md:text-3xl font-bold mb-6 text-center'>
              Featured Collections
            </h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
              {featuredCollections.map((collection) => (
                <Card key={collection.id} className='overflow-hidden shadow-lg'>
                  <Image
                    src={collection.image}
                    alt={collection.name}
                    className='w-full h-48 object-cover'
                    height={400}
                    width={300}
                  />
                  <CardContent className='p-4'>
                    <h3 className='font-semibold text-lg mb-2'>
                      {collection.name}
                    </h3>
                    <Button asChild className='w-full'>
                      <Link href={`/explore/${collection.id}`}>Explore</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className='mt-16'>
            <h2 className='text-2xl md:text-3xl font-bold mb-6 text-center'>
              Explore CheapBites Features
            </h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
              {[
                {
                  title: 'Time Machine',
                  icon: Clock,
                  description:
                    'Explore restaurants from different eras and relive culinary history.',
                  link: '/time-machine',
                },
                {
                  title: 'Price Pulse',
                  icon: TrendingUp,
                  description:
                    'Track price trends and find the best deals on your favorite dishes.',
                  link: '/price-pulse',
                },
                {
                  title: 'Food Journey',
                  icon: Utensils,
                  description:
                    'Embark on a culinary adventure and discover new flavors.',
                  link: '/food-journey',
                },
                {
                  title: 'Social Dining',
                  icon: Users,
                  description:
                    'Connect with fellow food lovers and share dining experiences.',
                  link: '/social-dining',
                },
              ].map((feature, index) => (
                <Card key={index} className='shadow-md'>
                  <CardHeader>
                    <CardTitle className='flex items-center text-lg'>
                      <feature.icon className='mr-2 h-5 w-5' />
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-sm text-gray-600'>
                      {feature.description}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className='w-full'>
                      <Link href={feature.link}>Explore</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
