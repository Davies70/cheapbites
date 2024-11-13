import { PlacesResponse } from '@/types/places';
import { data } from '../../../../db';
import { getDataFromCache, setDataToCache } from '@/app/api/cache';


export async function GET(
  req: Request,
  { params }: { params: { slug: string[] } }
) {
  const { slug } = params;

  let placesRes: PlacesResponse = {
    ok: false,
    status: 404,
    message: 'Places not found',
    places: [],
    context: {},
  };

  switch (slug[0]) {
    case 'search':
      placesRes = {
        ok: true,
        status: 200,
        places: data.results,
        context: data.context,
        message: 'Places found',
      };
      break;

    case 'trending': {
      const apiKey = process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY;

      // Define parameters for Foursquare API
      const trendingParams = {
        query: 'restaurant',
        limit: '10',
        sort: 'RATING', // Standard sort option
        categories: '13000', // Category ID for Food & Dining,
        ll: `${slug[1]},${slug[2]}`,
      };

      // Construct query parameters
      const queryParams = new URLSearchParams(trendingParams).toString();
      const url = `https://api.foursquare.com/v3/places/search?${queryParams}`;

      // Check if the data is already cached
      const cacheKeyForTrending = 'trending';
      const cachedData = getDataFromCache(cacheKeyForTrending);

      if (cachedData) {
        return new Response(JSON.stringify(cachedData), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `${apiKey}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          placesRes = {
            ok: true,
            status: 200,
            places: data.results,
            context: data.context,
            message: 'Trending restaurants fetched successfully',
          };
          setDataToCache(cacheKeyForTrending, placesRes);
        } else {
          console.error('Foursquare API error:', response.statusText);
          placesRes = {
            ok: false,
            status: response.status,
            message: `Error: ${response.statusText}`,
            context: {},
            places: [],
          };
        }
      } catch (error) {
        console.error('Network error fetching trending restaurants:', error);
        placesRes = {
          ok: false,
          status: 500,
          message: 'Failed to fetch trending restaurants',
          context: {},
          places: [],
        };
      }
      break;
    }

    default:
      placesRes.message = 'Invalid endpoint';
      break;
  }

  return new Response(JSON.stringify(placesRes), {
    status: placesRes.status,
    headers: { 'Content-Type': 'application/json' },
  });
}
