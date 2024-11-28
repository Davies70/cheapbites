'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import TrendingPlaceCard from '@/components/trending-place-card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { ReturnedPlace } from '@/types/places';

// Mock data fetching function
const fetchPlaces = async (category: string, page: number) => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock data
  const places: ReturnedPlace[] = Array(12)
    .fill(null)
    .map((_, index) => ({
      id: `place-${index + 1}`,
      name: `Place ${index + 1}`,
      categories: [{ name: 'Category' }],
      address: '123 Main St, City, Country',
      rating: 4 + Math.random(),
      reviewCount: Math.floor(Math.random() * 1000),
      distance: Math.floor(Math.random() * 5000),
      images: [{ prefix: '/placeholder-', suffix: '.jpg' }],
    }));

  return places;
};

export default function ExplorePage() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || 'Trending';
  const [places, setPlaces] = useState<ReturnedPlace>();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPlaces = async () => {
      setLoading(true);
      try {
        const newPlaces = await fetchPlaces(category, page);
        setPlaces((prevPlaces) => [...prevPlaces, ...newPlaces]);
        setError(null);
      } catch (err) {
        setError('Failed to load places. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadPlaces();
  }, [category, page]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-8'>{category} Places</h1>

      {error && <div className='text-red-500 mb-4'>{error}</div>}

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {places.map((place) => (
          <TrendingPlaceCard key={place.id} {...place} />
        ))}
      </div>

      {loading && (
        <div className='flex justify-center items-center mt-8'>
          <Loader2 className='h-8 w-8 animate-spin text-primary' />
        </div>
      )}

      {!loading && places.length > 0 && (
        <div className='mt-8 flex justify-center'>
          <Button onClick={loadMore}>Load More</Button>
        </div>
      )}
    </div>
  );
}
