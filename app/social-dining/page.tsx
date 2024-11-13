'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Utensils,
  Users,
  Calendar,
  Star,
  Share2,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Clock,
} from 'lucide-react';

// Mock data
const restaurants = [
  {
    id: 1,
    name: 'Pasta Paradise',
    cuisine: 'Italian',
    rating: 4.5,
    votes: 120,
    comments: [],
  },
  {
    id: 2,
    name: 'Sushi Haven',
    cuisine: 'Japanese',
    rating: 4.7,
    votes: 98,
    comments: [],
  },
  {
    id: 3,
    name: 'Taco Town',
    cuisine: 'Mexican',
    rating: 4.2,
    votes: 75,
    comments: [],
  },
  {
    id: 4,
    name: 'Curry House',
    cuisine: 'Indian',
    rating: 4.6,
    votes: 88,
    comments: [],
  },
  {
    id: 5,
    name: 'Burger Bliss',
    cuisine: 'American',
    rating: 4.3,
    votes: 105,
    comments: [],
  },
];

const groups = [
  { id: 1, name: 'Foodie Friends', members: ['Alice', 'Bob', 'Charlie'] },
  { id: 2, name: 'Office Lunch Crew', members: ['David', 'Emma', 'Frank'] },
  { id: 3, name: 'Family Dinner', members: ['George', 'Hannah', 'Ian'] },
];

const bookings = [
  {
    id: 1,
    restaurant: 'Pasta Paradise',
    date: '2024-11-15',
    time: '19:00',
    group: 'Foodie Friends',
    status: 'Confirmed',
  },
  {
    id: 2,
    restaurant: 'Sushi Haven',
    date: '2024-11-20',
    time: '20:00',
    group: 'Office Lunch Crew',
    status: 'Pending',
  },
];

