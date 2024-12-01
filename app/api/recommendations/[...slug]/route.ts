import { FoursquareSearchResponse, Place } from '@/types/places';
import { Image } from '@/types/images';
import { PlaceWithImages, ReturnedPlace } from '@/types/places';
import { createRecommendations } from '@/lib/user';

const apiKey = process.env.FOURSQUARE_API_KEY || '';

// Cuisine category mappings
const cuisineCategoryMap: Record<string, string> = {
  italian: '13236', // Italian Restaurant
  mexican: '13303', // Mexican Restaurant
  asian: '13072', // Asian Restaurant, Sushi Restaurant
  american: '13068', // American Restaurant
  vegan: '13377', // Vegetarian / Vegan Restaurant
  indian: '13199', // Indian Restaurant
  african: '13067', // African Restaurant
  kosher: '13287', // Kosher Restaurant
  glutenfree: '13390',
  thai: '13352',
  halal: '13191', // Halal Restaurant
  french: '13148',
  japanese: '13263', // Japanese Restaurant
  chinese: '13099', // Chinese Restaurant
  default: '13000', // General Food & Dining
};

const getCategoryIds = (
  quizAnwser: string,
  dietaryPreferences: string
): string => {
  const quizId = cuisineCategoryMap[quizAnwser] || cuisineCategoryMap.default;
  const dietaryId = Object.keys(cuisineCategoryMap)
    .filter((key) => dietaryPreferences.includes(key))
    .map((key) => cuisineCategoryMap[key])
    .join(',');
  return `${quizId},${dietaryId}`;
};

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
      console.error(
        'Error fetching recommendations fetch failed:',
        response.statusText
      );
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
  if (!apiKey) {
    return new Response(
      JSON.stringify({
        ok: false,
        status: 500,
        message: 'API Key is missing',
        places: [],
      }),
      { status: 500 }
    );
  }

  if (params.slug.length < 3) {
    return new Response(
      JSON.stringify({
        ok: false,
        status: 400,
        message: 'Invalid parameters',
        places: [],
      }),
      { status: 400 }
    );
  }

  const lat = params.slug[0];
  const lon = params.slug[1];
  const email = params.slug[2] || 'ajayid89@gmail.com';
  const quizAnwerFromUser = params.slug[3] || '13000';
  const dietaryPreferencesFromUser = params.slug[4] || '';

  const catIds = getCategoryIds(quizAnwerFromUser, dietaryPreferencesFromUser);

  const queryParams = {
    ll: `${lat},${lon}`,
    limit: '10',
    categories: catIds,
    query: 'restaurant',
    sort: 'RATING',
  };

  const quizCode =
    quizAnwerFromUser.charAt(0).toUpperCase() + quizAnwerFromUser.slice(1);

  const placesData = await fetchPlaces(queryParams);

  if (!placesData || placesData.results.length === 0) {
    return new Response(
      JSON.stringify({
        ok: false,
        status: 404,
        message: `No ${quizCode} places found`,
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

  const user = await createRecommendations(email, returnedPlaces);

  if (!user) {
    return new Response(
      JSON.stringify({
        ok: false,
        status: 500,
        message: 'Error adding recommendations',
        places: [],
      }),
      { status: 500 }
    );
  }

  return new Response(
    JSON.stringify({
      ok: true,
      status: 200,
      message: `${quizCode} restaurants fetched successfully`,
      places: user.recommendations,
    }),
    { status: 200 }
  );
}
