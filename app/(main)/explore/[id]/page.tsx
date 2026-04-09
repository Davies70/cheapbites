"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Utensils,
  Clock,
  TrendingUp,
  Users,
  Search,
  Loader2,
  AlertCircle,
  MapPinOff,
} from "lucide-react";
import Image from "next/image";
import FoodQuiz from "@/components/food-quiz";
import DietaryPreference from "@/components/dietary-preference";
import UserRecommendations from "@/components/user-recommendations";
import TrendingPlaces from "@/components/trending-places";
import Nav from "@/components/nav";
import getClientLocation from "@/helpers/get-client-location";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useSession } from "next-auth/react";
import { User } from "@/types/user";
import { FSQPlace } from "@/types/places";
import SignInOverlay from "@/components/sign-in-overlay";

const featuredCollections = [
  {
    id: "4bf58dd8d48988d149941735",
    name: "Best Thai this week",
    image: "/thai-food.jpg",
  },
  {
    id: "52e81612bcbc57f1066b79f4,4bf58dd8d48988d16c941735,4bf58dd8d48988d1c8941735",
    name: "Hidden Gems",
    image: "/hidden-gem.jpg",
  },
  {
    id: "4bf58dd8d48988d110941735",
    name: "Top-rated Italian",
    image: "/italian.jpg",
  },
];

