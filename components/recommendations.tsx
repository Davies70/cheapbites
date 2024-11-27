'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Utensils, Leaf, FlameIcon as Fire, Globe, Star } from 'lucide-react';
import { Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface RecommendationsProps {
  quizAnswers: string[];
  dietaryPreferences: string[];
  userLocation: { lat: number; lon: number };
}

const Recommendations = ({
  quizAnswers,
  dietaryPreferences,
  userLocation,
}: RecommendationsProps) => {
  const [activeTab, setActiveTab] = useState('restaurants');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        // Simulate loading
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        setError('Failed to fetch recommendations');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  // Helper function to get icon based on cuisine type
  const getCuisineIcon = (cuisine: string) => {
    switch (cuisine.toLowerCase()) {
      case 'italian':
        return '🍝';
      case 'asian':
        return '🍜';
      case 'mexican':
        return '🌮';
      case 'american':
        return '🍔';
      default:
        return '🍴';
    }
  };

  // Mock data for recommendations
  const restaurantRecommendations = [
    { name: 'Spice Haven', cuisine: 'Indian', rating: 4.5, price: '$$' },
    { name: 'Pasta Paradise', cuisine: 'Italian', rating: 4.7, price: '$$$' },
    { name: 'Green Leaf', cuisine: 'Vegan', rating: 4.3, price: '$$' },
    { name: 'Taco Town', cuisine: 'Mexican', rating: 4.6, price: '$' },
    { name: 'Sushi Sensation', cuisine: 'Japanese', rating: 4.8, price: '$$$' },
  ];

  const dishRecommendations = [
    { name: 'Spicy Tofu Stir-Fry', cuisine: 'Asian', spiceLevel: 'Medium' },
    { name: 'Vegetarian Lasagna', cuisine: 'Italian', spiceLevel: 'Mild' },
    { name: 'Chickpea Curry', cuisine: 'Indian', spiceLevel: 'Spicy' },
    {
      name: 'Grilled Portobello Burger',
      cuisine: 'American',
      spiceLevel: 'Mild',
    },
    { name: 'Vegetable Fajitas', cuisine: 'Mexican', spiceLevel: 'Medium' },
  ];

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
        <span className='ml-2 text-lg font-medium'>
          Loading places based on your preference...
        </span>
      </div>
    );
  }

  return (
    <Card className='w-full max-w-3xl mx-auto'>
      <CardHeader>
        <CardTitle className='text-2xl font-bold'>
          Your Personalized Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='restaurants'>
              <Utensils className='w-4 h-4 mr-2' />
              Restaurants
            </TabsTrigger>
            <TabsTrigger value='dishes'>
              <Leaf className='w-4 h-4 mr-2' />
              Dishes
            </TabsTrigger>
          </TabsList>
          <TabsContent value='restaurants'>
            <ScrollArea className='h-[300px] w-full rounded-md border p-4'>
              {restaurantRecommendations.map((restaurant, index) => (
                <div key={index} className='mb-4 p-4 border rounded-lg'>
                  <div className='flex justify-between items-center'>
                    <h3 className='text-lg font-semibold'>{restaurant.name}</h3>
                    <span className='text-sm text-muted-foreground'>
                      {restaurant.price}
                    </span>
                  </div>
                  <p className='text-sm text-muted-foreground'>
                    {getCuisineIcon(restaurant.cuisine)} {restaurant.cuisine}
                  </p>
                  <div className='flex items-center mt-2'>
                    <Star className='w-4 h-4 text-yellow-400 fill-current' />
                    <span className='ml-1 text-sm'>{restaurant.rating}</span>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </TabsContent>
          <TabsContent value='dishes'>
            <ScrollArea className='h-[300px] w-full rounded-md border p-4'>
              {dishRecommendations.map((dish, index) => (
                <div key={index} className='mb-4 p-4 border rounded-lg'>
                  <h3 className='text-lg font-semibold'>{dish.name}</h3>
                  <p className='text-sm text-muted-foreground'>
                    {getCuisineIcon(dish.cuisine)} {dish.cuisine}
                  </p>
                  <div className='flex items-center mt-2'>
                    <Fire className='w-4 h-4 text-red-500' />
                    <span className='ml-1 text-sm'>{dish.spiceLevel}</span>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </TabsContent>
        </Tabs>
        <div className='mt-6 flex justify-between items-center'>
          <p className='text-sm text-muted-foreground'>
            Based on your preferences: {quizAnswers.join(', ')}
            <br />
            Dietary restrictions: {dietaryPreferences.join(', ')}
          </p>
          <Button variant='outline'>
            <Globe className='w-4 h-4 mr-2' />
            Explore More
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Recommendations;
