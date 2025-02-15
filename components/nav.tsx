'use client';

import { useState, useEffect } from 'react';
import { MapPin, User, Menu, LogOut } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import SignInOverlay from './sign-in-overlay';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleSignInSuccess = () => {
    setShowSignIn(false);
    router.push('/dashboard'); // Redirect to dashboard after successful sign-in
  };

  const NavItems = ({
    isMobile = false,
    onSignInClick,
  }: {
    isMobile?: boolean;
    onSignInClick: () => void;
  }) => (
    <div
      className={
        isMobile ? 'flex flex-col space-y-4' : 'flex items-center space-x-6'
      }
    >
      <Button
        variant='ghost'
        asChild
        className={isMobile ? 'justify-start' : ''}
      >
        <Link href='/map'>
          <MapPin className='mr-2 h-4 w-4' /> Discovery Map
        </Link>
      </Button>
      {session ? (
        <>
          <Button
            variant='ghost'
            asChild
            className={isMobile ? 'justify-start' : ''}
          >
            <Link href='/dashboard'>
              <User className='mr-2 h-4 w-4' /> Dashboard
            </Link>
          </Button>
          <Button
            variant='ghost'
            onClick={() => signOut({ callbackUrl: '/', redirect: true })}
            className={isMobile ? 'justify-start' : ''}
          >
            <LogOut className='mr-2 h-4 w-4' /> Sign Out
          </Button>
        </>
      ) : (
        <Button
          variant='ghost'
          onClick={onSignInClick}
          className={isMobile ? 'justify-start' : ''}
        >
          <User className='mr-2 h-4 w-4' /> Sign In
        </Button>
      )}
    </div>
  );

  return (
    <>
      <nav className='bg-primary text-primary-foreground  top-0 z-40 shadow-md backdrop-blur-lg'>
        {' '}
        {/* z-index lowered */}
        <div className='container mx-auto px-4 py-3 flex justify-between items-center'>
          <Link
            href='/'
            className='text-xl font-bold flex items-center hover:text-primary-foreground/80 transition-colors'
          >
            CheapBites
          </Link>

          <div className='hidden md:block'>
            <NavItems onSignInClick={() => setShowSignIn(true)} />
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                className='md:hidden hover:bg-primary-foreground/10'
              >
                <Menu className='h-6 w-6' />
                <span className='sr-only'>Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side='right'
              className='w-[250px] sm:w-[300px] bg-primary text-primary-foreground'
            >
              <SheetHeader>
                <SheetTitle className='text-primary-foreground'></SheetTitle>
                <SheetDescription className='text-primary-foreground'></SheetDescription>
              </SheetHeader>
              <div className='mt-6 flex flex-col space-y-4'>
                <NavItems
                  isMobile
                  onSignInClick={() => {
                    setShowSignIn(true);
                    setIsOpen(false);
                  }}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
      {showSignIn && (
        <div className='fixed inset-0 z-50'>
          <SignInOverlay
            onClose={() => setShowSignIn(false)}
            onSuccess={handleSignInSuccess}
          />
        </div>
      )}
    </>
  );
};

export default Nav;