export default function HomePage() {
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  const [dietaryPreferences, setDietaryPreferences] = useState<string[]>([]);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  // Loading & Permission States
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckingPrefs, setIsCheckingPrefs] = useState(true);
  const [locationDenied, setLocationDenied] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [recommendations, setRecommendations] = useState<FSQPlace[]>([]);
  const [recommendationError, setRecommendationError] = useState<string | null>(
    null,
  );
  const [isRecommendationLoading, setIsRecommendationLoading] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return;

    const initializeApp = async () => {
      let currentLat: number;
      let currentLon: number;

      if (!userLocation) {
        try {
          const resLocation = await getClientLocation();
          currentLat = resLocation.latitude;
          currentLon = resLocation.longitude;
          setUserLocation({ lat: currentLat, lon: currentLon });
        } catch (error: any) {
          if (
            error.message === "PERMISSION_DENIED" ||
            error.message === "UNSUPPORTED"
          ) {
            setLocationDenied(true);
          } else {
            setError("Failed to fetch location. Please check your connection.");
          }
          setIsLoading(false);
          return; // HARD STOP: Exit if location fails
        }
      } else {
        currentLat = userLocation.lat;
        currentLon = userLocation.lon;
      }

      setIsLoading(false);

      const checkLocalPrefs = async () => {
        const storedQuizCompleted = localStorage.getItem("quizCompleted");
        const storedQuizAnswers = localStorage.getItem("quizAnswers");
        const storedDietaryPreferences =
          localStorage.getItem("dietaryPreferences");

        if (
          storedQuizCompleted &&
          storedQuizAnswers &&
          storedDietaryPreferences
        ) {
          setQuizCompleted(JSON.parse(storedQuizCompleted));

          // Only attempt to fetch recommendations if a valid session exists
          if (session?.user?.email) {
            await fetchRecommendations(
              session.user.email,
              JSON.parse(storedDietaryPreferences),
              JSON.parse(storedQuizAnswers),
              currentLat,
              currentLon,
            );
          }
        }
      };

      if (session?.user?.email) {
        try {
          const res = await fetch(`/api/user/${session.user.email}`);
          if (res.ok) {
            const data = await res.json();
            setUser(data);
            if (data.recommendations?.length > 0) {
              setRecommendations(data.recommendations);
              setShowRecommendations(true);
            } else {
              await checkLocalPrefs();
            }
          }
        } catch (error) {
          await checkLocalPrefs();
        }
      } else {
        await checkLocalPrefs();
      }

      setIsCheckingPrefs(false);
    };

    initializeApp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, status]);

  const handleQuizComplete = (answers: string[]) => {
    setQuizAnswers(answers);
    setQuizCompleted(true);
    localStorage.setItem("quizCompleted", JSON.stringify(true));
    localStorage.setItem("quizAnswers", JSON.stringify(answers));
  };

  const handleDietaryPreferencesSubmit = async (preferences: string[]) => {
    setDietaryPreferences(preferences);
    localStorage.setItem("dietaryPreferences", JSON.stringify(preferences));
    if (!session) {
      setShowSignIn(true);
    } else if (session.user?.email) {
      await fetchRecommendations(
        session.user.email,
        preferences,
        quizAnswers,
        userLocation?.lat,
        userLocation?.lon,
      );
    }
  };

  const handleChangePreferences = () => {
    setQuizCompleted(false);
    setShowRecommendations(false);
    setUser((prevUser) =>
      prevUser ? { ...prevUser, recommendations: [] } : null,
    );
    localStorage.removeItem("quizCompleted");
    localStorage.removeItem("quizAnswers");
    localStorage.removeItem("dietaryPreferences");
  };

  const handleSignInSuccess = () => setShowSignIn(false);

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  const fetchRecommendations = async (
    email: string = "",
    diet: string[] = dietaryPreferences,
    quiz: string[] = quizAnswers,
    lat: number | undefined = userLocation?.lat,
    lon: number | undefined = userLocation?.lon,
  ) => {
    if (!lat || !lon) return;
    try {
      setShowRecommendations(true);
      setIsRecommendationLoading(true);
      const dietString = diet.join(",").toLowerCase().replace("-", "");
      const res = await fetch(
        `api/recommendations/${lat}/${lon}/${email}/${quiz[0].toLowerCase()}/${dietString}`,
      );
      const data = await res.json();
      setRecommendations(data.places);
    } catch (error) {
      setRecommendationError("Failed to fetch recommendations");
    } finally {
      setIsRecommendationLoading(false);
    }
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive" className="mt-12">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  // Location Denied Blocking UI
  if (locationDenied) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 text-center">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full border border-gray-100 flex flex-col items-center">
          <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-6">
            <MapPinOff className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Location Required
          </h2>
          <p className="text-gray-500 mb-6 leading-relaxed">
            CheapBites needs your location to find the best spots near you. We{" "}
            <strong>do not store or save</strong> your location data anywhere.
          </p>
          <div className="bg-gray-50 p-4 rounded-xl w-full text-sm text-gray-600 mb-6 text-left">
            <strong>How to enable:</strong>
            <br />
            1. Click the lock/site settings icon in your browser's address bar.
            <br />
            2. Allow "Location" access.
            <br />
            3. Refresh this page.
          </div>
          <Button
            onClick={() => window.location.reload()}
            className="w-full h-12 rounded-xl font-bold"
          >
            I've enabled it, reload page
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading && !userLocation) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* HERO SECTION */}
        <div className="relative h-[45vh] md:h-[55vh] flex items-center justify-center text-white">
          <div className="absolute inset-0 bg-black">
            <Image
              src="/food-spread.jpg"
              alt="Delicious food spread"
              className="w-full h-full object-cover opacity-50"
              fill
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-black/40 to-transparent" />
          </div>
          <div className="relative z-10 text-center space-y-4 px-4 w-full max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight drop-shadow-md">
              {greeting},<br className="md:hidden" /> food explorer!
            </h1>
            <p className="text-lg md:text-2xl font-medium drop-shadow-sm opacity-90">
              Discover amazing local eats without breaking the bank.
            </p>
            <div className="pt-4">
              <Button
                asChild
                size="lg"
                className="h-14 px-8 text-lg font-bold rounded-full shadow-xl hover:scale-105 transition-transform"
              >
                <Link href="/map">
                  <Search className="mr-2 h-5 w-5" /> Find Cheap Bites Near Me
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <div className="relative z-20 flex justify-center w-full">
            <div className="w-full max-w-xl">
              {isCheckingPrefs ? (
                <div className="shadow-2xl rounded-2xl bg-white p-12 border border-gray-100 min-h-[300px] flex items-center justify-center">
                  <Loader2 className="w-10 h-10 animate-spin text-primary" />
                </div>
              ) : (
                !showRecommendations && (
                  <div className="shadow-2xl rounded-2xl bg-white overflow-hidden border border-gray-100">
                    {!quizCompleted ? (
                      <FoodQuiz onQuizComplete={handleQuizComplete} />
                    ) : (
                      <DietaryPreference
                        onPreferencesSubmit={handleDietaryPreferencesSubmit}
                      />
                    )}
                  </div>
                )
              )}
            </div>
          </div>

          {showRecommendations && (
            <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <UserRecommendations
                recommendations={recommendations}
                onChangePreferences={handleChangePreferences}
                error={recommendationError}
                isLoading={isRecommendationLoading}
              />
            </div>
          )}

          {userLocation && (
            <div className="mt-12 md:mt-16">
              <TrendingPlaces userLocation={userLocation} />
            </div>
          )}

          {/* FEATURED COLLECTIONS */}
          <div className="mt-16 md:mt-24">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Featured Collections
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCollections.map((collection) => (
                <Link
                  href={`/explore/${collection.id}`}
                  key={collection.id}
                  className="group"
                >
                  <Card className="overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl h-full flex flex-col cursor-pointer">
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={collection.image}
                        alt={collection.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <CardContent className="p-5 flex-grow">
                      <h3 className="font-bold text-lg text-gray-900 group-hover:text-primary transition-colors">
                        {collection.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Explore hand-picked spots
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* COMING SOON SECTION */}
          <div className="mt-20 md:mt-32 relative">
            <div className="text-center mb-8">
              <span className="bg-primary/10 text-primary text-sm font-bold tracking-wider uppercase px-4 py-1.5 rounded-full">
                Coming Soon
              </span>
              <h2 className="text-2xl md:text-3xl font-bold mt-4 text-gray-900">
                More ways to explore
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 opacity-60 grayscale-[30%] pointer-events-none">
              {[
                {
                  title: "Time Machine",
                  icon: Clock,
                  desc: "Explore restaurants from different eras.",
                },
                {
                  title: "Price Pulse",
                  icon: TrendingUp,
                  desc: "Track price trends and find the best deals.",
                },
                {
                  title: "Food Journey",
                  icon: Utensils,
                  desc: "Embark on a guided culinary adventure.",
                },
                {
                  title: "Social Dining",
                  icon: Users,
                  desc: "Connect with fellow food lovers.",
                },
              ].map((feature, index) => (
                <Card
                  key={index}
                  className="border-gray-200 shadow-none rounded-2xl"
                >
                  <CardHeader className="pb-2">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                      <feature.icon className="h-5 w-5 text-gray-500" />
                    </div>
                    <CardTitle className="text-lg font-bold text-gray-700">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {feature.desc}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showSignIn && (
        <SignInOverlay
          onClose={() => setShowSignIn(false)}
          onSuccess={handleSignInSuccess}
        />
      )}
    </>
  );
}
