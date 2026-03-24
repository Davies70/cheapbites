import { getFromCache, saveToCache } from "@/lib/cacheUtils";
import { FSQSearchResponse } from "@/types/places";

const fetchPlaces = async (
  params: Record<string, string>,
  apiKey: string, // Pass apiKey in to guarantee Next.js reads it at runtime
): Promise<FSQSearchResponse | null> => {
  const queryParams = new URLSearchParams(params).toString();
  const url = `https://places-api.foursquare.com/places/search?${queryParams}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
        "X-Places-Api-Version": "2025-06-17",
      },
    });

    if (response.ok) {
      return await response.json();
    } else {
      console.error(
        "Places fetch failed:",
        response.status,
        response.statusText,
      );
    }
  } catch (error) {
    console.error("Error fetching places:", error);
  }
  return null;
};

export async function GET(
  req: Request,
  { params }: { params: { slug: string[] } },
) {
  // 1. Grab the key from process.env.z INSIDE the handler
  const apiKey = process.env.z;

  if (!apiKey) {
    return new Response(
      JSON.stringify({ ok: false, status: 500, message: "API Key is missing" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  const { slug } = params;

  if (slug.length < 3) {
    return new Response(
      JSON.stringify({
        ok: false,
        status: 400,
        message: "Invalid parameters",
        places: [],
        context: {},
      }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  const lat = slug[1];
  const lon = slug[2];
  const catId = slug[3] ? slug[3] : "63be6904847c3692a84b9bb5";
  const isSearch = slug[0] === "search";

  const queryParams = {
    ll: `${lat},${lon}`,
    limit: "50",
    fsq_category_ids: catId, // Food & Dining
    radius: "50000",
    ...(isSearch
      ? {}
      : { query: "food & drinks", sort: "RATING", limit: "10" }),
  };

  const cacheKey = isSearch
    ? `search_${catId}_${lat}_${lon}`
    : `trending_${lat}_${lon}`;

  const cachedData = await getFromCache(cacheKey, "places");

  if (cachedData) {
    return new Response(
      JSON.stringify({
        ok: true,
        status: 200,
        message: isSearch
          ? "Places fetched successfully"
          : "Trending restaurants fetched successfully",
        places: cachedData,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  }

  // 2. Pass the apiKey to your fetch helper
  const placesData = await fetchPlaces(queryParams, apiKey);

  // 3. CHANGED 404 TO 200: Returns a graceful empty array instead of crashing
  if (!placesData || placesData.results?.length === 0) {
    return new Response(
      JSON.stringify({
        ok: true,
        status: 200,
        message: isSearch ? "No places found" : "No trending restaurants found",
        places: [],
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  }

  await saveToCache(cacheKey, placesData.results, 10, "places");

  return new Response(
    JSON.stringify({
      ok: true,
      status: 200,
      message: isSearch
        ? "Places fetched successfully"
        : "Trending restaurants fetched successfully",
      places: placesData.results,
    }),
    { status: 200, headers: { "Content-Type": "application/json" } },
  );
}
