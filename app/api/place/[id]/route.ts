import { PlaceResponse } from '@/types/place';
import { saveToCache, getFromCache } from '@/lib/cacheUtils';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  let placeRes: PlaceResponse = {
    ok: false,
    status: 404,
    message: 'Place not found',
  };

  const cachedData = await getFromCache(`place_${id}`, 'place');

  if (cachedData) {
    placeRes = {
      ok: true,
      status: 200,
      message: 'Place found in cache',
      placeResponse: cachedData,
    };

    return new Response(JSON.stringify(placeRes), {
      status: 200,
      headers: { Accept: 'application/json' },
    });
  }

  const apiKey = process.env.z;
  if (!apiKey) {
    return new Response(
      JSON.stringify({
        ok: false,
        status: 500,
        message: 'API Key is missing',
      }),
      { status: 500, headers: { Accept: 'application/json' } }
    );
  }

  const placeParams = {
    fsq_place_id: id,
    // fields:
    //   'name,geocodes,location,categories,distance,closed_bucket,description,tel,fax,email,website,social_media,verified,hours,hours_popular,rating,popularity,price,menu,date_closed,photos,tips,tastes,features,store_id',
  };

  const paramsString = new URLSearchParams(placeParams).toString();

  const url = `https://places-api.foursquare.com/places/${id}?${paramsString}`;
  const cacheKey = `place_${id}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: 'application/json',
        'X-Places-API-Version': '2025-06-17',
      },
    });

    if (response.ok) {
      const data = await response.json();
      await saveToCache(cacheKey, data, 0.25, 'place');
      placeRes = {
        ok: true,
        status: 200,
        message: 'Place found successfully',
        placeResponse: data,
      };
    } else {
      const errorData = await response.json().catch(() => ({}));
      console.error('Foursquare API Error:', errorData);
      placeRes = {
        ok: false,
        status: response.status,
        message: errorData.message || response.statusText || 'Unknown error',
      };
    }
  } catch (error) {
    console.error('Network error:', error);
    placeRes = {
      ok: false,
      status: 500,
      message: 'Failed to fetch place data',
    };
  }

  return new Response(JSON.stringify(placeRes), {
    status: placeRes.status,
    headers: { Accept: 'application/json' },
  });
}
