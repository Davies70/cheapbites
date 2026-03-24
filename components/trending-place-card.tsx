"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MapPin, Tag, Star } from "lucide-react";
import Link from "next/link";

interface TrendingPlaceCardProps {
  name: string;
  category: string;
  priceForTwo?: number;
  address?: string;
  id: string;
  rating?: number;
  reviewCount?: number;
  distance?: number;
  images?: { prefix: string; suffix: string };
}

export default function TrendingPlaceCard({
  name,
  category,
  address,
  id,
  rating,
  reviewCount,
  distance,
  images,
}: TrendingPlaceCardProps) {
  const openMap = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const encodedAddress = encodeURIComponent(`${name}, ${address}`);
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`,
      "_blank",
    );
  };

  let imageToUse;

  if (!images) {
    imageToUse = "/placeholder-place.png";
  } else {
    const { prefix, suffix } = images;
    imageToUse =
      prefix && suffix ? `${prefix}bg_64${suffix}` : "/placeholder-place.png";
  }

  const meterOrKm = (distance: number) =>
    distance < 1000 ? `${distance} m` : `${(distance / 1000).toFixed(1)} km`;

  return (
    // Added "block h-full" so the link fills the parent container's stretched height
    <Link href={`/places/${id}`} className="block h-full" passHref>
      {/* Added "h-full" so the card fills the Link tag */}
      <Card className="group h-full w-full sm:w-64 md:w-72 flex flex-col overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer">
        {/* Image - Added shrink-0 to prevent the image from squishing */}
        <div className="relative h-36 sm:h-40 shrink-0">
          <Image
            src={imageToUse}
            alt={name}
            fill
            className="object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, 300px"
            priority
          />
          {rating && (
            <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full flex items-center space-x-1 shadow-sm">
              <Star className="w-3 h-3 text-yellow-400 fill-current" />
              <span className="text-xs font-medium">{rating.toFixed(1)}</span>
            </div>
          )}
        </div>

        {/* Content - flex-grow ensures this pushes the footer to the bottom */}
        <CardContent className="p-3 sm:p-4 flex-grow">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-1 group-hover:text-primary transition-colors">
            {name}
          </h3>
          <div className="flex items-center space-x-1 mt-1">
            <Tag className="w-3 h-3 text-gray-400 flex-shrink-0" />
            <p className="text-xs text-gray-600 line-clamp-1">{category}</p>
          </div>
          {address && (
            <button
              className="flex items-start space-x-1 mt-2 w-full text-left focus:outline-none focus:ring-2 focus:ring-primary rounded"
              onClick={openMap}
            >
              <MapPin className="w-3 h-3 text-gray-400 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-gray-500 line-clamp-2 hover:underline">
                {address}
              </p>
            </button>
          )}
        </CardContent>

        {/* Footer */}
        <CardFooter className="p-3 sm:p-4 pt-0 flex justify-between items-center border-t text-xs text-gray-500 shrink-0 mt-auto">
          {reviewCount ? <span>{reviewCount} reviews</span> : <span />}
          {distance && <span>{meterOrKm(distance)} away</span>}
        </CardFooter>
      </Card>
    </Link>
  );
}
