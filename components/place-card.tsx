import { memo } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Navigation } from "lucide-react";

interface PlaceCardProps {
  category: string;
  icon: string;
  name: string;
  mood: string;
  distance: number;
  onFocus: () => void;
  isLiked: boolean;
  onLike: (e: React.MouseEvent) => void;
  goToPage: (e: React.MouseEvent) => void;
  priority?: boolean;
  isFocused: boolean;
}

function PlaceCard({
  category,
  icon,
  name,
  mood,
  distance,
  onFocus,
  isLiked,
  onLike,
  goToPage,
  priority,
  isFocused,
}: PlaceCardProps) {
  const formatDistance = (distanceInMeters: number): string =>
    distanceInMeters < 1000
      ? `${distanceInMeters} m`
      : `${(distanceInMeters / 1000).toFixed(1)} km`;

  return (
    <Card
      onClick={onFocus}
      className={`interactive-card overflow-hidden cursor-pointer w-full h-[124px] flex flex-row rounded-lg bg-white ${
        isFocused
          ? "ring-2 ring-primary shadow-lg scale-[1.01] border-transparent"
          : "border-gray-200"
      }`}
    >
      <div className="relative h-full w-[110px] shrink-0 bg-gray-100 sm:w-[120px]">
        <Image
          src={icon}
          alt={name}
          fill
          className="object-cover"
          sizes="120px"
          priority={priority}
          placeholder="blur"
          blurDataURL="/placeholder-place.png"
        />
      </div>

      <CardContent className="flex min-w-0 flex-grow flex-col justify-between p-3">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="truncate text-sm font-bold text-gray-900">{name}</h3>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onLike(e);
              }}
              className="shrink-0 -mr-1 -mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition hover:bg-red-50 hover:text-red-500"
              aria-label={isLiked ? "Unlike place" : "Like place"}
            >
              <Heart
                className={`h-4 w-4 transition-colors ${
                  isLiked ? "fill-red-500 text-red-500" : ""
                }`}
              />
            </button>
          </div>

          <p className="mt-0.5 truncate text-xs text-gray-500">
            {category} - {mood}
          </p>
          <div className="mt-1 flex items-center text-xs font-medium text-primary">
            <Navigation className="mr-1 h-3 w-3 fill-primary" />
            {formatDistance(distance)} away
          </div>
        </div>

        <div className="mt-1 flex justify-end">
          <Button
            variant={isFocused ? "default" : "secondary"}
            size="sm"
            className="h-8 rounded-md px-3 py-0 text-xs"
            onClick={(e) => {
              e.stopPropagation();
              goToPage(e);
            }}
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default memo(PlaceCard);
