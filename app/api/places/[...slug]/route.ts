import { PlacesResponse } from '@/types/places';
// import { data as dataFromDB } from '../../../../db';
import { getDataFromCache, setDataToCache } from '@/app/api/cache';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(
  req: Request,
  { params }: { params: { slug: string[] } }
) {
  const { slug } = params;

  const apiKey = process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY;

  let placesRes: PlacesResponse = {
    ok: false,
    status: 404,
    message: 'Places not found',
    places: [],
    context: {},
  };

  switch (slug[0]) {
    case 'search':
      // placesRes = {
      //   ok: true,
      //   status: 200,
      //   places: dataFromDB.results,
      //   context: dataFromDB.context,
      //   message: 'Places found',
      // };

      const searchParams = {
        limit: '10',
        categories: '13000',
        ll: `${slug[1]},${slug[2]}`,
      };

      const params = new URLSearchParams(searchParams).toString();
      const searchUrl = `https://api.foursquare.com/v3/places/search?${params}`;

      const cacheKeyForSearch = `search-${slug[1]}-${slug[2]}`;

      const cachedData = await getDataFromCache(cacheKeyForSearch, 'places');

      if (cachedData) {
        return new Response(JSON.stringify(cachedData), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      } else {
        try {
          const response = await fetch(searchUrl, {
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
              message: 'Places fetched successfully',
            };
            await setDataToCache(cacheKeyForSearch, placesRes, 'places');
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
          console.error('Network error fetching places:', error);
          placesRes = {
            ok: false,
            status: 500,
            message: 'Failed to fetch places',
            context: {},
            places: [],
          };
        }
      }

      break;

    case 'trending': {
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
      const cacheKeyForTrending = `trending-${slug[1]}-${slug[2]}`;

      console.log('Cache key:', cacheKeyForTrending);
      const cachedData = await getDataFromCache(cacheKeyForTrending, 'places');

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
          await setDataToCache(cacheKeyForTrending, placesRes, 'places');
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
