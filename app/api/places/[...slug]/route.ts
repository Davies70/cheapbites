// // import { FoursquareSearchResponse, Place } from '@/types/places';
// import { Image } from '@/types/images';
// // import { PlaceWithImages, ReturnedPlace } from '@/types/places';
// import { getFromCache, saveToCache } from '@/lib/cacheUtils';
// import { FSQSearchResponse, FSQPlace } from '@/types/places';

// const apiKey = process.env.z || '';

// const fetchTrendingImages = async (id: string): Promise<Image[]> => {
//   try {
//     const imageParams = new URLSearchParams({
//       classifications: 'food',
//     }).toString();

//     // const url = `https://api.foursquare.com/v3/places/${id}/photos?${imageParams}`;

//     const url = `https://places-api.foursquare.com/places/${id}/photos?${imageParams}`;

//     const response = await fetch(url, {
//       headers: {
//         Authorization: `Bearer ${apiKey}`,
//         Accept: 'application/json',
//         'X-Places-API-Version': '2025-06-17',
//       },
//     });

//     if (response.ok) {
//       const data = await response.json();
//       return data.length > 0 ? data : [];
//     } else {
//       console.error('Image fetch failed:', response.statusText);
//     }
//   } catch (error) {
//     console.error('Error fetching images:', error);
//   }
//   return [];
// };

// const mapPlacesToImages = async (
//   places: Place[]
// ): Promise<PlaceWithImages[]> => {
//   return Promise.all(
//     places.map(async (place) => {
//       const images = await fetchTrendingImages(place.fsq_id);
//       return { place, images };
//     })
//   );
// };

// const fetchPlaces = async (
//   params: Record<string, string>
// ): Promise<FSQSearchResponse | null> => {
//   const queryParams = new URLSearchParams(params).toString();
//   // const url = `https://api.foursquare.com/v3/places/search?${queryParams}`;

//   const url = `
// https://places-api.foursquare.com/places/search?${queryParams}`;

//   try {
//     const response = await fetch(url, {
//       headers: {
//         Authorization: `Bearer ${apiKey}`,
//         Accept: 'application/json',
//         'X-Places-API-Version': '2025-06-17',
//       },
//     });

//     if (response.ok) {
//       const data = await response.json();
//       return data;
//     } else {
//       console.error('Places fetch failed:', response.statusText);
//     }
//   } catch (error) {
//     console.error('Error fetching places:', error);
//   }
//   return null;
// };

// export async function GET(
//   req: Request,
//   { params }: { params: { slug: string[] } }
// ) {
//   const { slug } = params;

//   if (slug.length < 3) {
//     return new Response(
//       JSON.stringify({
//         ok: false,
//         status: 400,
//         message: 'Invalid parameters',
//         places: [],
//         context: {},
//       }),
//       { status: 400 }
//     );
//   }

//   const lat = slug[1];
//   const lon = slug[2];
//   const catId = slug[3] ? slug[3] : '13000';
//   const isSearch = slug[0] === 'search';
//   const queryParams = {
//     ll: `${lat},${lon}`,
//     limit: '50',
//     categories: catId, // Food & Dining
//     ...(isSearch ? {} : { query: 'restaurant', sort: 'RATING', limit: '10' }),
//   };

//   const cacheKey = isSearch
//     ? `search_${catId}_${lat}_${lon}`
//     : `trending_${lat}_${lon}`;

//   const cachedData = await getFromCache(cacheKey, 'places');

//   if (cachedData) {
//     return new Response(
//       JSON.stringify({
//         ok: true,
//         status: 200,
//         message: isSearch
//           ? 'Places fetched successfully'
//           : 'Trending restaurants fetched successfully',
//         places: cachedData,
//       }),
//       { status: 200 }
//     );
//   }

//   const placesData = await fetchPlaces(queryParams);

//   console.log('placesData', placesData);

//   if (!placesData || placesData.results.length === 0) {
//     return new Response(
//       JSON.stringify({
//         ok: false,
//         status: 404,
//         message: isSearch ? 'No places found' : 'No trending restaurants found',
//         places: [],
//       }),
//       { status: 404 }
//     );
//   }

