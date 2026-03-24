export default async function getClientLocation(): Promise<{
  latitude: number;
  longitude: number;
} | null> {
  // 1. Wrap the HTML5 Web API in a Promise
  const getBrowserLocation = () => {
    return new Promise<{ latitude: number; longitude: number }>(
      (resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error("Geolocation is not supported by your browser"));
        } else {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              resolve({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
            },
            (error) => {
              reject(error);
            },
            {
              enableHighAccuracy: true, // Forces GPS over Wi-Fi/IP if available
              timeout: 10000, // 10 seconds before failing
              maximumAge: 0, // Don't use a cached location
            },
          );
        }
      },
    );
  };

  try {
    // 2. Attempt to get exact GPS coordinates first
    const location = await getBrowserLocation();
    return location;
  } catch (error) {
    console.warn(
      "Browser geolocation failed or was denied. Falling back to IP-based location...",
      error,
    );

    // 3. Fallback to your internal Next.js backend route
    // This uses your existing backend logic and keeps your API key secure!
    try {
      const res = await fetch("/api/location");
      if (!res.ok) throw new Error("Backend IP location failed");

      const data = await res.json();
      return {
        latitude: data.location.latitude,
        longitude: data.location.longitude,
      };
    } catch (fallbackError) {
      console.error("All location methods failed:", fallbackError);
      return null;
    }
  }
}
