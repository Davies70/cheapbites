'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import { signIn } from 'next-auth/react';

export default function SignInPage() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (error) {
    return (
      <Alert variant='destructive' className='mt-12'>
        <AlertCircle className='h-4 w-4' />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (isLoading) {
    return (
      <div className='mt-12 flex items-center justify-center'>
        <Loader2 className='h-8 w-8 animate-spin text-primary' />
        <span className='ml-2 text-lg font-medium'>
          Loading trending places...
        </span>
      </div>
    );
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold text-center'>
            Welcome to CheapBites
          </CardTitle>
          <CardDescription className='text-center'>
            Sign in to discover amazing local eats
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant='outline'
            className='w-full h-12 font-semibold'
            onClick={() => signIn('google', { callbackUrl: '/home' })}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className='mr-2 h-5 w-5 animate-spin' />
            ) : (
              <Image
                src='/google-icon.png'
                alt='Google logo'
                width={20}
                height={20}
                className='mr-10 h-auto w-auto'
                
              />
            )}
            Sign in with Google
          </Button>
        </CardContent>
        {error && (
          <Alert variant='destructive' className='mt-4'>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </Card>
    </div>
  );
}
