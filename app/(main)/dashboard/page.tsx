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
import { Button } from '@/components/ui/button';
import { Bookmark, MapPin, Clock, Utensils } from 'lucide-react';

// Mock data (replace with actual API calls in a real application)
const savedRestaurants = [
  {
    id: 1,
    name: 'Tasty Bites',
    cuisine: 'American',
    address: '123 Main St, Cityville',
  },
  {
    id: 2,
    name: 'Sushi Haven',
    cuisine: 'Japanese',
    address: '456 Oak Ave, Townsburg',
  },
  {
    id: 3,
    name: 'Pasta Paradise',
    cuisine: 'Italian',
    address: '789 Elm Rd, Villageton',
  },
];

const pastReviews = [
  {
    id: 1,
    restaurantName: 'Burger Bliss',
    rating: 5,
    review: 'Amazing burgers! The patties were juicy and flavorful.',
    timestamp: '2023-05-15T14:30:00Z',
  },
  {
    id: 2,
    restaurantName: 'Taco Town',
    rating: 4,
    review: 'Great tacos, but a bit pricey. The salsa was outstanding though.',
    timestamp: '2023-05-10T19:45:00Z',
  },
];

const recommendations: ReturnedPlace[] = [
  {
    id: '1',
    name: 'Pizza Palace',
    categories: [{ id: 'italian', name: 'Italian' }],
    address: '101 Pizza St, Cheeseville',
    distance: 1.2,
    images: [{ url: '/placeholder.svg?height=100&width=100' }],
  },
  {
    id: '2',
    name: 'Curry Corner',
    categories: [{ id: 'indian', name: 'Indian' }],
    address: '202 Spice Rd, Flavortown',
    distance: 2.5,
    images: [{ url: '/placeholder.svg?height=100&width=100' }],
  },
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

interface Category {
  id: string;
  name: string;
}

interface Image {
  url: string;
}

interface ReturnedPlace {
  id: string;
  name: string;
  categories: Category[];
  address: string;
  lat?: number;
  lon?: number;
  distance: number;
  images: Image[];
}

export default function Dashboard() {
  const [dietaryPreferences, setDietaryPreferences] = useState<string[]>([]);
  const [spiceTolerance, setSpiceTolerance] = useState(5);
  const [favoriteCuisines, setFavoriteCuisines] = useState<string[]>([]);
  const [saved, setSaved] = useState(savedRestaurants);

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

  const unsaveRestaurant = (id: number) => {
    setSaved((prev) => prev.filter((restaurant) => restaurant.id !== id));
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-6'>Personal Dashboard</h1>

      <Tabs defaultValue='saved' className='space-y-4'>
        <TabsList className='grid w-full grid-cols-4'>
          <TabsTrigger value='saved'>Saved</TabsTrigger>
          <TabsTrigger value='reviews'>Reviews</TabsTrigger>
          <TabsTrigger value='recommendations'>For You</TabsTrigger>
          <TabsTrigger value='preferences'>Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value='saved'>
          <Card>
            <CardHeader>
              <CardTitle>Saved Places</CardTitle>
              <CardDescription>Your favorite spots to revisit</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className='h-[400px] pr-4'>
                {saved.map((restaurant) => (
                  <Card key={restaurant.id} className='mb-4'>
                    <CardContent className='flex items-center justify-between p-4'>
                      <div>
                        <h3 className='font-semibold'>{restaurant.name}</h3>
                        <p className='text-sm text-muted-foreground'>
                          {restaurant.cuisine}
                        </p>
                        <p className='text-sm text-muted-foreground flex items-center mt-1'>
                          <MapPin className='w-4 h-4 mr-1' />
                          {restaurant.address}
                        </p>
                      </div>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => unsaveRestaurant(restaurant.id)}
                      >
                        <Bookmark className='w-4 h-4' />
                        Unsave
                      </Button>
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
              <ScrollArea className='h-[400px] pr-4'>
                {pastReviews.map((review) => (
                  <Card key={review.id} className='mb-4'>
                    <CardContent className='p-4'>
                      <div className='flex justify-between items-center mb-2'>
                        <h3 className='font-semibold'>
                          {review.restaurantName}
                        </h3>
                        <Badge>{review.rating} / 5</Badge>
                      </div>
                      <p className='text-sm mb-2'>{review.review}</p>
                      <p className='text-xs text-muted-foreground flex items-center'>
                        <Clock className='w-3 h-3 mr-1' />
                        {new Date(review.timestamp).toLocaleString()}
                      </p>
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
              <ScrollArea className='h-[400px] pr-4'>
                {recommendations.map((place) => (
                  <Card key={place.id} className='mb-4'>
                    <CardContent className='flex items-center p-4'>
                      <div className='w-16 h-16 mr-4 rounded-md overflow-hidden'>
                        <img
                          src={place.images[0].url}
                          alt={place.name}
                          className='w-full h-full object-cover'
                        />
                      </div>
                      <div className='flex-1'>
                        <h3 className='font-semibold'>{place.name}</h3>
                        <p className='text-sm text-muted-foreground flex items-center'>
                          <Utensils className='w-4 h-4 mr-1' />
                          {place.categories.map((cat) => cat.name).join(', ')}
                        </p>
                        <p className='text-sm text-muted-foreground flex items-center mt-1'>
                          <MapPin className='w-4 h-4 mr-1' />
                          {place.address}
                        </p>
                        <p className='text-sm text-muted-foreground mt-1'>
                          {place.distance.toFixed(1)} miles away
                        </p>
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
                          : 'secondary'
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
                          : 'secondary'
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