export default function SocialDining() {
  const [selectedRestaurants, setSelectedRestaurants] = useState<number[]>([]);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [sharedList, setSharedList] = useState<typeof restaurants>([]);
  const [restaurantsWithComments, setRestaurantsWithComments] =
    useState(restaurants);
  const [newComment, setNewComment] = useState('');
  const [activeCommentRestaurant, setActiveCommentRestaurant] = useState<
    number | null
  >(null);

  const handleRestaurantSelection = (id: number) => {
    setSelectedRestaurants((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const handleShareList = () => {
    const shared = restaurants.filter((r) =>
      selectedRestaurants.includes(r.id)
    );
    setSharedList(shared);
    alert('Restaurant list shared with the group!');
  };

  const handleVote = (id: number, isUpvote: boolean) => {
    // In a real app, this would update the backend
    console.log(`Voted ${isUpvote ? 'up' : 'down'} for restaurant ${id}`);
  };

  const handleAddComment = (restaurantId: number) => {
    if (newComment.trim() === '') return;

    setRestaurantsWithComments((prev) =>
      prev.map((restaurant) =>
        restaurant.id === restaurantId
          ? {
              ...restaurant,
              comments: [
                ...restaurant.comments,
                {
                  id: Date.now(),
                  text: newComment,
                  user: 'Current User',
                  timestamp: new Date(),
                },
              ],
            }
          : restaurant
      )
    );

    setNewComment('');
    setActiveCommentRestaurant(null);
  };

  return (
    <div className='container mx-auto p-4 space-y-8'>
      <h1 className='text-3xl font-bold'>Social Dining</h1>
      <p className='text-gray-600'>
        Plan your group dining experiences and make decisions together!
      </p>

      <Tabs defaultValue='decide'>
        <TabsList>
          <TabsTrigger value='decide'>Group Decision Maker</TabsTrigger>
          <TabsTrigger value='share'>Share Lists</TabsTrigger>
          <TabsTrigger value='rate'>Collaborative Rating</TabsTrigger>
          <TabsTrigger value='book'>Group Booking</TabsTrigger>
          <TabsTrigger value='comments'>Comments</TabsTrigger>
        </TabsList>

        <TabsContent value='decide'>
          <Card>
            <CardHeader>
              <CardTitle>Group Decision Maker</CardTitle>
              <CardDescription>
                Select restaurants for your group to vote on
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {restaurants.map((restaurant) => (
                  <div
                    key={restaurant.id}
                    className='flex items-center space-x-2'
                  >
                    <input
                      type='checkbox'
                      id={`restaurant-${restaurant.id}`}
                      checked={selectedRestaurants.includes(restaurant.id)}
                      onChange={() => handleRestaurantSelection(restaurant.id)}
                      className='rounded border-gray-300 text-primary focus:ring-primary'
                    />
                    <label
                      htmlFor={`restaurant-${restaurant.id}`}
                      className='flex-grow'
                    >
                      {restaurant.name} - {restaurant.cuisine}
                    </label>
                    <span className='text-sm text-gray-600'>
                      Rating: {restaurant.rating}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() =>
                  alert('Voting poll created and sent to the group!')
                }
              >
                Create Voting Poll
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value='share'>
          <Card>
            <CardHeader>
              <CardTitle>Share Restaurant Lists</CardTitle>
              <CardDescription>
                Share your favorite restaurants with your groups
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div>
                  <Label htmlFor='group-select'>Select a group</Label>
                  <Select onValueChange={setSelectedGroup}>
                    <SelectTrigger id='group-select'>
                      <SelectValue placeholder='Select a group' />
                    </SelectTrigger>
                    <SelectContent>
                      {groups.map((group) => (
                        <SelectItem key={group.id} value={group.name}>
                          {group.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Select restaurants to share</Label>
                  {restaurants.map((restaurant) => (
                    <div
                      key={restaurant.id}
                      className='flex items-center space-x-2'
                    >
                      <input
                        type='checkbox'
                        id={`share-restaurant-${restaurant.id}`}
                        checked={selectedRestaurants.includes(restaurant.id)}
                        onChange={() =>
                          handleRestaurantSelection(restaurant.id)
                        }
                        className='rounded border-gray-300 text-primary focus:ring-primary'
                      />
                      <label htmlFor={`share-restaurant-${restaurant.id}`}>
                        {restaurant.name} - {restaurant.cuisine}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleShareList}
                disabled={!selectedGroup || selectedRestaurants.length === 0}
              >
                Share List
              </Button>
            </CardFooter>
          </Card>
          {sharedList.length > 0 && (
            <Card className='mt-4'>
              <CardHeader>
                <CardTitle>Shared List</CardTitle>
                <CardDescription>
                  Restaurants shared with {selectedGroup}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className='list-disc pl-5'>
                  {sharedList.map((restaurant) => (
                    <li key={restaurant.id}>
                      {restaurant.name} - {restaurant.cuisine}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value='rate'>
          <Card>
            <CardHeader>
              <CardTitle>Collaborative Rating System</CardTitle>
              <CardDescription>
                Rate and review restaurants as a group
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-6'>
                {restaurants.map((restaurant) => (
                  <div
                    key={restaurant.id}
                    className='border-b pb-4 last:border-b-0'
                  >
                    <div className='flex justify-between items-center mb-2'>
                      <h3 className='text-lg font-semibold'>
                        {restaurant.name}
                      </h3>
                      <Badge>{restaurant.cuisine}</Badge>
                    </div>
                    <div className='flex items-center space-x-2 mb-2'>
                      <Star className='text-yellow-400' />
                      <span>{restaurant.rating.toFixed(1)}</span>
                      <span className='text-sm text-gray-600'>
                        ({restaurant.votes} votes)
                      </span>
                    </div>
                    <div className='flex space-x-2'>
                      <Button
                        size='sm'
                        onClick={() => handleVote(restaurant.id, true)}
                      >
                        <ThumbsUp className='w-4 h-4 mr-2' />
                        Upvote
                      </Button>
                      <Button
                        size='sm'
                        variant='outline'
                        onClick={() => handleVote(restaurant.id, false)}
                      >
                        <ThumbsDown className='w-4 h-4 mr-2' />
                        Downvote
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='book'>
          <Card>
            <CardHeader>
              <CardTitle>Group Booking Management</CardTitle>
              <CardDescription>
                Manage your group restaurant bookings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-6'>
                <div>
                  <h3 className='text-lg font-semibold mb-2'>
                    Current Bookings
                  </h3>
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className='border-b pb-4 last:border-b-0'
                    >
                      <div className='flex justify-between items-center'>
                        <div>
                          <p className='font-medium'>{booking.restaurant}</p>
                          <p className='text-sm text-gray-600'>
                            {booking.group}
                          </p>
                        </div>
                        <div className='text-right'>
                          <p>
                            {booking.date} at {booking.time}
                          </p>
                          <Badge
                            variant={
                              booking.status === 'Confirmed'
                                ? 'default'
                                : 'secondary'
                            }
                          >
                            {booking.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  <h3 className='text-lg font-semibold mb-2'>
                    Make a New Booking
                  </h3>
                  <form className='space-y-4'>
                    <div>
                      <Label htmlFor='new-booking-restaurant'>Restaurant</Label>
                      <Select>
                        <SelectTrigger id='new-booking-restaurant'>
                          <SelectValue placeholder='Select a restaurant' />
                        </SelectTrigger>
                        <SelectContent>
                          {restaurants.map((restaurant) => (
                            <SelectItem
                              key={restaurant.id}
                              value={restaurant.name}
                            >
                              {restaurant.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor='new-booking-group'>Group</Label>
                      <Select>
                        <SelectTrigger id='new-booking-group'>
                          <SelectValue placeholder='Select a group' />
                        </SelectTrigger>
                        <SelectContent>
                          {groups.map((group) => (
                            <SelectItem key={group.id} value={group.name}>
                              {group.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                      <div>
                        <Label htmlFor='new-booking-date'>Date</Label>
                        <Input type='date' id='new-booking-date' />
                      </div>
                      <div>
                        <Label htmlFor='new-booking-time'>Time</Label>
                        <Input type='time' id='new-booking-time' />
                      </div>
                    </div>
                    <Button type='submit'>Make Booking</Button>
                  </form>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='comments'>
          <Card>
            <CardHeader>
              <CardTitle>Restaurant Comments</CardTitle>
              <CardDescription>
                Share your thoughts and read others' comments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-6'>
                {restaurantsWithComments.map((restaurant) => (
                  <div
                    key={restaurant.id}
                    className='border-b pb-4 last:border-b-0'
                  >
                    <div className='flex justify-between items-center mb-2'>
                      <h3 className='text-lg font-semibold'>
                        {restaurant.name}
                      </h3>
                      <Badge>{restaurant.cuisine}</Badge>
                    </div>
                    <div className='space-y-2'>
                      {restaurant.comments.map((comment) => (
                        <div
                          key={comment.id}
                          className='bg-gray-100 p-2 rounded'
                        >
                          <div className='flex justify-between items-center mb-1'>
                            <p className='text-sm font-medium'>
                              {comment.user}
                            </p>
                            <div className='flex items-center text-xs text-gray-500'>
                              <Clock className='w-3 h-3 mr-1' />
                              {format(
                                new Date(comment.timestamp),
                                'MMM d, yyyy HH:mm'
                              )}
                            </div>
                          </div>
                          <p className='text-sm'>{comment.text}</p>
                        </div>
                      ))}
                    </div>
                    {activeCommentRestaurant === restaurant.id ? (
                      <div className='mt-2 space-y-2'>
                        <Textarea
                          placeholder='Write your comment...'
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                        />
                        <div className='flex space-x-2'>
                          <Button
                            size='sm'
                            onClick={() => handleAddComment(restaurant.id)}
                          >
                            Post Comment
                          </Button>
                          <Button
                            size='sm'
                            variant='outline'
                            onClick={() => setActiveCommentRestaurant(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button
                        size='sm'
                        variant='outline'
                        className='mt-2'
                        onClick={() =>
                          setActiveCommentRestaurant(restaurant.id)
                        }
                      >
                        <MessageCircle className='w-4 h-4 mr-2' />
                        Add Comment
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
