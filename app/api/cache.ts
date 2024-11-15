import { PrismaClient } from '@prisma/client';
import { ImageResponse } from '@/types/images';
import { PlaceResponse, PlacesResponse } from '@/types/places';

const prisma = new PrismaClient();

// Define cache types as constants for easy reuse
type CacheType = 'place' | 'image' | 'other' | 'places' | 'images';

// Generic function to get the specific model
const getModel = <T>(type: CacheType): T => {
  switch (type) {
    case 'place':
      return prisma.placeCache as unknown as T;
    case 'places':
      return prisma.placesCache as unknown as T;
    case 'image':
      return prisma.imageCache as unknown as T;
    case 'images':
      return prisma.imagesCache as unknown as T;
    case 'other':
      return prisma.otherCache as unknown as T;
    default:
      throw new Error(`Unknown cache type: ${type}`);
  }
};

// Set data to cache with upsert
export const setDataToCache = async <T>(
  key: string,
  data: ImageResponse | PlaceResponse | PlacesResponse,
  type: CacheType
): Promise<T> => {
  const model = getModel<T>(type);
  const ttl = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days from now
  const serializedData = JSON.stringify(data);

  console.log(`Setting data with key ${key} in ${type} cache`);

  // Use upsert with dynamic model type
  return await (model as any).upsert({
    where: { key },
    update: { value: serializedData, ttl },
    create: { key, value: serializedData, ttl },
  });
};

// Get data from cache
export const getDataFromCache = async <T>(
  key: string,
  type: CacheType
): Promise<T | null> => {
  const model = getModel<T>(type);

  const cacheEntry = await (model as any).findUnique({
    where: { key },
  });

  if (
    cacheEntry &&
    Math.floor(cacheEntry.ttl) > Math.floor(Date.now() / 1000)
  ) {
    try {
      console.log(`Data with ${key} found in ${type} cache`);
      return JSON.parse(cacheEntry.value) as T;
    } catch (error) {
      console.error(
        `Error parsing cached data for key ${key} in ${type} cache:`,
        error
      );
      return null;
    }
  }

  console.log(`Data with ${key} not found in ${type} cache or expired`);
  return null;
};

// Delete data from cache
export const deleteDataFromCache = async (
  key: string,
  type: CacheType
): Promise<void> => {
  const model = getModel<any>(type);

  try {
    await (model as any).delete({
      where: { key },
    });
    console.log(`Data with key ${key} deleted from ${type} cache`);
  } catch (error) {
    console.error(`Error deleting cached data for key ${key} in ${type} cache:`, error);
  }
};