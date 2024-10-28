import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function RestaurantCardSkeleton() {
  return (
    <Card className='mb-4 overflow-hidden'>
      <CardContent className='p-0'>
        <div className='flex'>
          <Skeleton className='h-24 w-24 rounded-none' />
          <div className='flex-1 p-4'>
            <div className='flex justify-between items-start'>
              <div className='space-y-2 flex-1'>
                <Skeleton className='h-5 w-3/4' />
                <Skeleton className='h-4 w-1/2' />
              </div>
              <Skeleton className='h-6 w-6 rounded-full' />
            </div>
            <div className='mt-4 flex justify-between items-center'>
              <Skeleton className='h-4 w-1/4' />
              <Skeleton className='h-8 w-24 rounded-full' />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
