"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader, Filter, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import PlaceCard from "@/components/place-card";
import { FSQPlace, Coordinates } from "@/types/places";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import dynamic from "next/dynamic";
import getClientLocation from "@/helpers/get-client-location";
import { useSession, signIn } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";

// Dynamically import the Map component with no SSR
const Map = dynamic(() => import("@/components/map"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <Loader className="w-8 h-8 animate-spin text-primary" />
    </div>
  ),
});

const moodTypes = [
  "All",
  "Casual",
  "Fancy",
  "Romantic",
  "Business",
  "Family-friendly",
  "Neutral",
];

const assignMood = (categories: { name: string }[]): string => {
  const casualCategories = [
    "Café",
    "Bar",
    "Fast Food Restaurant",
    "Burger Joint",
    "Pizza Place",
    "Ice Cream Parlor",
    "Coffee Shop",
    "Bistro",
    "Bakery",
  ];
  const fancyCategories = [
    "Steakhouse",
    "French Restaurant",
    "Seafood Restaurant",
    "Fine Dining Restaurant",
  ];
  const familyFriendlyCategories = [
    "Ice Cream Parlor",
    "Pizzeria",
    "Family Restaurant",
  ];
  const businessCategories = ["Coffee Shop", "Business Center"];
  const romanticCategories = [
    "Fine Dining Restaurant",
    "Wine Bar",
    "Cocktail Bar",
  ];

  for (const category of categories) {
    if (romanticCategories.includes(category.name)) return "Romantic";
    if (businessCategories.includes(category.name)) return "Business";
    if (familyFriendlyCategories.includes(category.name))
      return "Family-friendly";
    if (fancyCategories.includes(category.name)) return "Fancy";
    if (casualCategories.includes(category.name)) return "Casual";
  }

  return "Neutral";
};

