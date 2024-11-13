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
import TrendingPlaces from '@/components/trending-places';

// Mock data for featured collections
const featuredCollections = [
  { id: 1, name: 'Best Thai this week', image: '/thai-food.jpg' },
  { id: 2, name: 'Hidden Gems', image: '/hidden-gem.jpg' },
  { id: 3, name: 'Top-rated Italian', image: '/italian.jpg' },
];

export default async function HomePage() {
  const hour = new Date().getHours();
  let greeting = '';
  if (hour < 12) {
    greeting = 'Good morning';
  } else if (hour < 18) {
    greeting = 'Good afternoon';
  } else {
    greeting = 'Good evening';
  }

  return (
    <div className='space-y-8'>
      <div className='relative h-[50vh] bg-gradient-to-r from-primary to-primary-foreground flex items-center justify-center text-white'>
        <div className='absolute inset-0'>
          <Image
            src='/food-spread.jpg'
            alt='Delicious food spread'
            className='w-full h-full object-cover opacity-30'
            height={400}
            width={800}
          />
        </div>
        <div className='relative z-10 text-center space-y-4'>
          <h1 className='text-4xl md:text-6xl font-bold'>
            {greeting}, food explorer!
          </h1>
          <p className='text-xl md:text-2xl'>
            Discover amazing local eats with CheapBites
          </p>
          <Button asChild size='lg' variant='secondary'>
            <Link href='/map'>
              <Search className='mr-2 h-5 w-5' /> Find Restaurants Near Me
            </Link>
          </Button>
        </div>
      </div>

      <div className='max-w-6xl mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <FoodQuiz />
          <DietaryPreference />
        </div>
        <TrendingPlaces />
        <div className='mt-12'>
          <h2 className='text-2xl font-semibold mb-4'>Featured Collections</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {featuredCollections.map((collection) => (
              <Card key={collection.id} className='overflow-hidden'>
                <Image
                  src={collection.image}
                  alt={collection.name}
                  className='w-full h-40 object-cover'
                  height={400}
                  width={300}
                />
                <CardContent className='p-4'>
                  <h3 className='font-semibold text-lg'>{collection.name}</h3>
                  <Button asChild className='mt-2'>
                    <Link href={`/collection/${collection.id}`}>Explore</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className='mt-12'>
          <h2 className='text-2xl font-semibold mb-4'>
            Explore CheapBites Features
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center'>
                  <Clock className='mr-2 h-5 w-5' /> Time Machine
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Explore restaurants from different eras and relive culinary
                  history.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className='w-full'>
                  <Link href='/time-machine'>Explore</Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center'>
                  <TrendingUp className='mr-2 h-5 w-5' /> Price Pulse
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Track price trends and find the best deals on your favorite
                  dishes.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className='w-full'>
                  <Link href='/price-pulse'>Analyze</Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center'>
                  <Utensils className='mr-2 h-5 w-5' /> Food Journey
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Embark on a culinary adventure and discover new flavors.</p>
              </CardContent>
              <CardFooter>
                <Button asChild className='w-full'>
                  <Link href='/food-journey'>Start Journey</Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center'>
                  <Users className='mr-2 h-5 w-5' /> Social Dining
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Connect with fellow food lovers and share dining experiences.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className='w-full'>
                  <Link href='/social-dining'>Connect</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
