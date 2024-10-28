import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Heart, Star } from 'lucide-react';

interface PlaceCardProps {
  category: string;
  icon: string;
  name: string;
  mood: string;
  distance: number;
  onFocus: () => void;
  isLiked: boolean;
  onLike: (e: React.MouseEvent) => void;
}

export default function PlaceCard({
  category,
  icon,
  name,
  mood,
  distance,
  onFocus,
  isLiked,
  onLike,
}: PlaceCardProps) {
  const formatDistance = (distanceInMeters: number): string => {
    if (distanceInMeters < 1000) {
      return `${distanceInMeters} meters`;
    } else {
      return `${Math.round(distanceInMeters / 1000)} km`;
    }
  };

  return (
    <Card
      className='mb-2 cursor-pointer hover:bg-gray-50 transition-colors duration-200 shadow-sm'
      onClick={onFocus}
    >
      <CardContent className='p-3 flex items-start'>
        <div className='w-20 h-20 mr-3 flex-shrink-0'>
          <img
            src={icon}
            alt={name}
            className='w-full h-full object-cover rounded'
          />
        </div>
        <div className='flex-grow min-w-0'>
          <div className='flex justify-between items-start'>
            <h3 className='font-semibold text-sm truncate pr-2'>{name}</h3>
            <Button
              variant='ghost'
              size='sm'
              className='p-0 h-auto'
              onClick={onLike}
            >
              <Heart
                className={`w-4 h-4 ${
                  isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'
                }`}
              />
            </Button>
          </div>
          <div className='flex items-center text-xs text-gray-600 mt-1'>
            <Star className='w-3 h-3 text-yellow-400 mr-1' />
            {/* <span>{place.rating}</span> */}
            <span className='mx-1'>•</span>
            {/* <span>{'$'.repeat(place.price)}</span> */}
            <span className='mx-1'>•</span>
            <span className='truncate'>{category}</span>
          </div>
          <div className='text-xs text-gray-500 mt-1 truncate'>{mood}</div>
          <div className='flex items-center mt-1 text-xs text-gray-500'>
            <MapPin className='w-3 h-3 mr-1' />
            {formatDistance(distance)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}