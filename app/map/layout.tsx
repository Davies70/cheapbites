'use client';

import type { Metadata } from 'next';
import Nav from '@/components/nav';

// export const metadata: Metadata = {
//   title: 'CheapBites - Discovery Map',
//   description: 'Explore and discover great food deals near you',
// };

export default function MapLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav />
      <main className='w-full h-[calc(100vh-64px)]'>{children}</main>
    </>
  );
}
