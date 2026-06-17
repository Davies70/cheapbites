"use client";

import { useEffect, useRef, useState } from "react";
import { FSQPlace } from "@/types/places";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import TrendingPlaceCard from "@/components/trending-place-card";
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface TrendingPlacesProps {
  userLocation: { lat: number; lon: number };
}

const TrendingPlaces = ({ userLocation }: TrendingPlacesProps) => {
  const [trendingPlaces, setTrendingPlaces] = useState<FSQPlace[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchTrendingPlaces = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const resPlaces = await fetch(
          `/api/places/trending/${userLocation.lat}/${userLocation.lon}`,
          { signal: controller.signal },
        );
        if (!resPlaces.ok) throw new Error("Failed to fetch trending places");

        const data = await resPlaces.json();
        const places = data.places ?? [];
        setTrendingPlaces(places);
        if (places.length === 0) setError("No trending places found");
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error("Error fetching trending places:", error);
        setError("Failed to fetch trending places");
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    fetchTrendingPlaces();

    return () => controller.abort();
  }, [userLocation.lat, userLocation.lon]);

  if (error) {
    return (
      <Alert variant="destructive" className="mt-12">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (isLoading) {
    return (
      <div className="mt-12 flex min-h-32 items-center justify-center rounded-lg border border-gray-200 bg-white">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-base font-medium text-gray-700">
          Loading trending places...
        </span>
      </div>
    );
  }

  return (
    <section className="relative mt-12">
      <h2 className="mb-4 text-xl font-semibold text-gray-900 sm:text-2xl">
        Trending Places
      </h2>

      <ScrollArea className="custom-scrollbar w-full whitespace-nowrap rounded-lg border bg-white">
        <div
          ref={scrollRef}
          className="flex w-max snap-x snap-mandatory space-x-4 p-4"
        >
          {trendingPlaces.map((place, index) => (
            <div
              key={place.fsq_place_id}
              className="w-[82vw] max-w-[280px] flex-shrink-0 snap-center sm:w-72"
            >
              <TrendingPlaceCard
                name={place.name}
                category={place.categories[0]?.name || "Unknown"}
                priceForTwo={0}
                address={place.location.address}
                id={place.fsq_place_id}
                distance={place.distance}
                images={place.categories[0]?.icon}
                priority={index === 0}
              />
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <p className="mt-2 text-center text-sm text-muted-foreground md:hidden">
        Swipe to explore more places
      </p>
    </section>
  );
};

export default TrendingPlaces;
