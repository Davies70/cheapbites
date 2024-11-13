'use client';

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import RestaurantCard from '@/components/restuarant-card-old';
import { useState, useEffect } from 'react';
import { Place } from '@/types/places';
import { data } from '../db';
import { useQuery } from '@tanstack/react-query';

const TrendingPlaces = () => {
  // const [trendingPlaces, setTrendingPlaces] = useState<Place[]>([]);
  // const [userLocation, setUserLocation] = useState<{
  //   lat: number;
  //   lon: number;
  // } | null>(null);

  // useEffect(() => {
  //   // Fetch user location once on component mount
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         setUserLocation({
  //           lat: position.coords.latitude,
  //           lon: position.coords.longitude,
  //         });
  //       },
  //       (error) => {
  //         console.error('Failed to get user location:', error);
  //       }
  //     );
  //   }
  // }, []);

  // useEffect(() => {
  //   // Fetch trending places only when userLocation is available
  //   if (userLocation) {
  //     fetch(`/api/places/trending/${userLocation.lat}/${userLocation.lon}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setTrendingPlaces(data.places);
  //       })
  //       .catch((error) => {
  //         console.error('Failed to fetch trending places:', error);
  //       });
  //   } else {
  //     // Fallback to default data
  //     setTrendingPlaces(data.results.slice(0, 5));
  //   }
  // }, [userLocation]);

  const fetchTrendingPlaces = async (): Promise<Place[]> => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `/api/places/trending/${latitude}/${longitude}`
          );
          return response.json();
        },
        (error) => {
          console.error('Failed to get user location:', error);
        }
      );
    }
    return data.results.slice(0, 5);
  };

  const {
    data: trendingPlaces,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['trending'],
    queryFn: fetchTrendingPlaces,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching trending places</div>;
  }

  return (
    <div className='mt-12'>
      <h2 className='text-2xl font-semibold mb-4'>Trending Places</h2>
      <ScrollArea className='w-full whitespace-nowrap rounded-md border'>
        <div className='flex w-max space-x-4 p-4'>
          {trendingPlaces.map((place) => (
            <RestaurantCard
              key={place.fsq_id}
              name={place.name}
              image='/placeholder.svg'
              categories={[place.categories[0]?.name || 'Unknown']}
              priceForTwo={0}
              address={place.location.address}
            />
          ))}
        </div>
        <ScrollBar orientation='horizontal' color='secondary' />
      </ScrollArea>
    </div>
  );
};

export default TrendingPlaces;
