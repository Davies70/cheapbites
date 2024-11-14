'use client';

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import RestaurantCard from '@/components/restuarant-card-old';
import { useState, useEffect } from 'react';
import { Place } from '@/types/places';
import { data } from '../db';

const TrendingPlaces = () => {
  const [trendingPlaces, setTrendingPlaces] = useState<Place[]>([]);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Failed to get user location:', error);
        }
      );
    }
  }, []);

  useEffect(() => {
    if (userLocation) {
      fetch(`/api/places/trending/${userLocation.lat}/${userLocation.lon}`)
        .then((res) => res.json())
        .then((data) => {
          setTrendingPlaces(data.places);
        })
        .catch((error) => {
          console.error('Failed to fetch trending places:', error);
        });
    } else {
      setTrendingPlaces(data.results.slice(0, 5));
    }
  }, [userLocation]);

  return (
    <div className='mt-12'>
      <h2 className='text-2xl font-semibold mb-4'>Trending Places</h2>
      <ScrollArea className='w-full whitespace-nowrap rounded-md border custom-scrollbar'>
        <div className='flex w-max space-x-4 p-4'>
          {trendingPlaces.map((place) => (
            <RestaurantCard
              key={place.fsq_id}
              name={place.name}
              categories={[place.categories[0]?.name || 'Unknown']}
              priceForTwo={0}
              address={place.location.address}
              id={place.fsq_id}
              latitude={place.geocodes.roof?.latitude}
              longitude={place.geocodes.roof?.longitude}
            />
          ))}
        </div>
        <ScrollBar
          orientation='horizontal'
          className='custom-scrollbar-thumb'
        />
      </ScrollArea>
    </div>
  );
};

export default TrendingPlaces;
