import NodeCache from 'node-cache';
import { PlacesResponse } from '@/types/places';
import { ImagesResponse } from '@/types/images';

const cacheOptions = {
  stdTTL: 30 * 24 * 60 * 60, // 30 days in seconds
};
const cache = new NodeCache(cacheOptions);
const getDataFromCache = (key: string) => {
  console.log(`Getting data with ${key} from cache`);
  return cache.get(key);
};

const setDataToCache = (key: string, data: PlacesResponse | ImagesResponse) => {
  console.log(`Setting data with ${key} to cache`);
  return cache.set(key, data);
};

export { getDataFromCache, setDataToCache };
