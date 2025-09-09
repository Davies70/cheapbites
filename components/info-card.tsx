'use client';

import { Card, CardContent } from '@/components/ui/card';
import {
  MapPin,
  Phone,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Clipboard,
} from 'lucide-react';
import { useState } from 'react';
import { Place } from '@/types/place';

export default function ContactCard({ place }: { place: Place }) {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const iconClass =
    'w-5 h-5 text-gray-500 group-hover:text-primary transition-colors';

  return (
    <Card>
      <CardContent className='flex flex-col md:flex-row justify-between gap-8 p-6'>
        {/* Left: Info */}
        <div className='flex-1 space-y-4'>
          {/* Address */}
          <div className='flex items-center gap-2 group'>
            <MapPin className={iconClass} />
            <a
              className='text-sm hover:text-primary transition-colors hover:underline'
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                `${place?.name},${place?.location.formatted_address}`
              )}`}
              target='_blank'
              rel='noopener noreferrer'
              title='Open in Google Maps'
            >
              {place?.location.formatted_address || 'Address not available'}
            </a>
            {place?.location.formatted_address && (
              <button
                onClick={() =>
                  handleCopy(place.location.formatted_address ?? '', 'address')
                }
                className='ml-2 text-gray-400 hover:text-primary'
                title='Copy address'
              >
                <Clipboard className='w-4 h-4' />
              </button>
            )}
          </div>

          {/* Contact: Tel */}
          {place?.tel && (
            <div className='flex items-center gap-2 group'>
              <Phone className={iconClass} />
              <a
                href={`tel:${place.tel}`}
                className='text-sm hover:text-primary transition-colors hover:underline'
                title='Call'
              >
                {place.tel}
              </a>
              <button
                onClick={() => handleCopy(place.tel ?? '', 'phone')}
                className='ml-2 text-gray-400 hover:text-primary'
                title='Copy phone'
              >
                <Clipboard className='w-4 h-4' />
              </button>
            </div>
          )}

          {/* Contact: Email */}
          {place?.email && (
            <div className='flex items-center gap-2 group'>
              <span className='text-gray-500'>📧</span>
              <a
                href={`mailto:${place.email}`}
                className='text-sm hover:text-primary transition-colors hover:underline'
                title='Send Email'
              >
                {place.email}
              </a>
            </div>
          )}

          {/* Website */}
          <div className='flex items-center gap-2 group'>
            <Globe className={iconClass} />
            {place?.website ? (
              <a
                href={place.website}
                target='_blank'
                rel='noopener noreferrer'
                className='text-sm hover:text-primary transition-colors truncate max-w-[220px] block'
                title={place.website}
              >
                {place.website}
              </a>
            ) : (
              <span className='text-sm text-gray-500'>
                Website not available
              </span>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className='hidden md:block w-px bg-gray-200'></div>

        {/* Right: Social Media */}
        <div className='flex flex-col items-start md:items-end justify-start min-w-[120px]'>
          {place?.social_media && (
            <div className='flex gap-4'>
              {place.social_media.facebook_id && (
                <a
                  href={`https://facebook.com/${place.social_media.facebook_id}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label='Facebook'
                  className='group'
                  title='Facebook'
                >
                  <Facebook className='w-6 h-6 text-blue-600 group-hover:text-primary transition-colors' />
                </a>
              )}
              {place.social_media.twitter && (
                <a
                  href={`https://twitter.com/${place.social_media.twitter}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label='Twitter'
                  className='group'
                  title='Twitter'
                >
                  <Twitter className='w-6 h-6 text-sky-500 group-hover:text-primary transition-colors' />
                </a>
              )}
              {place.social_media.instagram && (
                <a
                  href={`https://instagram.com/${place.social_media.instagram}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label='Instagram'
                  className='group'
                  title='Instagram'
                >
                  <Instagram className='w-6 h-6 text-pink-500 group-hover:text-primary transition-colors' />
                </a>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
