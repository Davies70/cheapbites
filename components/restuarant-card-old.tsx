import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { DollarSign, MapPin, Tag, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Image as ImageType } from '@/types/images';
import CardSkeleton from '@/components/card-skelenton';

interface RestaurantCardProps {
  name: string;
  categories: string[];
  priceForTwo: number;
  address: string | undefined;
  id: string;
  rating?: number;
  reviewCount?: number;
  latitude?: number;
  longitude?: number;
}

export default function RestaurantCard({
  name,
  categories,
  priceForTwo = 0,
  address,
  id,
  rating,
  reviewCount,
  latitude,
  longitude,
}: RestaurantCardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState<ImageType[]>([]);

  const openMap = () => {
    if (latitude && longitude) {
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`,
        '_blank'
      );
    }
  };

  useEffect(() => {
    fetch(`/api/images/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setImages(data.images);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch images:', error);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <CardSkeleton />;
  }

  return (
    <Card className='overflow-hidden transition-opacity duration-300 ease-in-out w-[300px] h-full flex flex-col'>
      <div className='relative'>
        <Image
          src={images[0]?.prefix + '300x200' + images[0]?.suffix}
          alt={name}
          width={300}
          height={200}
          className='w-full h-48 object-cover'
        />
        {rating && (
          <div className='absolute top-2 right-2 bg-white px-2 py-1 rounded-full flex items-center space-x-1'>
            <Star className='w-4 h-4 text-yellow-400 fill-current' />
            <span className='text-sm font-semibold'>{rating.toFixed(1)}</span>
          </div>
        )}
      </div>
      <CardContent className='p-4 flex-grow'>
        <h3 className='text-lg font-semibold line-clamp-1 mb-2'>{name}</h3>
        <div className='flex items-start space-x-2 mb-2'>
          <Tag className='w-4 h-4 text-gray-500 mt-1 flex-shrink-0' />
          <p className='text-sm text-gray-600 line-clamp-1'>
            {categories.join(', ')}
          </p>
        </div>
        <div
          className='flex items-start space-x-2 cursor-pointer'
          onClick={openMap}
        >
          <MapPin className='w-4 h-4 text-gray-500 mt-1 flex-shrink-0' />
          <p className='text-sm text-gray-500 line-clamp-2 hover:underline'>
            {address}
          </p>
        </div>
      </CardContent>
      <CardFooter className='p-4 pt-0 flex justify-between items-center text-sm border-t'>
        <div className='flex items-center text-gray-600'>
          <DollarSign className='w-4 h-4 mr-1' />
          <span>{priceForTwo} for two</span>
        </div>
        {reviewCount && (
          <div className='text-gray-500 text-xs'>{reviewCount} reviews</div>
        )}
      </CardFooter>
    </Card>
  );
}