//   const placesWithImages = await mapPlacesToImages(placesData.results);

//   const returnedPlaces: ReturnedPlace[] = placesWithImages.map(
//     ({ place, images }) => ({
//       id: place.fsq_id,
//       name: place.name,
//       categories: place.categories,
//       address: place.location.address || 'Unknown',
//       lat: place.geocodes.roof?.latitude,
//       lon: place.geocodes.roof?.longitude,
//       distance: place.distance,
//       images,
//       geocodes: place.geocodes,
//     })
//   );

//   await saveToCache(cacheKey, returnedPlaces, 10, 'places');
//   console.log('returned1', returnedPlaces[0]);
//   return new Response(
//     JSON.stringify({
//       ok: true,
//       status: 200,
//       message: isSearch
//         ? 'Places fetched successfully'
//         : 'Trending restaurants fetched successfully',
//       places: returnedPlaces,
//     }),
//     { status: 200 }
//   );
// }

// import { FoursquareSearchResponse, Place } from '@/types/places';
import { getFromCache, saveToCache } from '@/lib/cacheUtils';
import { FSQSearchResponse } from '@/types/places';

const apiKey = process.env.z || '';

// const fetchTrendingImages = async (id: string): Promise<FSQPhoto[]> => {
//   try {
//     const imageParams = new URLSearchParams({
//       classifications:
//         'exhibit,facilities,food_or_drink,indoor_facilities_and_classrooms,indoor_general,indoor_or_ambience,logos,menu,monuments_and_landmark_buildings,outdoor,outdoor_building_and_grounds,outdoor_building_exterior,outdoor_grounds,outdoor_or_storefront,outdoor_scenery,product',
//     }).toString();

//     // const url = `https://api.foursquare.com/v3/places/${id}/photos?${imageParams}`;

//     const url = `https://places-api.foursquare.com/places/${id}/photos?${imageParams}`;

//     const response = await fetch(url, {
//       headers: {
//         Authorization: `Bearer ${apiKey}`,
//         Accept: 'application/json',
//         'X-Places-API-Version': '2025-06-17',
//       },
//     });

//     if (response.ok) {
//       const data = await response.json();
//       return data.length > 0 ? data : [];
//     } else {
//       console.error('Image fetch failed:', response.statusText);
//     }
//   } catch (error) {
//     console.error('Error fetching images:', error);
//   }
//   return [];
// };

// const mapPlacesToImages = async (places: FSQPlace[]): Promise<FSQPlace[]> => {
//   return Promise.all(
//     places.map(async (place) => {
//       const images = await fetchTrendingImages(place.fsq_place_id);
//       place.photos = images;
//       return place;
//     })
//   );
// };

const fetchPlaces = async (
  params: Record<string, string>
): Promise<FSQSearchResponse | null> => {
  const queryParams = new URLSearchParams(params).toString();

  const url = `https://places-api.foursquare.com/places/search?${queryParams}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: 'application/json',
        'X-Places-API-Version': '2025-06-17',
      },
    });

    if (response.ok) {
      return await response.json();
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
  const catId = slug[3] ? slug[3] : '13000';
  const isSearch = slug[0] === 'search';

  const queryParams = {
    ll: `${lat},${lon}`,
    limit: '50',
    categories: catId, // Food & Dining
    ...(isSearch ? {} : { query: 'restaurant', sort: 'RATING', limit: '10' }),
  };

  const cacheKey = isSearch
    ? `search_${catId}_${lat}_${lon}`
    : `trending_${lat}_${lon}`;

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

  // const placesWithImages = await mapPlacesToImages(placesData.results);

  await saveToCache(cacheKey, placesData.results, 10, 'places');

  return new Response(
    JSON.stringify({
      ok: true,
      status: 200,
      message: isSearch
        ? 'Places fetched successfully'
        : 'Trending restaurants fetched successfully',
      places: placesData.results,
    }),
    { status: 200 }
  );
}
