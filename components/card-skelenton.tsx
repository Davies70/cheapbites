import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { DollarSign, MapPin, Tag } from 'lucide-react';

export default function CardSkeleton() {
  return (
    <Card className='overflow-hidden animate-pulse w-[300px] h-full flex flex-col'>
      <div className='relative'>
        <div className='w-full h-48 bg-gray-200' />
        <div className='absolute top-2 right-2 bg-gray-200 w-12 h-6 rounded-full' />
      </div>
      <CardContent className='p-4 flex-grow'>
        <div className='h-6 w-3/4 bg-gray-200 rounded mb-2' />
        <div className='flex items-start space-x-2 mb-2'>
          <Tag className='w-4 h-4 text-gray-300' />
          <div className='h-4 w-2/3 bg-gray-200 rounded' />
        </div>
        <div className='flex items-start space-x-2'>
          <MapPin className='w-4 h-4 text-gray-300' />
          <div className='h-4 w-3/4 bg-gray-200 rounded' />
        </div>
      </CardContent>
      <CardFooter className='p-4 pt-0 flex justify-between items-center border-t'>
        <div className='flex items-center'>
          <DollarSign className='w-4 h-4 mr-1 text-gray-300' />
          <div className='h-4 w-20 bg-gray-200 rounded' />
        </div>
        <div className='h-4 w-16 bg-gray-200 rounded' />
      </CardFooter>
    </Card>
  );
}
