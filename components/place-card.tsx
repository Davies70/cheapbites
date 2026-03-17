import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Navigation } from "lucide-react";
import Image from "next/image";

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

export default function PlaceCard({
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
  const formatDistance = (distanceInMeters: number): string => {
    if (distanceInMeters < 1000) {
      return `${distanceInMeters} m`;
    } else {
      return `${(distanceInMeters / 1000).toFixed(1)} km`;
    }
  };

  return (
    <Card
      onClick={onFocus}
      className={`overflow-hidden cursor-pointer transition-all duration-300 w-full h-[120px] flex flex-row bg-white
        ${
          isFocused
            ? "ring-2 ring-primary shadow-lg scale-[1.02] border-transparent"
            : "border-gray-200 shadow-sm hover:shadow-md"
        }
      `}
    >
      <div className="relative w-[110px] sm:w-[120px] h-full shrink-0 bg-gray-100">
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

      <CardContent className="p-3 flex flex-col justify-between flex-grow min-w-0">
        <div>
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-bold text-sm text-gray-900 truncate">{name}</h3>
            {/* Parent handles the onLike logic entirely now */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onLike(e);
              }}
              className="shrink-0 -mt-1 -mr-1 p-1"
              aria-label={isLiked ? "Unlike place" : "Like place"}
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  isLiked
                    ? "fill-red-500 text-red-500"
                    : "text-gray-300 hover:text-red-400"
                }`}
              />
            </button>
          </div>

          <p className="text-xs text-gray-500 truncate mt-0.5">
            {category} • {mood}
          </p>
          <div className="flex items-center text-xs mt-1 font-medium text-primary">
            <Navigation className="w-3 h-3 mr-1 fill-primary" />
            {formatDistance(distance)} away
          </div>
        </div>

        <div className="flex justify-end mt-1">
          <Button
            variant={isFocused ? "default" : "secondary"}
            size="sm"
            className="h-7 text-xs px-3 py-0"
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
