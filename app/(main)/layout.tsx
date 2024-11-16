import Nav from '@/components/nav';

export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav />
      <main className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>{children}</main>
    </>
  );
}
