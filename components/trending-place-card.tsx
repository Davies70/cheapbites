'use client';

import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { DollarSign, MapPin, Tag, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Image as ImageType } from '@/types/images';
import CardSkeleton from '@/components/card-skelenton';
import Link from 'next/link';

interface TrendingPlaceCardProps {
  name: string;
  categories: string[];
  priceForTwo: number;
  address: string | undefined;
  id: string;
  rating?: number;
  reviewCount?: number;
  latitude?: number;
  longitude?: number;
  distance?: number;
  defaultImage?: string;
  isDefault?: boolean;
}

export default function TrendingPlaceCard({
  name,
  categories,
  priceForTwo = 0,
  address,
  id,
  rating,
  reviewCount,
  distance,
  defaultImage,
  isDefault,
}: TrendingPlaceCardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [imageLink, setImageLink] = useState<ImageType>();

  const openMap = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const encodedAddress = encodeURIComponent(`${name}, ${address}`);
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`,
      '_blank'
    );
  };

  useEffect(() => {
    if (!isDefault) {
      fetch(`/api/images/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setImageLink(data.images[0]);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Failed to fetch images:', error);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [defaultImage, id, isDefault]);

  if (isLoading) {
    return <CardSkeleton />;
  }

  const { prefix, suffix } = imageLink || {};

  const imageToUse =
    prefix && suffix
      ? `${prefix}300x200${suffix}`
      : defaultImage
      ? `/${defaultImage}`
      : '/placeholder-place.png';

  return (
    <Link href={`/places/${id}`} passHref>
      <Card className='overflow-hidden transition-all duration-300 ease-in-out w-full sm:w-[250px] md:w-[300px] h-full flex flex-col cursor-pointer hover:shadow-lg focus-within:ring-2 focus-within:ring-primary'>
        <div className='relative'>
          <Image
            src={imageToUse}
            alt={name}
            width={300}
            height={200}
            className='w-full h-40 sm:h-48 object-cover transition-transform duration-300 ease-in-out group-hover:scale-105'
          />
          {rating && (
            <div className='absolute top-2 right-2 bg-white px-2 py-1 rounded-full flex items-center space-x-1'>
              <Star className='w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current' />
              <span className='text-xs sm:text-sm font-semibold'>
                {rating.toFixed(1)}
              </span>
            </div>
          )}
        </div>
        <CardContent className='p-3 sm:p-4 flex-grow'>
          <h3 className='text-base sm:text-lg font-semibold line-clamp-1 mb-1 sm:mb-2 group-hover:text-primary transition-colors duration-300'>
            {name}
          </h3>
          <div className='flex items-start space-x-2 mb-1 sm:mb-2'>
            <Tag className='w-3 h-3 sm:w-4 sm:h-4 text-gray-500 mt-1 flex-shrink-0' />
            <p className='text-xs sm:text-sm text-gray-600 line-clamp-1'>
              {categories.join(', ')}
            </p>
          </div>
          <button
            className='flex items-start space-x-2 w-full text-left focus:outline-none focus:ring-2 focus:ring-primary rounded'
            onClick={openMap}
          >
            <MapPin className='w-3 h-3 sm:w-4 sm:h-4 text-gray-500 mt-1 flex-shrink-0' />
            <p className='text-xs sm:text-sm text-gray-500 line-clamp-2 hover:underline'>
              {address}
            </p>
          </button>
        </CardContent>
        <CardFooter className='p-3 sm:p-4 pt-0 flex justify-between items-center text-xs sm:text-sm border-t'>
          <div className='flex items-center text-gray-600'>
            <DollarSign className='w-3 h-3 sm:w-4 sm:h-4 mr-1' />
            <span>{priceForTwo} for two</span>
          </div>
          {reviewCount && (
            <div className='text-gray-500 text-xs'>{reviewCount} reviews</div>
          )}
          {distance && (
            <div className='text-gray-500 text-xs'>{distance}m away</div>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}
