'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Clock, Users, Utensils } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

// Mock data for restaurants
const restaurants = [
  {
    id: 1,
    name: 'Tasty Bites',
    cuisine: 'American',
    rating: 4.5,
    peakHours: [12, 13, 19, 20],
    quietHours: [15, 16],
  },
  {
    id: 2,
    name: 'Sushi Haven',
    cuisine: 'Japanese',
    rating: 4.7,
    peakHours: [13, 14, 20, 21],
    quietHours: [16, 17],
  },
  {
    id: 3,
    name: 'Pasta Paradise',
    cuisine: 'Italian',
    rating: 4.2,
    peakHours: [12, 13, 18, 19],
    quietHours: [14, 15],
  },
];

// Mock data for special events and deals
const specialEvents = [
  {
    id: 1,
    name: 'Happy Hour at Tasty Bites',
    restaurant: 'Tasty Bites',
    date: '2024-11-01',
    time: '17:00',
    description: '50% off on all appetizers',
  },
  {
    id: 2,
    name: 'Sushi Making Class',
    restaurant: 'Sushi Haven',
    date: '2024-11-05',
    time: '19:00',
    description: 'Learn to make sushi with our expert chefs',
  },
  {
    id: 3,
    name: 'Italian Wine Tasting',
    restaurant: 'Pasta Paradise',
    date: '2024-11-10',
    time: '18:00',
    description: 'Explore a variety of Italian wines',
  },
];

export default function TimeMachine() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<string>('12:00');

  const formatDate = (date: Date | undefined) => {
    if (!date) return '';
    return format(date, 'PPP');
  };

  const getRestaurantStatus = (
    restaurant: (typeof restaurants)[0],
    hour: number
  ) => {
    if (restaurant.peakHours.includes(hour)) return 'Peak hours';
    if (restaurant.quietHours.includes(hour)) return 'Quiet hours';
    return 'Normal hours';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Peak hours':
        return 'text-red-500';
      case 'Quiet hours':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  const filteredEvents = specialEvents.filter(
    (event) => event.date === format(date!, 'yyyy-MM-dd')
  );

  return (
    <div className='container mx-auto p-4 space-y-8'>
      <h1 className='text-3xl font-bold'>Time Machine</h1>
      <p className='text-gray-600'>
        Explore restaurants and events at different times
      </p>

      <div className='flex flex-col sm:flex-row gap-4'>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'w-full sm:w-[280px] justify-start text-left font-normal',
                !date && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className='mr-2 h-4 w-4' />
              {date ? formatDate(date) : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0'>
            <Calendar
              mode='single'
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Select onValueChange={setTime} defaultValue={time}>
          <SelectTrigger className='w-full sm:w-[180px]'>
            <SelectValue placeholder='Select time' />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
              <SelectItem
                key={hour}
                value={`${hour.toString().padStart(2, '0')}:00`}
              >
                {`${hour.toString().padStart(2, '0')}:00`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {restaurants.map((restaurant) => (
          <Card key={restaurant.id}>
            <CardHeader>
              <CardTitle>{restaurant.name}</CardTitle>
              <CardDescription>{restaurant.cuisine} Cuisine</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='flex items-center space-x-2 mb-2'>
                <Users className='h-4 w-4' />
                <span
                  className={getStatusColor(
                    getRestaurantStatus(restaurant, parseInt(time))
                  )}
                >
                  {getRestaurantStatus(restaurant, parseInt(time))}
                </span>
              </div>
              <div className='flex items-center space-x-2'>
                <Clock className='h-4 w-4' />
                <span>Selected time: {time}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className='text-2xl font-bold mt-8'>Special Events & Deals</h2>
      {filteredEvents.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredEvents.map((event) => (
            <Card key={event.id}>
              <CardHeader>
                <CardTitle>{event.name}</CardTitle>
                <CardDescription>{event.restaurant}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='flex items-center space-x-2 mb-2'>
                  <CalendarIcon className='h-4 w-4' />
                  <span>{event.date}</span>
                </div>
                <div className='flex items-center space-x-2 mb-2'>
                  <Clock className='h-4 w-4' />
                  <span>{event.time}</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <Utensils className='h-4 w-4' />
                  <span>{event.description}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className='text-gray-600'>
          No special events or deals on this date.
        </p>
      )}
    </div>
  );
}
