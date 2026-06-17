"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { AlertCircle, Compass, Loader2, MapPin, SearchX } from "lucide-react";
import getClientLocation from "@/helpers/get-client-location";
import { FSQPlace } from "@/types/places";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import TrendingPlaceCard from "@/components/trending-place-card";

const collectionMeta: Record<string, { title: string; image: string }> = {
  "4bf58dd8d48988d149941735": {
    title: "Best Thai this week",
    image: "/thai-food.jpg",
  },
  "4bf58dd8d48988d110941735": {
    title: "Top-rated Italian",
    image: "/italian.jpg",
  },
  "52e81612bcbc57f1066b79f4,4bf58dd8d48988d16c941735,4bf58dd8d48988d1c8941735":
    {
      title: "Hidden Gems",
      image: "/hidden-gem.jpg",
    },
};

export default function ExploreCollectionPage() {
  const params = useParams<{ id: string }>();
  const collectionId = decodeURIComponent(params.id);
  const meta = useMemo(
    () =>
      collectionMeta[collectionId] ?? {
        title: "Featured Collection",
        image: "/food-spread.jpg",
      },
    [collectionId],
  );

  const [places, setPlaces] = useState<FSQPlace[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadCollection = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const location = await getClientLocation();
        const res = await fetch(
          `/api/places/search/${location.latitude}/${location.longitude}/${collectionId}`,
          { signal: controller.signal },
        );

        if (!res.ok) throw new Error("Failed to load collection");

        const data = await res.json();
        setPlaces(data.places ?? []);
      } catch (error: any) {
        if (controller.signal.aborted) return;
        const locationError =
          error?.message === "PERMISSION_DENIED" || error?.message === "UNSUPPORTED";
        setError(
          locationError
            ? "Enable location access to browse places near you."
            : "Unable to load this collection right now.",
        );
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    loadCollection();

    return () => controller.abort();
  }, [collectionId]);

  return (
    <div className="mx-auto max-w-6xl py-6 sm:py-8">
      <section className="relative mb-8 min-h-[280px] overflow-hidden rounded-lg bg-gray-900 text-white shadow-lg sm:min-h-[340px]">
        <Image
          src={meta.image}
          alt={meta.title}
          fill
          priority
          sizes="(max-width: 1280px) 100vw, 1152px"
          className="object-cover opacity-65"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
          <div className="mb-3 inline-flex items-center rounded-md bg-white/15 px-3 py-1 text-sm font-semibold backdrop-blur">
            <Compass className="mr-2 h-4 w-4" />
            Curated near you
          </div>
          <h1 className="max-w-2xl text-3xl font-extrabold tracking-tight sm:text-5xl">
            {meta.title}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-white/85 sm:text-base">
            Fresh local matches based on your current area.
          </p>
        </div>
      </section>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Collection unavailable</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {isLoading ? (
        <div className="flex min-h-64 items-center justify-center rounded-lg border border-gray-200 bg-white">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-3 font-medium text-gray-700">
            Finding nearby places...
          </span>
        </div>
      ) : places.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {places.map((place, index) => (
            <TrendingPlaceCard
              key={place.fsq_place_id}
              name={place.name}
              category={place.categories[0]?.name || "Unknown"}
              address={place.location.address}
              id={place.fsq_place_id}
              distance={place.distance}
              images={place.categories[0]?.icon}
              priority={index < 2}
            />
          ))}
        </div>
      ) : (
        <Card className="rounded-lg border-gray-200 bg-white text-center shadow-sm">
          <CardContent className="flex min-h-64 flex-col items-center justify-center p-8">
            <SearchX className="mb-4 h-10 w-10 text-gray-300" />
            <h2 className="text-xl font-bold text-gray-900">
              No places found nearby
            </h2>
            <p className="mt-2 max-w-md text-sm text-gray-500">
              Try another collection or search from the map to widen the area.
            </p>
            <Button asChild className="mt-5 h-11 rounded-md">
              <Link href="/map">
                <MapPin className="mr-2 h-4 w-4" />
                Open Map
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
