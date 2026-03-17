"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronUp, ChevronDown, Loader } from "lucide-react";
import PlaceCard from "@/components/place-card";
import { FSQPlace, Coordinates } from "@/types/places";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import dynamic from "next/dynamic";
import getClientLocation from "@/helpers/get-client-location";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import SignInOverlay from "@/components/sign-in-overlay";

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
  const [filteredPlaces, setFilteredPlaces] = useState<FSQPlace[]>([]);
  const [likedPlaces, setLikedPlaces] = useState<Set<string>>(new Set());
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [moodFilter, setMoodFilter] = useState<string>("All");
  const [places, setPlaces] = useState<FSQPlace[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [focusedPlaceId, setFocusedPlaceId] = useState<string | null>(null);
  const [showSignIn, setShowSignIn] = useState<boolean>(false); // SignIn overlay state

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

  const getPlaces = useCallback(async (latitude: number, longitude: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/places/search/${latitude}/${longitude}`,
      );
      if (!response.ok) throw new Error("Failed to fetch places data");
      const data = await response.json();
      if (data.places.length === 0) {
        setError("No places found near you.");
      }
      setPlaces(data.places);
      setFilteredPlaces(data.places);
    } catch (error) {
      console.error("Error fetching places:", error);
      setError("Failed to fetch places. Please try again later.");
    } finally {
      setIsLoading(false);
      initialLoadComplete.current = true;
    }
  }, []);

  useEffect(() => {
    if (initialLoadComplete.current) return;

    const getUserLocation = async () => {
      try {
        const location = await getClientLocation();
        setCenter({
          latitude: location.latitude,
          longitude: location.longitude,
        });
        await getPlaces(location.latitude, location.longitude);
      } catch (error) {
        console.error("Error fetching user location:", error);
        setError("Failed to get your location. Using default location.");
        initialLoadComplete.current = true;
      }
    };

    getUserLocation();
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

  useEffect(() => {
    setFilteredPlaces(filteredPlacesData);
  }, [filteredPlacesData]);

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
    },
    [],
  );

  const toggleLike = useCallback(
    async (place: FSQPlace, e: React.MouseEvent) => {
      e.stopPropagation();

      // Trigger overlay if user is not signed in
      if (!session?.user?.email) {
        setShowSignIn(true);
        return;
      }

      const placeId = place.fsq_place_id;
      const isCurrentlyLiked = likedPlaces.has(placeId);

      // Optimistic UI toggle
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
    setZoom(13);
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
      <div className="flex items-center justify-center h-screen">
        <Alert variant="destructive" className="w-96">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="relative h-[calc(100vh-64px)] w-full overflow-hidden bg-gray-50">
      <div className="absolute inset-0 z-0 w-screen">
        <Map
          center={center}
          zoom={zoom}
          places={filteredPlaces}
          distance={distance}
          onPlaceClick={handlePlaceClick}
          selectedPlaceId={focusedPlaceId ?? ""}
          handlePlaceView={handlePlaceCardClick}
        />
      </div>

      <div className="absolute top-4 left-0 right-0 z-10 px-4 pointer-events-none">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row gap-2 pointer-events-auto">
          <div className="bg-white/90 backdrop-blur-md shadow-lg rounded-2xl p-3 flex-1 flex flex-col justify-center">
            <label className="text-xs font-semibold text-gray-600 mb-1 flex justify-between">
              <span>Search Radius</span>
              <span className="text-primary">{distance.toFixed(1)} km</span>
            </label>
            <Slider
              value={[distance]}
              onValueChange={handleDistanceChange}
              max={5}
              step={0.5}
              min={1}
              className="cursor-grab"
            />
          </div>

          <div className="flex gap-2 flex-1">
            <div className="bg-white/90 backdrop-blur-md shadow-lg rounded-2xl flex-1">
              <Select onValueChange={setCategoryFilter}>
                <SelectTrigger className="border-0 bg-transparent h-full focus:ring-0">
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

            <div className="bg-white/90 backdrop-blur-md shadow-lg rounded-2xl flex-1">
              <Select onValueChange={setMoodFilter}>
                <SelectTrigger className="border-0 bg-transparent h-full focus:ring-0">
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

      <div className="absolute bottom-6 left-0 right-0 z-10 pointer-events-none">
        <div className="flex overflow-x-auto gap-4 px-4 pb-4 snap-x snap-mandatory hide-scrollbar pointer-events-auto">
          {filteredPlaces.length === 0 ? (
            <div className="bg-white shadow-lg rounded-xl p-4 mx-auto text-sm text-gray-500">
              No places found in this area. Try expanding your radius.
            </div>
          ) : (
            filteredPlaces.map((place, index) => (
              <div
                key={place.fsq_place_id}
                className="snap-center shrink-0 w-[85vw] max-w-[320px] transition-transform duration-300"
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
                  priority={index < 3}
                  isFocused={focusedPlaceId === place.fsq_place_id}
                />
              </div>
            ))
          )}
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `,
        }}
      />

      {/* Render SignInOverlay when unauthenticated user attempts to like a place */}
      {showSignIn && (
        <SignInOverlay
          onClose={() => setShowSignIn(false)}
          onSuccess={() => setShowSignIn(false)}
        />
      )}
    </div>
  );
}
