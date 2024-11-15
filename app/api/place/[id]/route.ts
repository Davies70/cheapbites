import { PlaceResponse } from '@/types/places';
import { getDataFromCache, setDataToCache } from '../../cache';

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

  const apiKey = process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY;
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
    // await deleteDataFromCache(cacheKey, 'place');
    const cachedData = await getDataFromCache(cacheKey, 'place');
    if (cachedData) {
      return new Response(JSON.stringify(cachedData), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const response = await fetch(url, {
      headers: {
        Authorization: `${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      placeRes = {
        ok: true,
        status: 200,
        message: 'Place found successfully',
        place: data,
      };
      await setDataToCache(cacheKey, placeRes, 'place');
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
