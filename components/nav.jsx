'use client';

import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  MapPin,
  User,
  Clock,
  TrendingUp,
  Utensils,
  Users,
  Menu,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTrayOpen, setIsTrayOpen] = useState(false);

  const NavItems = () => (
    <>
      <Button variant='ghost' asChild>
        <Link href='/map' onClick={() => setIsOpen(false)}>
          <MapPin className='mr-2 h-4 w-4' /> Discovery Map
        </Link>
      </Button>
      <Button variant='ghost' asChild>
        <Link href='/dashboard' onClick={() => setIsOpen(false)}>
          <User className='mr-2 h-4 w-4' /> Dashboard
        </Link>
      </Button>
      <DropdownMenu open={isTrayOpen} onOpenChange={setIsTrayOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost'>
            {isTrayOpen ? (
              <ChevronUp className='mr-2 h-4 w-4' />
            ) : (
              <ChevronDown className='mr-2 h-4 w-4' />
            )}
            Unique Features
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem asChild>
            <Link
              href='/time-machine'
              className='flex items-center'
              onClick={() => setIsOpen(false)}
            >
              <Clock className='mr-2 h-4 w-4' /> Time Machine
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href='/price-pulse'
              className='flex items-center'
              onClick={() => setIsOpen(false)}
            >
              <TrendingUp className='mr-2 h-4 w-4' /> Price Pulse
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href='/food-journey'
              className='flex items-center'
              onClick={() => setIsOpen(false)}
            >
              <Utensils className='mr-2 h-4 w-4' /> Food Journey
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href='/social-dining'
              className='flex items-center'
              onClick={() => setIsOpen(false)}
            >
              <Users className='mr-2 h-4 w-4' /> Social Dining
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
  return (
    <nav className='bg-primary text-primary-foreground sticky top-0 z-50 shadow-md backdrop-blur-lg'>
      <div className='container mx-auto px-4 py-3 flex justify-between items-center'>
        <Link
          href='/'
          className='text-xl font-bold flex items-center hover:text-primary-foreground/80 transition-colors'
        >
          <Utensils className='mr-2 h-6 w-6' />
          CheapBites
        </Link>
        <div className='hidden md:flex items-center space-x-6'>
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
            </SheetHeader>
            <nav className='flex flex-col space-y-4 mt-6'>
              <NavItems />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Nav;