export default function DiscoveryMap() {
  const router = useRouter();
  const { data: session } = useSession();
  const { toast } = useToast();

  const [distance, setDistance] = useState<number>(1.0);
  const [center, setCenter] = useState<Coordinates>({
    latitude: 0,
    longitude: 0,
  });
  const [zoom, setZoom] = useState<number>(50);
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [likedPlaces, setLikedPlaces] = useState<Set<string>>(new Set());
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [moodFilter, setMoodFilter] = useState<string>("All");
  const [places, setPlaces] = useState<FSQPlace[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [focusedPlaceId, setFocusedPlaceId] = useState<string | null>(null);
  const [showSignIn, setShowSignIn] = useState<boolean>(false);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const initialLoadComplete = useRef(false);

  // Sync liked places with the database on load
  useEffect(() => {
    if (session?.user?.email) {
      fetch(`/api/user/${session.user.email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data?.saved) {
            const savedIds = new Set(data.saved.map((p: any) => p.id));
            setLikedPlaces(savedIds as Set<string>);
          }
        })
        .catch((err) => console.error("Failed to fetch user data", err));
    }
  }, [session]);

  const getPlaces = useCallback(async (
    latitude: number,
    longitude: number,
    signal?: AbortSignal,
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `/api/places/search/${latitude}/${longitude}`,
        { signal },
      );
      if (!response.ok) throw new Error("Failed to fetch places data");
      const data = await response.json();
      if (data.places.length === 0) {
        setError("No places found near you.");
      }
      setPlaces(data.places);
    } catch (error) {
      if (signal?.aborted) return;
      console.error("Error fetching places:", error);
      setError("Failed to fetch places. Please try again later.");
    } finally {
      if (!signal?.aborted) {
        setIsLoading(false);
        initialLoadComplete.current = true;
      }
    }
  }, []);

  useEffect(() => {
    if (initialLoadComplete.current) return;

    const controller = new AbortController();

    const getUserLocation = async () => {
      try {
        const location = await getClientLocation();
        if (location) {
          setCenter({
            latitude: location.latitude,
            longitude: location.longitude,
          });
          await getPlaces(
            location.latitude,
            location.longitude,
            controller.signal,
          );
        } else {
          throw new Error("Location returned null");
        }
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error("Error fetching user location:", error);
        setError(
          "Failed to get your location. Please enable location services.",
        );
        initialLoadComplete.current = true;
      }
    };

    getUserLocation();

    return () => controller.abort();
  }, [getPlaces]);

  const filteredPlacesData = useMemo(() => {
    if (!places.length) return [];

    const maxDistanceMeters = distance * 1000;
    return places.filter((place) => {
      const categoryMatch =
        categoryFilter === "All" ||
        place.categories.some((cat) => cat.name === categoryFilter);
      const moodMatch =
        moodFilter === "All" || assignMood(place.categories) === moodFilter;
      let withinDistance = false;
      if (place.distance) {
        withinDistance = place?.distance <= maxDistanceMeters;
      }
      return categoryMatch && moodMatch && withinDistance;
    });
  }, [distance, categoryFilter, moodFilter, places]);

  const categoryTypes = useMemo(() => {
    if (!places.length) return ["All"];
    return [
      "All",
      ...new Set(
        places.flatMap(
          (place) => place.categories?.map((cat) => cat.name) || [],
        ),
      ),
    ];
  }, [places]);

  const focusOnPlace = useCallback(
    (latitude: number, longitude: number, placeId: string) => {
      setIsExpanded(false);
      setCenter({ latitude, longitude });
      setZoom(18);
      setFocusedPlaceId(placeId);
      // Automatically hide the mobile filter when a place is clicked
      setShowFilters(false);
    },
    [],
  );

  const toggleLike = useCallback(
    async (place: FSQPlace, e: React.MouseEvent) => {
      e.stopPropagation();

      // IF USER IS NOT LOGGED IN, SHOW OVERLAY AND STOP
      if (!session?.user?.email) {
        setShowSignIn(true);
        return;
      }

      const placeId = place.fsq_place_id;
      const isCurrentlyLiked = likedPlaces.has(placeId);

      setLikedPlaces((prev) => {
        const newSet = new Set(prev);
        if (isCurrentlyLiked) newSet.delete(placeId);
        else newSet.add(placeId);
        return newSet;
      });

      try {
        const response = await fetch(`/api/user/saved/${session.user.email}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: place.fsq_place_id,
            name: place.name,
            category: place.categories[0]?.name || "Unknown",
            rating: place.rating,
            address: place.location.formatted_address,
          }),
        });

        if (!response.ok) throw new Error("Failed to save place");

        toast({
          title: isCurrentlyLiked ? "Removed from Saved" : "Place Saved",
          description: isCurrentlyLiked
            ? `${place.name} removed.`
            : `${place.name} saved to your list!`,
        });
      } catch (error) {
        setLikedPlaces((prev) => {
          const newSet = new Set(prev);
          if (isCurrentlyLiked) newSet.add(placeId);
          else newSet.delete(placeId);
          return newSet;
        });
        toast({
          title: "Error",
          description: "Failed to save place.",
          variant: "destructive",
        });
      }
    },
    [session, likedPlaces, toast],
  );

  const handleDistanceChange = useCallback((value: number[]) => {
    setDistance(value[0]);
    setFocusedPlaceId(null);
  }, []);

  const handlePlaceClick = useCallback((placeId: string) => {
    setFocusedPlaceId(placeId);
  }, []);

  const handlePlaceCardClick = useCallback(
    (placeId: string) => {
      router.push(`/places/${placeId}`);
    },
    [router],
  );

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <Alert variant="destructive" className="w-96 shadow-lg bg-white">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <Loader className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="relative h-[calc(100svh-64px)] min-h-[640px] w-full overflow-hidden bg-gray-50">
      {/* SIGN IN OVERLAY (Triggers when logged out user clicks 'Like') */}
      {showSignIn && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="flex w-full max-w-sm flex-col items-center rounded-lg bg-white p-6 text-center shadow-xl animate-in zoom-in-95 duration-200">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Heart className="w-6 h-6 text-primary fill-primary" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Save your favorites
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Sign in to save places to your personal list and access them
              anytime.
            </p>
            <div className="flex w-full gap-3">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setShowSignIn(false)}
              >
                Cancel
              </Button>
              <Button className="w-full" onClick={() => signIn()}>
                Sign In
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="absolute inset-0 z-0 w-screen">
        <Map
          center={center}
          zoom={zoom}
          places={filteredPlacesData}
          distance={distance}
          onPlaceClick={handlePlaceClick}
          selectedPlaceId={focusedPlaceId ?? ""}
          handlePlaceView={handlePlaceCardClick}
          setShowFilters={setShowFilters}
        />
      </div>

      {/* FLOATING TOP BAR (Filters) */}
      <div className="pointer-events-none absolute inset-x-0 top-4 z-40 flex justify-center px-4">
        <div className="pointer-events-none flex w-full max-w-3xl flex-col">
          {/* Mobile Toggle Button */}
          <div className="pointer-events-auto mb-2 flex justify-end md:hidden">
            <Button
              onClick={() => setShowFilters(!showFilters)}
              className="h-10 rounded-md bg-white px-4 text-gray-800 shadow-lg transition-all hover:bg-gray-100"
            >
              <Filter className="w-4 h-4 mr-2" />
              {showFilters ? "Hide Filters" : "Filters"}
            </Button>
          </div>

          {/* Filter Container */}
          <div
            className={`pointer-events-auto w-full flex-col gap-2 md:flex-row md:gap-3 ${
              showFilters
                ? "flex animate-in fade-in slide-in-from-top-2 duration-200"
                : "hidden md:flex"
            }`}
          >
            {/* Distance Slider Panel */}
            <div className="flex w-full flex-col justify-center rounded-lg border border-gray-200 bg-white/95 p-3 shadow-lg backdrop-blur-md md:p-4">
              <label className="text-xs font-semibold text-gray-600 mb-2 md:mb-3 flex justify-between">
                <span>Search Radius</span>
                <span className="text-primary">{distance.toFixed(1)} km</span>
              </label>
              <input
                type="range"
                min={1}
                max={5}
                step={0.5}
                value={distance}
                onChange={(e) =>
                  handleDistanceChange([parseFloat(e.target.value)])
                }
                className="w-full h-2 bg-primary/20 rounded-lg appearance-none cursor-pointer accent-primary touch-none"
              />
            </div>

            {/* Dropdown Filters */}
            <div className="flex flex-row gap-2 md:gap-3 w-full">
              {/* Shrunken mobile dropdowns: h-10 vs h-14 */}
              <div className="flex h-10 w-full items-center rounded-lg border border-gray-200 bg-white/95 shadow-lg backdrop-blur-md md:h-14">
                <Select
                  value={categoryFilter}
                  onValueChange={(val) => {
                    setCategoryFilter(val);
                    setShowFilters(false); // Auto-hide filters on selection
                  }}
                >
                  <SelectTrigger className="border-0 bg-transparent h-full w-full focus:ring-0 shadow-none text-xs md:text-sm font-medium px-3">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryTypes.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex h-10 w-full items-center rounded-lg border border-gray-200 bg-white/95 shadow-lg backdrop-blur-md md:h-14">
                <Select
                  value={moodFilter}
                  onValueChange={(val) => {
                    setMoodFilter(val);
                    setShowFilters(false); // Auto-hide filters on selection
                  }}
                >
                  <SelectTrigger className="border-0 bg-transparent h-full w-full focus:ring-0 shadow-none text-xs md:text-sm font-medium px-3">
                    <SelectValue placeholder="Mood" />
                  </SelectTrigger>
                  <SelectContent>
                    {moodTypes.map((mood) => (
                      <SelectItem key={mood} value={mood}>
                        {mood}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FLOATING BOTTOM CAROUSEL (Mobile) / SIDE PANEL (Desktop) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-4 z-40 md:bottom-6">
        <div className="hide-scrollbar pointer-events-auto flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-4 md:gap-4">
          {filteredPlacesData.length === 0 ? (
            <div className="mx-auto rounded-lg bg-white p-4 text-sm text-gray-500 shadow-lg">
              No places found in this area. Try expanding your radius.
            </div>
          ) : (
            filteredPlacesData.map((place, index) => (
              <div
                key={place.fsq_place_id}
                className="w-[78vw] max-w-[280px] shrink-0 snap-center transition-transform duration-300 md:max-w-[320px]"
              >
                <PlaceCard
                  name={place.name}
                  icon={
                    place.categories[0].icon.prefix +
                    "bg_64" +
                    place.categories[0].icon.suffix
                  }
                  category={place.categories[0]?.name || "Unknown Category"}
                  distance={place.distance ?? 0}
                  onFocus={() =>
                    place.latitude &&
                    place.longitude &&
                    focusOnPlace(
                      place.latitude,
                      place.longitude,
                      place.fsq_place_id,
                    )
                  }
                  isLiked={likedPlaces.has(place.fsq_place_id)}
                  onLike={(e) => toggleLike(place, e)}
                  mood={assignMood(place.categories)}
                  goToPage={(e) => handlePlaceCardClick(place.fsq_place_id)}
                  priority={index === 0}
                  isFocused={focusedPlaceId === place.fsq_place_id}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
