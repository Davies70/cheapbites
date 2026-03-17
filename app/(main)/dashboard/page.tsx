"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bookmark,
  MapPin,
  Clock,
  Utensils,
  ChevronRight,
  Star,
  MessageSquare,
  Navigation,
  Compass,
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { User, SavedPlace } from "@/types/user";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const { id } = useParams();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    if (!session?.user?.email) return;

    setIsLoading(true);
    fetch(`/api/user/${session.user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      })
      .catch((e) => {
        console.error("Error fetching user data:", e);
        setError(
          "An error occurred while fetching your data. Please try again.",
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [session, id]);

  const unsaveRestaurant = async (savedPlace: SavedPlace) => {
    setUser((prevUser) => {
      if (!prevUser) return null;
      return {
        ...prevUser,
        saved: prevUser.saved.filter((place) => place.id !== savedPlace.id),
      };
    });

    try {
      const response = await fetch(`/api/user/saved/${session?.user?.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...savedPlace }),
      });

      if (!response.ok) throw new Error("Failed to save place");

      toast({
        title: "Removed from Saved",
        description: `${savedPlace.name} has been removed.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while removing the place.",
        variant: "destructive",
      });
    }
  };

  const kmorMiles = (distance: number | undefined) => {
    if (!distance) return "unavailable";
    return distance > 1000
      ? `${(distance / 1000).toFixed(1)} km`
      : `${distance} m`;
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-100px)]">
        <Alert variant="destructive" className="w-full max-w-md shadow-lg">
          <AlertTitle className="font-bold">Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (isLoading || !user) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-100px)] space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
        <p className="text-gray-500 font-medium animate-pulse">
          Loading your foodie profile...
        </p>
      </div>
    );
  }

  const firstName = session?.user?.name?.split(" ")[0] || "Foodie";

  return (
    <div className="py-8 max-w-5xl mx-auto animate-in fade-in duration-500">
      {/* 1. Profile Header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8 text-center sm:text-left bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <Avatar className="h-24 w-24 shadow-md border-4 border-primary/10">
          <AvatarImage
            src={session?.user?.image || ""}
            alt={session?.user?.name || "User"}
          />
          <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
            {firstName.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 mt-2 sm:mt-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Welcome back, {firstName}!
          </h1>
          <p className="text-gray-500 mt-1 text-base">
            Here is a summary of your culinary adventures.
          </p>
        </div>

        {/* 2. Quick Stats */}
        <div className="flex gap-4 sm:gap-6 mt-4 sm:mt-2 w-full sm:w-auto justify-center">
          <div className="text-center">
            <p className="text-2xl font-black text-gray-900">
              {user.saved.length}
            </p>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
              Saved
            </p>
          </div>
          <div className="w-px h-10 bg-gray-200"></div>
          <div className="text-center">
            <p className="text-2xl font-black text-gray-900">
              {user.visited.length}
            </p>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
              Visited
            </p>
          </div>
          <div className="w-px h-10 bg-gray-200"></div>
          <div className="text-center">
            <p className="text-2xl font-black text-gray-900">
              {user.reviews.length}
            </p>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
              Reviews
            </p>
          </div>
        </div>
      </div>

      {/* 3. Main Content Tabs */}
      <Tabs defaultValue="saved" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full h-14 bg-white shadow-sm border border-gray-100 rounded-2xl p-1">
          <TabsTrigger
            value="saved"
            className="rounded-xl text-xs sm:text-sm font-semibold data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none"
          >
            <Bookmark className="w-4 h-4 sm:mr-2 hidden sm:block" /> Saved
          </TabsTrigger>
          <TabsTrigger
            value="visited"
            className="rounded-xl text-xs sm:text-sm font-semibold data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none"
          >
            <MapPin className="w-4 h-4 sm:mr-2 hidden sm:block" /> Visited
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="rounded-xl text-xs sm:text-sm font-semibold data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none"
          >
            <MessageSquare className="w-4 h-4 sm:mr-2 hidden sm:block" />{" "}
            Reviews
          </TabsTrigger>
          <TabsTrigger
            value="recommendations"
            className="rounded-xl text-xs sm:text-sm font-semibold data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none"
          >
            <Compass className="w-4 h-4 sm:mr-2 hidden sm:block" /> For You
          </TabsTrigger>
        </TabsList>

        {/* SAVED PLACES */}
        <TabsContent value="saved" className="focus-visible:outline-none">
          <Card className="border-0 shadow-md rounded-3xl overflow-hidden">
            <CardHeader className="bg-gray-50/50 border-b border-gray-100 pb-4">
              <CardTitle className="text-xl">Saved Places</CardTitle>
              <CardDescription>
                Your favorite spots ready for your next outing.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[450px]">
                {user.saved.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-[350px] text-gray-500">
                    <Bookmark className="w-12 h-12 mb-4 text-gray-300" />
                    <p className="font-medium text-lg text-gray-900">
                      No saved places yet
                    </p>
                    <p className="text-sm">
                      Click the heart icon on the map to save spots here.
                    </p>
                    <Button
                      asChild
                      variant="outline"
                      className="mt-4 rounded-full"
                    >
                      <Link href="/map">Explore Map</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {user.saved.map((restaurant) => (
                      <div
                        key={restaurant.id}
                        className="group hover:bg-gray-50 transition-colors p-4 sm:p-6"
                      >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <Link
                            href={`/places/${restaurant.id}`}
                            className="flex-grow flex items-start gap-4 cursor-pointer"
                          >
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-1">
                              <Utensils className="w-6 h-6" />
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-900 text-lg group-hover:text-primary transition-colors">
                                {restaurant.name}
                              </h3>
                              <p className="text-sm font-medium text-gray-500">
                                {restaurant.category}
                              </p>
                              <p className="text-xs text-gray-400 flex items-center mt-1.5">
                                <MapPin className="w-3 h-3 mr-1 shrink-0" />
                                <span className="line-clamp-1">
                                  {restaurant.address}
                                </span>
                              </p>
                            </div>
                          </Link>
                          <div className="flex items-center space-x-2 w-full sm:w-auto justify-end sm:justify-start pt-2 sm:pt-0">
                            <Button
                              variant="ghost"
                              className="text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full shrink-0"
                              onClick={(e) => {
                                e.preventDefault();
                                unsaveRestaurant(restaurant);
                              }}
                            >
                              <Bookmark className="w-4 h-4 mr-2 fill-current" />{" "}
                              Unsave
                            </Button>
                            <Button
                              variant="secondary"
                              size="icon"
                              asChild
                              className="rounded-full shrink-0 hidden sm:flex"
                            >
                              <Link href={`/places/${restaurant.id}`}>
                                <ChevronRight className="w-4 h-4" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* VISITED PLACES */}
        <TabsContent value="visited" className="focus-visible:outline-none">
          <Card className="border-0 shadow-md rounded-3xl overflow-hidden">
            <CardHeader className="bg-gray-50/50 border-b border-gray-100 pb-4">
              <CardTitle className="text-xl">Visited Places</CardTitle>
              <CardDescription>
                Keep track of everywhere you've conquered.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[450px]">
                {user.visited.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-[350px] text-gray-500">
                    <MapPin className="w-12 h-12 mb-4 text-gray-300" />
                    <p className="font-medium text-lg text-gray-900">
                      No visited places yet
                    </p>
                    <p className="text-sm">
                      Mark places as visited on their details page to build your
                      history.
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {user.visited.map((place) => (
                      <Link
                        key={place.id}
                        href={`/places/${place.id}`}
                        className="block group hover:bg-gray-50 transition-colors p-4 sm:p-6"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-grow pr-4">
                            <h3 className="font-bold text-gray-900 text-lg group-hover:text-primary transition-colors">
                              {place.name}
                            </h3>
                            <p className="text-sm font-medium text-gray-500 mb-1">
                              {place.category}
                            </p>
                            <p className="text-xs text-gray-400 flex items-center">
                              <Navigation className="w-3 h-3 mr-1 shrink-0" />
                              <span className="truncate">{place.address}</span>
                            </p>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                            <ChevronRight className="w-5 h-5" />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* REVIEWS */}
        <TabsContent value="reviews" className="focus-visible:outline-none">
          <Card className="border-0 shadow-md rounded-3xl overflow-hidden">
            <CardHeader className="bg-gray-50/50 border-b border-gray-100 pb-4">
              <CardTitle className="text-xl">Your Reviews</CardTitle>
              <CardDescription>
                Your honest opinions on the spots you've tried.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[450px]">
                {user.reviews.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-[350px] text-gray-500">
                    <MessageSquare className="w-12 h-12 mb-4 text-gray-300" />
                    <p className="font-medium text-lg text-gray-900">
                      No reviews yet
                    </p>
                    <p className="text-sm">
                      Share your thoughts on a place page to help other foodies.
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {user.reviews.map((review) => (
                      <div
                        key={review.placeId}
                        className="p-6 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex flex-col sm:flex-row justify-between items-start mb-3 gap-2">
                          <Link href={`/places/${review.placeId}`}>
                            <h3 className="font-bold text-lg text-gray-900 hover:text-primary hover:underline">
                              {review.name}
                            </h3>
                          </Link>
                          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-0 flex items-center gap-1 px-2.5 py-1">
                            <Star className="w-3 h-3 fill-current" />{" "}
                            {review.rating} / 5
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed mb-3 italic border-l-2 border-primary/30 pl-3 py-1">
                          "{review.review}"
                        </p>
                        <p className="text-xs font-medium text-gray-400 flex items-center">
                          <Clock className="w-3 h-3 mr-1.5" />
                          {new Date(review.created_at).toLocaleDateString(
                            undefined,
                            { year: "numeric", month: "short", day: "numeric" },
                          )}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* RECOMMENDATIONS */}
        <TabsContent
          value="recommendations"
          className="focus-visible:outline-none"
        >
          <Card className="border-0 shadow-md rounded-3xl overflow-hidden">
            <CardHeader className="bg-gray-50/50 border-b border-gray-100 pb-4">
              <CardTitle className="text-xl">For You</CardTitle>
              <CardDescription>
                Personalized picks based on your quiz and diet settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[450px]">
                {user.recommendations.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-[350px] text-gray-500">
                    <Compass className="w-12 h-12 mb-4 text-gray-300" />
                    <p className="font-medium text-lg text-gray-900">
                      No recommendations found
                    </p>
                    <p className="text-sm">
                      Take the food quiz on the home page to get personalized
                      picks.
                    </p>
                    <Button
                      asChild
                      variant="outline"
                      className="mt-4 rounded-full"
                    >
                      <Link href="/">Take Quiz</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {user.recommendations.map((place) => (
                      <Link
                        key={place.fsq_place_id}
                        href={`/places/${place.fsq_place_id}`}
                        className="block group hover:bg-gray-50 transition-colors p-4 sm:p-6"
                      >
                        <div className="flex items-center">
                          <div className="w-16 h-16 sm:w-20 sm:h-20 mr-4 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-200 relative">
                            <Image
                              src={
                                place.photos && place.photos.length > 0
                                  ? `${place.photos[0].prefix}original${place.photos[0].suffix}`
                                  : "/placeholder-place.png"
                              }
                              alt={place.name}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                              sizes="80px"
                            />
                          </div>
                          <div className="flex-grow min-w-0 pr-4">
                            <h3 className="font-bold text-gray-900 text-base sm:text-lg truncate group-hover:text-primary transition-colors">
                              {place.name}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-500 flex items-center mt-1 truncate">
                              <Utensils className="w-3.5 h-3.5 mr-1.5 shrink-0 text-gray-400" />
                              <span className="truncate">
                                {place.categories
                                  .map((cat) => cat.name)
                                  .join(", ")}
                              </span>
                            </p>
                            <div className="flex items-center gap-4 mt-1.5">
                              <p className="text-xs text-gray-500 flex items-center truncate">
                                <MapPin className="w-3.5 h-3.5 mr-1.5 shrink-0 text-gray-400" />
                                <span className="truncate">
                                  {place.location.address}
                                </span>
                              </p>
                              <p className="text-xs font-semibold text-primary shrink-0 hidden sm:block">
                                {kmorMiles(place.distance)}
                              </p>
                            </div>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-400 group-hover:border-primary group-hover:text-primary transition-colors">
                            <ChevronRight className="w-5 h-5" />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
