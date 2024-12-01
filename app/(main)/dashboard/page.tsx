'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Star } from 'lucide-react';

// Mock data (replace with actual API calls in a real application)
const savedRestaurants = [
  { id: 1, name: 'Tasty Bites', cuisine: 'American', rating: 4.5 },
  { id: 2, name: 'Sushi Haven', cuisine: 'Japanese', rating: 4.7 },
  { id: 3, name: 'Pasta Paradise', cuisine: 'Italian', rating: 4.2 },
];

const pastReviews = [
  {
    id: 1,
    restaurantName: 'Burger Bliss',
    rating: 5,
    review: 'Amazing burgers!',
  },
  {
    id: 2,
    restaurantName: 'Taco Town',
    rating: 4,
    review: 'Great tacos, but a bit pricey.',
  },
];

const recommendations = [
  { id: 1, name: 'Pizza Palace', cuisine: 'Italian', rating: 4.6 },
  { id: 2, name: 'Curry Corner', cuisine: 'Indian', rating: 4.8 },
];

const cuisines = [
  'Italian',
  'Japanese',
  'Mexican',
  'Indian',
  'American',
  'Thai',
  'Chinese',
  'French',
];

export default function Dashboard() {
  const [dietaryPreferences, setDietaryPreferences] = useState<string[]>([]);
  const [spiceTolerance, setSpiceTolerance] = useState(5);
  const [favoriteCuisines, setFavoriteCuisines] = useState<string[]>([]);

  useEffect(() => {
    // Fetch user data here in a real application
  }, []);

  const toggleDietaryPreference = (preference: string) => {
    setDietaryPreferences((prev) =>
      prev.includes(preference)
        ? prev.filter((p) => p !== preference)
        : [...prev, preference]
    );
  };

  const toggleFavoriteCuisine = (cuisine: string) => {
    setFavoriteCuisines((prev) =>
      prev.includes(cuisine)
        ? prev.filter((c) => c !== cuisine)
        : [...prev, cuisine]
    );
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-6'>Personal Dashboard</h1>

      <Tabs defaultValue='saved' className='space-y-4'>
        <TabsList>
          <TabsTrigger value='saved'>Saved Restaurants</TabsTrigger>
          <TabsTrigger value='reviews'>Past Reviews</TabsTrigger>
          <TabsTrigger value='recommendations'>Recommendations</TabsTrigger>
          <TabsTrigger value='preferences'>Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value='saved'>
          <Card>
            <CardHeader>
              <CardTitle>Saved Places</CardTitle>
              <CardDescription>Your favorite spots to revisit</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className='h-[400px]'>
                {savedRestaurants.map((restaurant) => (
                  <Card key={restaurant.id} className='mb-4'>
                    <CardContent className='flex items-center p-4'>
                      <div className='flex-1'>
                        <h3 className='font-semibold'>{restaurant.name}</h3>
                        <p className='text-sm text-muted-foreground'>
                          {restaurant.cuisine}
                        </p>
                      </div>
                      <div className='flex items-center'>
                        <Star className='w-4 h-4 text-yellow-400 mr-1' />
                        <span>{restaurant.rating}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='reviews'>
          <Card>
            <CardHeader>
              <CardTitle>Past Ratings and Reviews</CardTitle>
              <CardDescription>
                Your thoughts on places you've visited
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className='h-[400px]'>
                {pastReviews.map((review) => (
                  <Card key={review.id} className='mb-4'>
                    <CardContent className='p-4'>
                      <div className='flex justify-between items-center mb-2'>
                        <h3 className='font-semibold'>
                          {review.restaurantName}
                        </h3>
                        <div className='flex items-center'>
                          <Star className='w-4 h-4 text-yellow-400 mr-1' />
                          <span>{review.rating}</span>
                        </div>
                      </div>
                      <p className='text-sm'>{review.review}</p>
                    </CardContent>
                  </Card>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='recommendations'>
          <Card>
            <CardHeader>
              <CardTitle>Personalized Recommendations</CardTitle>
              <CardDescription>Places we think you'll love</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className='h-[400px]'>
                {recommendations.map((restaurant) => (
                  <Card key={restaurant.id} className='mb-4'>
                    <CardContent className='flex items-center p-4'>
                      <div className='flex-1'>
                        <h3 className='font-semibold'>{restaurant.name}</h3>
                        <p className='text-sm text-muted-foreground'>
                          {restaurant.cuisine}
                        </p>
                      </div>
                      <div className='flex items-center'>
                        <Star className='w-4 h-4 text-yellow-400 mr-1' />
                        <span>{restaurant.rating}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='preferences'>
          <div className='grid gap-4 md:grid-cols-2'>
            <Card>
              <CardHeader>
                <CardTitle>Dietary Preferences</CardTitle>
                <CardDescription>Manage your dietary needs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='flex flex-wrap gap-2'>
                  {[
                    'Vegetarian',
                    'Vegan',
                    'Gluten-Free',
                    'Dairy-Free',
                    'Nut-Free',
                    'Halal',
                    'Kosher',
                  ].map((preference) => (
                    <Badge
                      key={preference}
                      variant={
                        dietaryPreferences.includes(preference)
                          ? 'default'
                          : 'outline'
                      }
                      className='cursor-pointer'
                      onClick={() => toggleDietaryPreference(preference)}
                    >
                      {preference}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Spice Tolerance</CardTitle>
                <CardDescription>
                  Set your preferred spice level
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Slider
                  value={[spiceTolerance]}
                  onValueChange={(value) => setSpiceTolerance(value[0])}
                  max={10}
                  step={1}
                  className='mb-2'
                />
                <div className='flex justify-between text-sm'>
                  <span>Mild</span>
                  <span>Medium</span>
                  <span>Hot</span>
                </div>
              </CardContent>
            </Card>

            <Card className='md:col-span-2'>
              <CardHeader>
                <CardTitle>Favorite Cuisines</CardTitle>
                <CardDescription>Track your preferred cuisines</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='flex flex-wrap gap-2'>
                  {cuisines.map((cuisine) => (
                    <Badge
                      key={cuisine}
                      variant={
                        favoriteCuisines.includes(cuisine)
                          ? 'default'
                          : 'outline'
                      }
                      className='cursor-pointer'
                      onClick={() => toggleFavoriteCuisine(cuisine)}
                    >
                      {cuisine}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
