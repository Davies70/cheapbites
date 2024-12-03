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
import { Button } from '@/components/ui/button';
import { Bookmark, MapPin, Clock, Utensils, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { User, SavedPlace } from '@/types/user';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Loader } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);

  const { id } = useParams();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    if (!session) return;
    if (session?.user?.email) {
      setIsLoading(true);
      fetch(`/api/user/${session?.user?.email}`)
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
        })
        .catch((e) => {
          console.error('Error fetching user data:', e);
          setError('An error occurred while fetching user data');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [session, id]);

  const unsaveRestaurant = async (savedPlace: SavedPlace) => {
    setUser((prevUser) => {
      if (!prevUser) return null;
      return {
        ...prevUser,
        saved: prevUser.saved.filter((place) => place.id !== savedPlace.id),
      };
    });

    try {
      const response = await fetch(`/api/user/saved/${session?.user?.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...savedPlace,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save place');
      }
      toast({
        title: 'Place unsaved',
        description: 'This place has been removed from your saved list',
        variant: 'default',
      });
    } catch (error) {
      console.error('Error saving place:', error);
      toast({
        title: 'Error',
        description: 'An error occurred while saving the place',
        variant: 'destructive',
      });
    }
  };

  const kmorMiles = (distance: number) => {
    return distance > 1000
      ? `${(distance / 1000).toFixed(1)} km`
      : `${distance} m`;
  };

  if (error) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Alert variant='destructive' className='w-96'>
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className='w-8 h-8 animate-spin text-primary' />
      </div>
    );
  }

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-xl sm:text-2xl md:text-3xl font-bold mb-4 md:mb-6'>
        Personal Dashboard
      </h1>

      <Tabs defaultValue='saved' className='space-y-4'>
        <TabsList className='flex w-full overflow-x-auto space-x-2 p-1 md:grid md:grid-cols-4 md:gap-2'>
          <TabsTrigger value='saved' className='flex-shrink-0 px-4 py-2'>
            Saved
          </TabsTrigger>
          <TabsTrigger value='visited' className='flex-shrink-0 px-4 py-2'>
            Visited
          </TabsTrigger>
          <TabsTrigger value='reviews' className='flex-shrink-0 px-4 py-2'>
            Reviews
          </TabsTrigger>
          <TabsTrigger
            value='recommendations'
            className='flex-shrink-0 px-4 py-2'
          >
            For You
          </TabsTrigger>
          {/* <TabsTrigger value='preferences' className='flex-shrink-0 px-4 py-2'>
            Preferences
          </TabsTrigger> */}
        </TabsList>

        <TabsContent value='saved'>
          <Card>
            <CardHeader className='p-4 md:p-6'>
              <CardTitle className='text-lg md:text-xl'>Saved Places</CardTitle>
              <CardDescription className='text-sm'>
                Your favorite spots to revisit
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className='h-[400px] pr-4'>
                {user?.saved.map((restaurant) => (
                  <Card
                    key={restaurant.id}
                    className='mb-4 hover:bg-accent transition-colors'
                  >
                    <Link href={`/places/${restaurant.id}`} passHref>
                      <CardContent className='flex items-center justify-between p-4 cursor-pointer'>
                        <div className='flex-grow'>
                          <h3 className='font-semibold'>{restaurant.name}</h3>
                          <p className='text-sm text-muted-foreground'>
                            {restaurant.category}
                          </p>
                          <p className='text-sm text-muted-foreground flex items-center mt-1'>
                            <MapPin className='w-4 h-4 mr-1 flex-shrink-0' />
                            <span className='truncate'>
                              {restaurant.address}
                            </span>
                          </p>
                        </div>
                        <div className='flex items-center space-x-2 ml-2'>
                          <Button
                            variant='ghost'
                            size='sm'
                            className='p-0 h-8 w-8'
                          >
                            <ChevronRight className='w-4 h-4' />
                            <span className='sr-only'>View Details</span>
                          </Button>
                          <Button
                            variant='ghost'
                            size='sm'
                            className='p-0 h-8 w-8'
                            onClick={(e) => {
                              e.preventDefault();
                              unsaveRestaurant(restaurant);
                            }}
                          >
                            <Bookmark className='w-4 h-4' />
                            <span className='sr-only'>Unsave</span>
                          </Button>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='visited'>
          <Card>
            <CardHeader className='p-4 md:p-6'>
              <CardTitle className='text-lg md:text-xl'>
                Visited Places
              </CardTitle>
              <CardDescription className='text-sm'>
                Places you've been to
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className='h-[400px] pr-4'>
                {user?.visited.map((place) => (
                  <Card
                    key={place.id}
                    className='mb-4 hover:bg-accent transition-colors'
                  >
                    <Link href={`/places/${place.id}`} passHref>
                      <CardContent className='flex items-center justify-between p-4 cursor-pointer'>
                        <div className='flex-grow'>
                          <h3 className='font-semibold'>{place.name}</h3>
                          <p className='text-sm text-muted-foreground'>
                            {place.category}
                          </p>
                          <p className='text-sm text-muted-foreground flex items-center mt-1'>
                            <MapPin className='w-4 h-4 mr-1 flex-shrink-0' />
                            <span className='truncate'>{place.address}</span>
                          </p>
                        </div>
                        <div className='flex items-center space-x-2 ml-2'>
                          <Button
                            variant='ghost'
                            size='sm'
                            className='p-0 h-8 w-8'
                          >
                            <ChevronRight className='w-4 h-4' />
                            <span className='sr-only'>View Details</span>
                          </Button>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='reviews'>
          <Card>
            <CardHeader className='p-4 md:p-6'>
              <CardTitle className='text-lg md:text-xl'>
                Past Ratings and Reviews
              </CardTitle>
              <CardDescription className='text-sm'>
                Your thoughts on places you've visited
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className='h-[400px] pr-4'>
                {user?.reviews.map((review) => (
                  <Card key={review.placeId} className='mb-4'>
                    <CardContent className='p-4'>
                      <div className='flex justify-between items-start mb-2 flex-wrap'>
                        <h3 className='font-semibold mr-2'>{review.name}</h3>
                        <Badge>{review.rating} / 5</Badge>
                      </div>
                      <p className='text-sm mb-2'>{review.review}</p>
                      <p className='text-xs text-muted-foreground flex items-center'>
                        <Clock className='w-3 h-3 mr-1 flex-shrink-0' />
                        {new Date(review.created_at).toLocaleString()}
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
            <CardHeader className='p-4 md:p-6'>
              <CardTitle className='text-lg md:text-xl'>
                Personalized Recommendations
              </CardTitle>
              <CardDescription className='text-sm'>
                Places we think you'll love
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className='h-[400px] pr-4'>
                {user?.recommendations.length === 0 ? (
                  <p className='text-center text-muted-foreground'>
                    Change your preferences to get personalized recommendations
                  </p>
                ) : (
                  user?.recommendations.map((place) => (
                    <Card
                      key={place.id}
                      className='mb-4 hover:bg-accent transition-colors'
                    >
                      <Link href={`/places/${place.id}`} passHref>
                        <CardContent className='flex items-start p-4 cursor-pointer'>
                          <div className='w-16 h-16 mr-4 rounded-md overflow-hidden flex-shrink-0'>
                            <Image
                              src={
                                place?.images[0]?.prefix
                                  ? `${place.images[0].prefix}original${place.images[0].suffix}`
                                  : '/placeholder-place.png'
                              }
                              alt={place.name}
                              className='w-auto h-auto object-cover'
                              width={64}
                              height={64}
                              layout='responsive'
                            />
                          </div>
                          <div className='flex-grow min-w-0'>
                            <h3 className='font-semibold truncate'>
                              {place.name}
                            </h3>
                            <p className='text-sm text-muted-foreground flex items-center'>
                              <Utensils className='w-4 h-4 mr-1 flex-shrink-0' />
                              <span className='truncate'>
                                {place.categories
                                  .map((cat) => cat.name)
                                  .join(', ')}
                              </span>
                            </p>
                            <p className='text-sm text-muted-foreground flex items-center mt-1'>
                              <MapPin className='w-4 h-4 mr-1 flex-shrink-0' />
                              <span className='truncate'>{place.address}</span>
                            </p>
                            <p className='text-sm text-muted-foreground mt-1'>
                              {kmorMiles(place.distance)} away
                            </p>
                          </div>
                          <div className='flex items-center ml-2'>
                            <Button
                              variant='ghost'
                              size='sm'
                              className='p-0 h-8 w-8'
                            >
                              <ChevronRight className='w-4 h-4' />
                              <span className='sr-only'>View Details</span>
                            </Button>
                          </div>
                        </CardContent>
                      </Link>
                    </Card>
                  ))
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* <TabsContent value='preferences'>
          <div className='grid gap-4 md:grid-cols-2'>
            <Card>
              <CardHeader className='p-4 md:p-6'>
                <CardTitle className='text-lg md:text-xl'>
                  Dietary Preferences
                </CardTitle>
                <CardDescription className='text-sm'>
                  Manage your dietary needs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='flex flex-wrap gap-2'>
                  {[
                    'Vegan',
                    'Vegetarian',
                    'Gluten-Free',
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
              <CardHeader className='p-4 md:p-6'>
                <CardTitle className='text-lg md:text-xl'>
                  Spice Tolerance
                </CardTitle>
                <CardDescription className='text-sm'>
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
              <CardHeader className='p-4 md:p-6'>
                <CardTitle className='text-lg md:text-xl'>
                  Favorite Cuisines
                </CardTitle>
                <CardDescription className='text-sm'>
                  Track your preferred cuisines
                </CardDescription>
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
        </TabsContent> */}
      </Tabs>
    </div>
  );
}
