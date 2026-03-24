"use client";
import { useState, useEffect, useCallback } from "react";
import { Loader2, AlertCircle, ArrowLeft, Map } from "lucide-react";
import { FSQPlace } from "@/types/places";
import { useParams, useRouter } from "next/navigation";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import getClientLocation from "@/helpers/get-client-location";
import TrendingPlaceCard from "@/components/trending-place-card";

// UPDATED: Added your new high-hit categories
const codeToHeader = (id: string) => {
  switch (id) {
    case "4bf58dd8d48988d149941735":
      return "Best Thai this week";
    case "52e81612bcbc57f1066b79f4,4bf58dd8d48988d16c941735,4bf58dd8d48988d1c8941735":
      return "Hidden Gems";
    case "4bf58dd8d48988d110941735":
      return "Top-rated Italian";
  }
};

const PlaceCardSkeleton = () => (
  <div className="flex flex-col h-full w-full overflow-hidden rounded-2xl border border-gray-200 bg-white">
    <div className="h-40 w-full bg-gray-100 animate-pulse shrink-0" />
    <div className="p-4 flex-grow flex flex-col gap-3">
      <div className="h-5 w-3/4 bg-gray-100 animate-pulse rounded-md" />
      <div className="h-4 w-1/2 bg-gray-50 animate-pulse rounded-md" />
      <div className="h-8 w-full bg-gray-50 animate-pulse rounded-md mt-auto" />
    </div>
  </div>
);

export default function ExplorePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [places, setPlaces] = useState<FSQPlace[]>([]);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  const fetchPlaces = useCallback(
    async (lat: number, lon: number) => {
      try {
        const response = await fetch(`/api/places/search/${lat}/${lon}/${id}`);

        if (!response.ok) {
          throw new Error("Places not found");
        }

        const data = await response.json();
        setPlaces(data.places || []);
      } catch (error) {
        setError("Failed to fetch places");
      } finally {
        setIsLoading(false);
      }
    },
    [id],
  );

  useEffect(() => {
    const initializePage = async () => {
      if (!userLocation) {
        try {
          // Note: Still using your Geoapify IP tracker here.
          // If you want me to write the highly-accurate HTML5 GPS version, let me know!
          const res = await getClientLocation();

          if (!res) {
            throw new Error("Location not found");
          }

          const newLocation = { lat: res.latitude, lon: res.longitude };
          setUserLocation(newLocation);
          await fetchPlaces(newLocation.lat, newLocation.lon);
        } catch (error) {
          setError("Failed to fetch location");
          setIsLoading(false);
        }
      }
    };

    initializePage();
  }, [userLocation, fetchPlaces]);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive" className="mt-12 rounded-lg">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-20 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 sm:py-5 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md px-3"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Back</span>
          </Button>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight text-center flex-1">
            {codeToHeader(id)}
          </h1>
          <div className="w-12 sm:w-20"></div>{" "}
          {/* Spacer for perfect centering */}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 auto-rows-fr">
            {[...Array(8)].map((_, i) => (
              <PlaceCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 auto-rows-fr">
              {places.map((place) => (
                <TrendingPlaceCard
                  key={place.fsq_place_id}
                  name={place.name}
                  category={place.categories?.[0]?.name || "Unknown"}
                  priceForTwo={0}
                  address={
                    place.location?.formatted_address || place.location?.address
                  }
                  id={place.fsq_place_id}
                  distance={place.distance}
                  images={place.categories?.[0]?.icon}
                />
              ))}
            </div>

            {places.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
                <Map className="w-12 h-12 text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No places found
                </h3>
                <p className="text-gray-500 max-w-sm mb-6">
                  We couldn't find any locations matching this category in your
                  current area.
                </p>
                <Button
                  onClick={() => router.back()}
                  variant="outline"
                  className="rounded-md"
                >
                  Go Back
                </Button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
