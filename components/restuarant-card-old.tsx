import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
import { DollarSign } from 'lucide-react';

interface RestaurantCardProps {
  name: string;
  image: string;
  categories: string[];
  // rating: number;
  // deliveryTime: string;
  priceForTwo: number;
  // promoted?: boolean;
}

export default function RestaurantCardOld({
  name,
  image,
  categories,
  priceForTwo = 0,
}: RestaurantCardProps) {
  return (
    <Card className='overflow-hidden'>
      <div className='relative'>
        <Image
          src={image}
          alt={name}
          width={300}
          height={200}
          className='w-full h-48 object-cover'
        />
        {/* {promoted && (
          <Badge className='absolute top-2 left-2 bg-yellow-400 text-yellow-900'>
            Promoted
          </Badge>
        )}
        {discount && (
          <div className='absolute bottom-2 left-2 bg-blue-600 text-white px-2 py-1 text-sm font-semibold rounded'>
            {discount} OFF
          </div>
        )} */}
      </div>
      <CardContent className='p-4'>
        <div className='flex justify-between items-start mb-2'>
          <h3 className='text-lg font-semibold line-clamp-1'>{name}</h3>
          {/* <Badge variant='outline' className='flex items-center'>
            <Star className='w-4 h-4 mr-1 fill-yellow-400 stroke-yellow-400' />
            {rating}
          </Badge> */}
        </div>
        <p className='text-sm text-muted-foreground line-clamp-1 mb-2'>
          {categories.join(', ')}
        </p>
      </CardContent>
      <CardFooter className='p-4 pt-0 flex justify-between items-center text-sm'>
        {/* <div className='flex items-center'>
          <Clock className='w-4 h-4 mr-1' />
          {deliveryTime}
        </div> */}
        <div className='flex items-center'>
          <DollarSign className='w-4 h-4 mr-1' />
          {priceForTwo} for two
        </div>
      </CardFooter>
    </Card>
  );
}
