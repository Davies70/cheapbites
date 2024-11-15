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
    <div className='space-y-6 md:space-y-8'>
      <div className='relative h-[40vh] md:h-[50vh] bg-gradient-to-r from-primary to-primary-foreground flex items-center justify-center text-white my-5'>
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
              <Search className='mr-2 h-4 w-4 md:h-5 md:w-5' /> Find Cheap Bites
              Near Me
            </Link>
          </Button>
        </div>
      </div>

      <div className='max-w-6xl mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8'>
          <FoodQuiz />
          <DietaryPreference />
        </div>
        <TrendingPlaces />
        <div className='mt-8 md:mt-12'>
          <h2 className='text-xl md:text-2xl font-semibold mb-4'>
            Featured Collections
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {featuredCollections.map((collection) => (
              <Card key={collection.id} className='overflow-hidden'>
                <Image
                  src={collection.image}
                  alt={collection.name}
                  className='w-full h-32 md:h-40 object-cover'
                  height={400}
                  width={300}
                />
                <CardContent className='p-4'>
                  <h3 className='font-semibold text-base md:text-lg'>
                    {collection.name}
                  </h3>
                  <Button asChild className='mt-2 text-sm md:text-base'>
                    <Link href={`/collection/${collection.id}`}>Explore</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className='mt-8 md:mt-12'>
          <h2 className='text-xl md:text-2xl font-semibold mb-4'>
            Explore CheapBites Features
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
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
              <Card key={index}>
                <CardHeader>
                  <CardTitle className='flex items-center text-base md:text-lg'>
                    <feature.icon className='mr-2 h-4 w-4 md:h-5 md:w-5' />{' '}
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-sm md:text-base'>{feature.description}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild className='w-full text-sm md:text-base'>
                    <Link href={feature.link}>Explore</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
