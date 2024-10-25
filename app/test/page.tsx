'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { MapPin, Utensils, Clock, TrendingUp, Users } from 'lucide-react';
import RestaurantCard from '@/components/restuarant-card-old';

// Mock data for restaurants
const mockRestaurants = [
  {
    id: 1,
    name: 'Tasty Bites',
    cuisine: 'American',
    rating: 4.5,
    trending: true,
  },
  {
    id: 2,
    name: 'Sushi Haven',
    cuisine: 'Japanese',
    rating: 4.7,
    trending: true,
  },
  {
    id: 3,
    name: 'Pasta Paradise',
    cuisine: 'Italian',
    rating: 4.2,
    trending: false,
  },
  { id: 4, name: 'Taco Town', cuisine: 'Mexican', rating: 4.0, trending: true },
  {
    id: 5,
    name: 'Curry House',
    cuisine: 'Indian',
    rating: 4.6,
    trending: false,
  },
  {
    id: 6,
    name: 'Burger Bliss',
    cuisine: 'American',
    rating: 4.3,
    trending: true,
  },
];

// Mock data for featured collections
const featuredCollections = [
  { id: 1, name: 'Best Thai this week', image: '/placeholder.svg' },
  { id: 2, name: 'Hidden Gems', image: '/placeholder.svg' },
  { id: 3, name: 'Top-rated Italian', image: '/placeholder.svg' },
];

// Food preference quiz questions
const quizQuestions = [
  {
    question: "What's your preferred spice level?",
    options: ['Mild', 'Medium', 'Spicy', 'Extra Spicy'],
  },
  {
    question: 'How often do you try new cuisines?',
    options: ['Rarely', 'Sometimes', 'Often', 'Always'],
  },
  {
    question: "What's your favorite type of cuisine?",
    options: ['Italian', 'Asian', 'Mexican', 'American'],
  },
];

// export const mockRestaurants = [
//   {
//     fsq_id: '12345',
//     categories: [
//       {
//         id: 13065,
//         name: 'Restaurant',
//         short_name: 'Restaurant',
//         plural_name: 'Restaurants',
//         icon: {
//           prefix: 'https://foursquare.com/img/categories/food/',
//           suffix: '.png',
//         },
//       },
//     ],
//     chains: [
//       {
//         id: '1',
//         name: 'CheapEats',
//       },
//     ],
//     closed_bucket: '0',
//     distance: 150,
//     geocodes: {
//       main: {
//         latitude: 40.748817,
//         longitude: -73.985428,
//       },
//       roof: {
//         latitude: 40.748817,
//         longitude: -73.985428,
//       },
//     },
//     link: 'https://foursquare.com/v/some-restaurant',
//     location: {
//       address: '350 5th Ave',
//       country: 'US',
//       formatted_address: '350 5th Ave, New York, NY 10118',
//       locality: 'New York',
//       postcode: '10118',
//       region: 'NY',
//     },
//     name: 'Some Restaurant',
//     related_places: {},
//     timezone: 'America/New_York',
//   },
//   {
//     fsq_id: '67890',
//     categories: [
//       {
//         id: 13333,
//         name: 'Cafe',
//         short_name: 'Cafe',
//         plural_name: 'Cafes',
//         icon: {
//           prefix: 'https://foursquare.com/img/categories/food/',
//           suffix: '.png',
//         },
//       },
//     ],
//     chains: [],
//     closed_bucket: '0',
//     distance: 300,
//     geocodes: {
//       main: {
//         latitude: 40.73061,
//         longitude: -73.935242,
//       },
//       roof: {
//         latitude: 40.73061,
//         longitude: -73.935242,
//       },
//     },
//     link: 'https://foursquare.com/v/some-cafe',
//     location: {
//       address: '25 Broadway',
//       country: 'US',
//       formatted_address: '25 Broadway, New York, NY 10004',
//       locality: 'New York',
//       postcode: '10004',
//       region: 'NY',
//     },
//     name: 'Some Cafe',
//     related_places: {},
//     timezone: 'America/New_York',
//   },
// ];

export default function HomePage() {
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([]);

  const handleQuizAnswer = (answer: string) => {
    const newAnswers = [...quizAnswers, answer];
    setQuizAnswers(newAnswers);
    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      // Here you would typically send the answers to your backend
      console.log('Quiz completed:', newAnswers);
      setShowQuiz(false);
    }
  };

  const handleDietaryRestriction = (value: string) => {
    setDietaryRestrictions(
      dietaryRestrictions.includes(value)
        ? dietaryRestrictions.filter((item) => item !== value)
        : [...dietaryRestrictions, value]
    );
  };

  return (
    <div className='space-y-8'>
      <h1 className='text-3xl font-bold'>Find Your Next Meal</h1>

      {!showQuiz && (
        <Button onClick={() => setShowQuiz(true)}>
          Take Food Preference Quiz
        </Button>
      )}

      {showQuiz && (
        <Card>
          <CardHeader>
            <CardTitle>{quizQuestions[quizStep].question}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup onValueChange={handleQuizAnswer}>
              {quizQuestions[quizStep].options.map((option, index) => (
                <div key={index} className='flex items-center space-x-2'>
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
      )}

      <div>
        <h2 className='text-xl font-semibold mb-2'>Dietary Restrictions</h2>
        <div className='flex flex-wrap gap-2'>
          {['Vegan', 'Vegetarian', 'Gluten-Free', 'Halal', 'Kosher'].map(
            (restriction) => (
              <Button
                key={restriction}
                variant={
                  dietaryRestrictions.includes(restriction)
                    ? 'default'
                    : 'outline'
                }
                onClick={() => handleDietaryRestriction(restriction)}
              >
                {restriction}
              </Button>
            )
          )}
        </div>
      </div>

      <div>
        <h2 className='text-2xl font-semibold mb-4'>Trending Restaurants</h2>
        <ScrollArea className='w-full whitespace-nowrap rounded-md border'>
          <div className='flex w-max space-x-4 p-4'>
            {mockRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                name={restaurant.name}
                image='/placeholder.svg'
                categories={[restaurant.cuisine]}
                priceForTwo={0}
              />
            ))}
          </div>
          <ScrollBar orientation='horizontal' />
        </ScrollArea>
      </div>

      <div>
        <h2 className='text-2xl font-semibold mb-4'>Featured Collections</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {featuredCollections.map((collection) => (
            <Card key={collection.id} className='overflow-hidden'>
              <img
                src={collection.image}
                alt={collection.name}
                className='w-full h-40 object-cover'
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
            <p>Connect with fellow food lovers and share dining experiences.</p>
          </CardContent>
          <CardFooter>
            <Button asChild className='w-full'>
              <Link href='/social-dining'>Connect</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className='text-center'>
        <Button asChild size='lg'>
          <Link href='/map'>
            <MapPin className='mr-2 h-5 w-5' /> Find Restaurants Near Me
          </Link>
        </Button>
      </div>
    </div>
  );
}
