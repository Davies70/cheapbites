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

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  if (status === 'loading' || status === 'unauthenticated') {
    return null; // Don't render anything while checking session or if unauthenticated
  }

  const NavItems = ({ isMobile = false }: { isMobile?: boolean }) => (
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
      <Button
        variant='ghost'
        asChild
        className={isMobile ? 'justify-start' : ''}
      >
        <Link href='/dashboard'>
          <User className='mr-2 h-4 w-4' /> Dashboard
        </Link>
      </Button>
      {session && (
        <Button
          variant='ghost'
          onClick={() => signOut({ callbackUrl: '/', redirect: true })}
          className={isMobile ? 'justify-start' : ''}
        >
          <LogOut className='mr-2 h-4 w-4' /> Sign Out
        </Button>
      )}
    </div>
  );

  return (
    <nav className='bg-primary text-primary-foreground sticky top-0 z-50 shadow-md backdrop-blur-lg'>
      <div className='container mx-auto px-4 py-3 flex justify-between items-center'>
        <Link
          href='/home'
          className='text-xl font-bold flex items-center hover:text-primary-foreground/80 transition-colors'
        >
          CheapBites
        </Link>

        <div className='hidden md:block'>
          <NavItems />
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
              <SheetTitle className='text-primary-foreground'>Menu</SheetTitle>
              <SheetDescription className='text-primary-foreground'>
                Navigate CheapBites
              </SheetDescription>
            </SheetHeader>
            <div className='mt-6 flex flex-col space-y-4'>
              <NavItems isMobile />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Nav;
