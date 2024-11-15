import { ImageResponse } from '@/types/images';
import { getDataFromCache, setDataToCache } from '../../cache';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const apiKey = process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY;

  const imagesParams = {
    fsq_id: id,
    classifications: ['outdoor'],
  };

  const url = `https://api.foursquare.com/v3/places/${id}/photos?${imagesParams}`;

  const cacheKeyForImages = `images_${id}`;

  let imagesRes: ImageResponse = {
    ok: false,
    status: 404,
    message: 'Images not found',
    images: [],
  };

  // Check if the data is already cached
  const cachedData = await getDataFromCache(cacheKeyForImages, 'images');

  if (cachedData) {
    return new Response(JSON.stringify(cachedData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } else {
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `${apiKey}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        imagesRes = {
          ok: true,
          status: 200,
          images: data,
          message: 'Images found',
        };
        await setDataToCache(cacheKeyForImages, imagesRes, 'images');
      }
    } catch (error) {
      console.error('Failed to fetch images:', error);
    }
  }

  return new Response(JSON.stringify(imagesRes), {
    status: imagesRes.status,
    headers: { 'Content-Type': 'application/json' },
  });
}
