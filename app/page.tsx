'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import Image from 'next/image';
import { signIn } from 'next-auth/react';

export default function SignInPage() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
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
          >
            <Image
              src='/google-icon.png'
              alt='Google logo'
              width={20}
              height={20}
              className='mr-2 h-5 w-5'
            />
            Sign in with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
