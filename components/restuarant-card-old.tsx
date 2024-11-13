import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { DollarSign } from 'lucide-react';

interface RestaurantCardProps {
  name: string;
  image: string;
  categories: string[];
  priceForTwo: number;
  address: string | undefined;
}

export default function RestaurantCard({
  name,
  image,
  categories,
  priceForTwo = 0,
  address,
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
      </div>
      <CardContent className='p-4'>
        <div className='flex justify-between items-start mb-2'>
          <h3 className='text-lg font-semibold line-clamp-1'>{name}</h3>
        </div>
        <p className='text-sm text-muted-foreground line-clamp-1 mb-1'>
          {categories.join(', ')}
        </p>
        <p className='text-sm text-muted-foreground line-clamp-1 mb-2'>
          {address}
        </p>
      </CardContent>
      <CardFooter className='p-4 pt-0 flex justify-between items-center text-sm'>
        <div className='flex items-center'>
          <DollarSign className='w-4 h-4 mr-1' />
          {priceForTwo} for two
        </div>
      </CardFooter>
    </Card>
  );
}
