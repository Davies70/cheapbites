'use client';

import { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Utensils, Award, MapPin, Star } from 'lucide-react';

// Mock data for cuisines and restaurants
const allCuisines = [
  'Italian',
  'Japanese',
  'Mexican',
  'Indian',
  'Chinese',
  'Thai',
  'French',
  'Greek',
  'Spanish',
  'Vietnamese',
  'Korean',
  'Middle Eastern',
  'American',
  'Brazilian',
  'Ethiopian',
];

const restaurants = [
  {
    id: 1,
    name: 'Pasta Paradise',
    cuisine: 'Italian',
    rating: 4.5,
    location: '123 Main St',
  },
  {
    id: 2,
    name: 'Sushi Haven',
    cuisine: 'Japanese',
    rating: 4.7,
    location: '456 Oak Ave',
  },
  {
    id: 3,
    name: 'Taco Town',
    cuisine: 'Mexican',
    rating: 4.2,
    location: '789 Elm St',
  },
  {
    id: 4,
    name: 'Curry House',
    cuisine: 'Indian',
    rating: 4.6,
    location: '101 Pine Rd',
  },
  {
    id: 5,
    name: 'Wok & Roll',
    cuisine: 'Chinese',
    rating: 4.3,
    location: '202 Maple Dr',
  },
  {
    id: 6,
    name: 'Thai Spice',
    cuisine: 'Thai',
    rating: 4.4,
    location: '303 Cedar Ln',
  },
  {
    id: 7,
    name: 'Le Petit Bistro',
    cuisine: 'French',
    rating: 4.8,
    location: '404 Birch Ave',
  },
  {
    id: 8,
    name: 'Olive Grove',
    cuisine: 'Greek',
    rating: 4.1,
    location: '505 Walnut St',
  },
  {
    id: 9,
    name: 'Tapas Bar',
    cuisine: 'Spanish',
    rating: 4.5,
    location: '606 Cherry Rd',
  },
  {
    id: 10,
    name: 'Pho Delight',
    cuisine: 'Vietnamese',
    rating: 4.3,
    location: '707 Ash Ln',
  },
];

const achievements = [
  {
    id: 1,
    name: 'Culinary Novice',
    description: 'Try 3 different cuisines',
    requiredCuisines: 3,
    icon: '🍽️',
  },
  {
    id: 2,
    name: 'Flavor Explorer',
    description: 'Try 7 different cuisines',
    requiredCuisines: 7,
    icon: '🌶️',
  },
  {
    id: 3,
    name: 'Gourmet Globetrotter',
    description: 'Try 12 different cuisines',
    requiredCuisines: 12,
    icon: '🌎',
  },
  {
    id: 4,
    name: 'Master Food Adventurer',
    description: 'Try all 15 cuisines',
    requiredCuisines: 15,
    icon: '👨‍🍳',
  },
];

export default function FoodJourney() {
  const [triedCuisines, setTriedCuisines] = useState<string[]>([]);
  const [suggestedRestaurant, setSuggestedRestaurant] = useState<
    (typeof restaurants)[0] | null
  >(null);

  useEffect(() => {
    suggestRestaurant();
  }, [triedCuisines]);

  const suggestRestaurant = () => {
    const unexploredCuisines = allCuisines.filter(
      (cuisine) => !triedCuisines.includes(cuisine)
    );
    if (unexploredCuisines.length > 0) {
      const randomCuisine =
        unexploredCuisines[
          Math.floor(Math.random() * unexploredCuisines.length)
        ];
      const restaurantsOfCuisine = restaurants.filter(
        (r) => r.cuisine === randomCuisine
      );
      if (restaurantsOfCuisine.length > 0) {
        setSuggestedRestaurant(
          restaurantsOfCuisine[
            Math.floor(Math.random() * restaurantsOfCuisine.length)
          ]
        );
      } else {
        setSuggestedRestaurant(null);
      }
    } else {
      setSuggestedRestaurant(null);
    }
  };

  const markCuisineAsTried = (cuisine: string) => {
    if (!triedCuisines.includes(cuisine)) {
      setTriedCuisines([...triedCuisines, cuisine]);
    }
  };

  const getProgress = () => (triedCuisines.length / allCuisines.length) * 100;

  const getAchievements = () => {
    return achievements.filter(
      (achievement) => triedCuisines.length >= achievement.requiredCuisines
    );
  };

  return (
    <div className='container mx-auto p-4 space-y-8'>
      <h1 className='text-3xl font-bold'>Food Journey</h1>
      <p className='text-gray-600'>
        Explore new cuisines and track your culinary adventures!
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Your Progress</CardTitle>
          <CardDescription>
            Cuisines explored: {triedCuisines.length} / {allCuisines.length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={getProgress()} className='w-full' />
        </CardContent>
      </Card>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <Card>
          <CardHeader>
            <CardTitle>Suggested Restaurant</CardTitle>
            <CardDescription>Try something new!</CardDescription>
          </CardHeader>
          <CardContent>
            {suggestedRestaurant ? (
              <div className='space-y-2'>
                <h3 className='text-lg font-semibold'>
                  {suggestedRestaurant.name}
                </h3>
                <p className='text-sm text-gray-600'>
                  {suggestedRestaurant.cuisine} Cuisine
                </p>
                <div className='flex items-center space-x-2'>
                  <MapPin className='h-4 w-4 text-gray-500' />
                  <span className='text-sm'>
                    {suggestedRestaurant.location}
                  </span>
                </div>
                <div className='flex items-center space-x-2'>
                  <Star className='h-4 w-4 text-yellow-500' />
                  <span className='text-sm'>{suggestedRestaurant.rating}</span>
                </div>
              </div>
            ) : (
              <p>No new cuisines to explore. You've tried them all!</p>
            )}
          </CardContent>
          <CardFooter>
            {suggestedRestaurant && (
              <Button
                onClick={() => markCuisineAsTried(suggestedRestaurant.cuisine)}
              >
                Mark as Tried
              </Button>
            )}
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Achievements</CardTitle>
            <CardDescription>
              Unlock badges as you explore more cuisines
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-2 gap-4'>
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-lg border ${
                    triedCuisines.length >= achievement.requiredCuisines
                      ? 'bg-green-100 border-green-300'
                      : 'bg-gray-100 border-gray-300'
                  }`}
                >
                  <div className='text-2xl mb-2'>{achievement.icon}</div>
                  <h4 className='font-semibold'>{achievement.name}</h4>
                  <p className='text-sm text-gray-600'>
                    {achievement.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Explored Cuisines</CardTitle>
          <CardDescription>Your culinary passport</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex flex-wrap gap-2'>
            {allCuisines.map((cuisine) => (
              <Badge
                key={cuisine}
                variant={
                  triedCuisines.includes(cuisine) ? 'default' : 'outline'
                }
              >
                {cuisine}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
