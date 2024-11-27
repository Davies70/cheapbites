import {
  PlacesResponse,
  FoursquareSearchResponse,
  Place,
  RelatedPlace,
} from '@/types/places';
import { Image } from '@/types/images';
import { PlaceWithImages, ReturnedPlace } from '@/types/places';
import { getFromCache, saveToCache } from '@/lib/cacheUtils';

const apiKey = process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY || '';

const fetchTrendingImages = async (id: string): Promise<Image[]> => {
  try {
    const imageParams = new URLSearchParams({
      classifications: 'food,indoor',
    }).toString();

    const url = `https://api.foursquare.com/v3/places/${id}/photos?${imageParams}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data.length > 0 ? data : [];
    } else {
      console.error('Image fetch failed:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching images:', error);
  }
  return [];
};

const mapPlacesToImages = async (
  places: Place[]
): Promise<PlaceWithImages[]> => {
  return Promise.all(
    places.map(async (place) => {
      const images = await fetchTrendingImages(place.fsq_id);
      return { place, images };
    })
  );
};

const fetchPlaces = async (
  params: Record<string, string>
): Promise<FoursquareSearchResponse | null> => {
  const queryParams = new URLSearchParams(params).toString();
  const url = `https://api.foursquare.com/v3/places/search?${queryParams}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('Places fetch failed:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching places:', error);
  }
  return null;
};

export async function GET(
  req: Request,
  { params }: { params: { slug: string[] } }
) {
  const { slug } = params;

  if (slug.length < 3) {
    return new Response(
      JSON.stringify({
        ok: false,
        status: 400,
        message: 'Invalid parameters',
        places: [],
        context: {},
      }),
      { status: 400 }
    );
  }

  const lat = slug[1];
  const lon = slug[2];
  const isSearch = slug[0] === 'search';
  const queryParams = {
    ll: `${lat},${lon}`,
    limit: '50',
    categories: '13000', // Food & Dining
    ...(isSearch ? {} : { query: 'restaurant', sort: 'RATING', limit: '10' }),
  };

  const cacheKey = isSearch ? `search_${lat}_${lon}` : `trending_${lat}_${lon}`;

  const cachedData = await getFromCache(cacheKey, 'places');

  if (cachedData) {
    return new Response(
      JSON.stringify({
        ok: true,
        status: 200,
        message: isSearch
          ? 'Places fetched successfully'
          : 'Trending restaurants fetched successfully',
        places: cachedData,
      }),
      { status: 200 }
    );
  }

  const placesData = await fetchPlaces(queryParams);

  if (!placesData || placesData.results.length === 0) {
    return new Response(
      JSON.stringify({
        ok: false,
        status: 404,
        message: isSearch ? 'No places found' : 'No trending restaurants found',
        places: [],
      }),
      { status: 404 }
    );
  }

  const placesWithImages = await mapPlacesToImages(placesData.results);

  const returnedPlaces: ReturnedPlace[] = placesWithImages.map(
    ({ place, images }) => ({
      id: place.fsq_id,
      name: place.name,
      categories: place.categories,
      address: place.location.address || 'Unknown',
      lat: place.geocodes.roof?.latitude,
      lon: place.geocodes.roof?.longitude,
      distance: place.distance,
      images,
    })
  );

  await saveToCache(cacheKey, returnedPlaces, 10, 'places');
  return new Response(
    JSON.stringify({
      ok: true,
      status: 200,
      message: isSearch
        ? 'Places fetched successfully'
        : 'Trending restaurants fetched successfully',
      places: returnedPlaces,
    }),
    { status: 200 }
  );
}
