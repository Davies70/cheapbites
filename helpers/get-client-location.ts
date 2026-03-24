const CACHE_KEY = "cheapbites_user_location";
const CACHE_TIME_LIMIT_MS = 15 * 60 * 1000; // 15 minutes in milliseconds

export default async function getClientLocation(): Promise<{
  latitude: number;
  longitude: number;
} | null> {
  // 1. Check if we have a valid cached location
  try {
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
      const { latitude, longitude, timestamp } = JSON.parse(cachedData);

      // If the cache is less than 15 minutes old, return it instantly!
      if (Date.now() - timestamp < CACHE_TIME_LIMIT_MS) {
        return { latitude, longitude };
      }
    }
  } catch (error) {
    console.warn("Failed to read location from cache", error);
  }

  // 2. Wrap the HTML5 Web API in a Promise
  const getBrowserLocation = () => {
    return new Promise<{ latitude: number; longitude: number }>(
      (resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error("Geolocation is not supported by your browser"));
        } else {
          navigator.geolocation.getCurrentPosition(
            (position) =>
              resolve({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              }),
            (error) => reject(error),
            {
              enableHighAccuracy: true,
              timeout: 10000,
              maximumAge: 0,
            },
          );
        }
      },
    );
  };

  let finalLocation: { latitude: number; longitude: number } | null = null;

  try {
    // 3. Attempt to get exact GPS coordinates
    finalLocation = await getBrowserLocation();
  } catch (error) {
    console.warn(
      "Browser geolocation failed. Falling back to IP-based location...",
      error,
    );

    // 4. Fallback to your internal Next.js backend route
    try {
      const res = await fetch("/api/location");
      if (res.ok) {
        const data = await res.json();
        finalLocation = {
          latitude: data.location.latitude,
          longitude: data.location.longitude,
        };
      }
    } catch (fallbackError) {
      console.error("All location methods failed:", fallbackError);
    }
  }

  // 5. If we successfully got a location, save it to the cache before returning
  if (finalLocation) {
    try {
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          ...finalLocation,
          timestamp: Date.now(),
        }),
      );
    } catch (error) {
      console.warn("Failed to save location to cache", error);
    }
  }

  return finalLocation;
}
