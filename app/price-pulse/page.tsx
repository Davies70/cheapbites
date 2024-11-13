'use client';

import { useState } from 'react';
import Image from 'next/image';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { DollarSign, Clock, TrendingUp, ThumbsUp } from 'lucide-react';

// Mock data for price comparison
const priceComparisonData = [
  { name: 'Burger Joint', burgerPrice: 10, friesPrice: 3, drinkPrice: 2 },
  { name: 'Gourmet Burgers', burgerPrice: 15, friesPrice: 5, drinkPrice: 3 },
  { name: 'Fast Food Chain', burgerPrice: 5, friesPrice: 2, drinkPrice: 1 },
  { name: 'Local Diner', burgerPrice: 8, friesPrice: 3, drinkPrice: 2 },
  { name: 'Food Truck', burgerPrice: 7, friesPrice: 2, drinkPrice: 1 },
];

// Mock data for historical price trends
const historicalPriceData = [
  { month: 'Jan', averagePrice: 12 },
  { month: 'Feb', averagePrice: 11 },
  { month: 'Mar', averagePrice: 13 },
  { month: 'Apr', averagePrice: 14 },
  { month: 'May', averagePrice: 15 },
  { month: 'Jun', averagePrice: 13 },
];

// Mock data for best value recommendations
const bestValueRecommendations = [
  {
    id: 1,
    name: 'Tasty Bites',
    cuisine: 'American',
    rating: 4.5,
    averagePrice: 15,
  },
  {
    id: 2,
    name: 'Sushi Haven',
    cuisine: 'Japanese',
    rating: 4.7,
    averagePrice: 20,
  },
  {
    id: 3,
    name: 'Taco Town',
    cuisine: 'Mexican',
    rating: 4.2,
    averagePrice: 12,
  },
];

// Mock data for happy hours
const happyHours = [
  {
    id: 1,
    restaurant: 'Cocktail Lounge',
    day: 'Monday-Friday',
    time: '4PM-7PM',
    deals: '50% off appetizers, $5 cocktails',
    image: '/placeholder.svg?height=100&width=100',
  },
  {
    id: 2,
    restaurant: 'Pub & Grill',
    day: 'Tuesday, Thursday',
    time: '5PM-8PM',
    deals: '$3 beers, $5 wings',
    image: '/placeholder.svg?height=100&width=100',
  },
  {
    id: 3,
    restaurant: 'Sushi Bar',
    day: 'Wednesday',
    time: '3PM-6PM',
    deals: '30% off all rolls, $4 sake',
    image: '/placeholder.svg?height=100&width=100',
  },
];

export default function PricePulsePage() {
  const [selectedCuisine, setSelectedCuisine] = useState<string>('');
  const [selectedDay, setSelectedDay] = useState<string>('');

  return (
    <div className='container mx-auto p-4 space-y-8'>
      <h1 className='text-3xl font-bold'>Price Pulse</h1>
      <p className='text-gray-600'>
        Track prices, find deals, and make informed dining decisions.
      </p>

      <Tabs defaultValue='comparison'>
        <TabsList>
          <TabsTrigger value='comparison'>Price Comparison</TabsTrigger>
          <TabsTrigger value='trends'>Historical Trends</TabsTrigger>
          <TabsTrigger value='value'>Best Value</TabsTrigger>
          <TabsTrigger value='happyhour'>Happy Hour Finder</TabsTrigger>
        </TabsList>

        <TabsContent value='comparison'>
          <Card>
            <CardHeader>
              <CardTitle>Price Comparison</CardTitle>
              <CardDescription>
                Compare prices across similar restaurants
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width='100%' height={300}>
                <BarChart data={priceComparisonData}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='name' />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey='burgerPrice' name='Burger' fill='#8884d8' />
                  <Bar dataKey='friesPrice' name='Fries' fill='#82ca9d' />
                  <Bar dataKey='drinkPrice' name='Drink' fill='#ffc658' />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='trends'>
          <Card>
            <CardHeader>
              <CardTitle>Historical Price Trends</CardTitle>
              <CardDescription>
                Track how prices have changed over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width='100%' height={300}>
                <BarChart data={historicalPriceData}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='month' />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey='averagePrice'
                    name='Average Price'
                    fill='#8884d8'
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='value'>
          <Card>
            <CardHeader>
              <CardTitle>Best Value Recommendations</CardTitle>
              <CardDescription>
                Find restaurants offering the best value for your money
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div>
                  <Label htmlFor='cuisine-select'>Filter by Cuisine</Label>
                  <Select onValueChange={setSelectedCuisine}>
                    <SelectTrigger id='cuisine-select'>
                      <SelectValue placeholder='Select cuisine' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='american'>American</SelectItem>
                      <SelectItem value='japanese'>Japanese</SelectItem>
                      <SelectItem value='mexican'>Mexican</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='space-y-4'>
                  {bestValueRecommendations.map((restaurant) => (
                    <Card key={restaurant.id}>
                      <CardHeader>
                        <CardTitle>{restaurant.name}</CardTitle>
                        <CardDescription>
                          {restaurant.cuisine} Cuisine
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className='flex justify-between items-center'>
                          <div className='flex items-center'>
                            <ThumbsUp className='w-5 h-5 mr-2 text-green-500' />
                            <span>{restaurant.rating} / 5</span>
                          </div>
                          <div className='flex items-center'>
                            <DollarSign className='w-5 h-5 mr-2 text-blue-500' />
                            <span>Average: ${restaurant.averagePrice}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='happyhour'>
          <Card>
            <CardHeader>
              <CardTitle>Happy Hour Finder</CardTitle>
              <CardDescription>
                Discover the best happy hour deals near you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div>
                  <Label htmlFor='day-select'>Filter by Day</Label>
                  <Select onValueChange={setSelectedDay}>
                    <SelectTrigger id='day-select'>
                      <SelectValue placeholder='Select day' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='monday'>Monday</SelectItem>
                      <SelectItem value='tuesday'>Tuesday</SelectItem>
                      <SelectItem value='wednesday'>Wednesday</SelectItem>
                      <SelectItem value='thursday'>Thursday</SelectItem>
                      <SelectItem value='friday'>Friday</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='space-y-4'>
                  {happyHours.map((happyHour) => (
                    <Card key={happyHour.id}>
                      <div className='flex'>
                        <div className='w-1/3'>
                          <Image
                            src={happyHour.image}
                            alt={happyHour.restaurant}
                            width={100}
                            height={100}
                            className='object-cover w-full h-full rounded-l-lg'
                          />
                        </div>
                        <div className='w-2/3'>
                          <CardHeader>
                            <CardTitle>{happyHour.restaurant}</CardTitle>
                            <CardDescription>{happyHour.day}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className='flex items-center mb-2'>
                              <Clock className='w-5 h-5 mr-2 text-blue-500' />
                              <span>{happyHour.time}</span>
                            </div>
                            <div className='flex items-center'>
                              <TrendingUp className='w-5 h-5 mr-2 text-green-500' />
                              <span>{happyHour.deals}</span>
                            </div>
                          </CardContent>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
