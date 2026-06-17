"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import TrendingPlaceCard from "./trending-place-card";
import { FSQPlace } from "@/types/places";
import { AlertCircle, SearchX } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

interface UserRecommendationsProps {
  recommendations: FSQPlace[];
  onChangePreferences: () => void;
  error: string | null;
  isLoading: boolean;
}

const UserRecommendations = ({
  recommendations,
  onChangePreferences,
  error,
  isLoading,
}: UserRecommendationsProps) => {
  // 1. Error State
  if (error) {
    return (
      <Alert variant="destructive" className="mt-12">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <section className="mt-12">
      {/* Title always stays visible to prevent layout jumping */}
      <div className="mb-6 flex flex-col items-start justify-between gap-3 px-2 sm:flex-row sm:items-center">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Your Personalized Recommendations
        </h2>
        <Button
          onClick={onChangePreferences}
          variant="outline"
          className="w-full rounded-md font-medium shadow-sm hover:bg-gray-50 sm:w-auto"
        >
          Change Preferences
        </Button>
      </div>

      {isLoading ? (
        /* 2. Skeleton Loading State (Prevents layout shift by matching the height of the final cards) */
        <div className="flex overflow-hidden space-x-4 px-2 pb-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-[85vw] max-w-[280px] sm:w-72 flex-shrink-0 flex flex-col gap-3"
            >
              {/* Image Skeleton */}
              <Skeleton className="h-36 w-full rounded-lg sm:h-40" />
              {/* Text Skeletons */}
              <div className="space-y-2 mt-1">
                <Skeleton className="h-5 w-3/4 rounded-md" />
                <Skeleton className="h-4 w-1/2 rounded-md" />
                <Skeleton className="h-4 w-full mt-4 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      ) : recommendations && recommendations.length > 0 ? (
        /* 3. Actual Data State */
        <>
          <ScrollArea className="custom-scrollbar w-full whitespace-nowrap rounded-lg border bg-white">
            <div className="flex w-max snap-x snap-mandatory space-x-4 p-4">
              {recommendations.map((place: FSQPlace, index) => (
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

          <p className="mt-2 text-center text-sm font-medium text-gray-400 md:hidden">
            Swipe to explore more
          </p>
        </>
      ) : (
        /* 4. Empty State (If the user's specific dietary requests yield 0 results) */
        <div className="mx-4 my-4 flex flex-col items-center justify-center rounded-lg border border-gray-100 bg-white p-10 text-center shadow-sm animate-in fade-in duration-500">
          <div className="mb-5 rounded-full bg-primary/10 p-5 text-primary">
            <SearchX className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            No exact matches found
          </h3>
          <p className="text-gray-500 mb-8 max-w-md leading-relaxed">
            We couldn't find any places matching those specific preferences
            nearby. Try loosening your filters to discover more great spots!
          </p>
          <Button
            onClick={onChangePreferences}
            size="lg"
            className="h-12 rounded-md px-8 font-bold shadow-md"
          >
            Adjust Preferences
          </Button>
        </div>
      )}
    </section>
  );
};

export default UserRecommendations;
