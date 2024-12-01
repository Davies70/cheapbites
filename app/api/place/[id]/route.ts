import { PlaceResponse, PlaceDetails } from '@/types/places';
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
    place: {},
  };

  const cachedData = await getFromCache(`place_${id}`, 'place');

  if (cachedData) {
    placeRes = {
      ok: true,
      status: 200,
      message: 'Place found in cache',
      place: cachedData,
    };
    return new Response(JSON.stringify(placeRes), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const apiKey = process.env.FOURSQUARE_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({
        ok: false,
        status: 500,
        message: 'API Key is missing',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const placeParams = {
    fsq_id: id,
    fields:
      'name,geocodes,location,categories,distance,closed_bucket,description,tel,fax,email,website,social_media,verified,hours,hours_popular,rating,popularity,price,menu,date_closed,photos,tips,tastes,features,store_id',
  };

  const paramsString = new URLSearchParams(placeParams).toString();

  const url = `https://api.foursquare.com/v3/places/${id}?${paramsString}`;
  const cacheKey = `place_${id}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      await saveToCache(cacheKey, data, 1, 'place');
      placeRes = {
        ok: true,
        status: 200,
        message: 'Place found successfully',
        place: data,
      };
    } else {
      const errorData = await response.json().catch(() => ({}));
      console.error('Foursquare API Error:', errorData);
      placeRes = {
        ok: false,
        status: response.status,
        message: errorData.message || response.statusText || 'Unknown error',
        place: {},
      };
    }
  } catch (error) {
    console.error('Network error:', error);
    placeRes = {
      ok: false,
      status: 500,
      message: 'Failed to fetch place data',
      place: {},
    };
  }

  return new Response(JSON.stringify(placeRes), {
    status: placeRes.status,
    headers: { 'Content-Type': 'application/json' },
  });
}
