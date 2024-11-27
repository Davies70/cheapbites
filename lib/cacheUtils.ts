import PlaceCache from '@/models/placeCache';
import PlacesCache from '@/models/placesCache';
import { connectToDatabase } from '@/lib/mongodb';
import mongoose from 'mongoose';
import { PlaceDetails, ReturnedPlace } from '@/types/places';

async function saveToCache(
  key: string,
  value: ReturnedPlace[] | PlaceDetails,
  ttlInDays: number,
  cacheType: 'places' | 'place'
) {
  try {
    await connectToDatabase();
    const ttl = new Date(Date.now() + ttlInDays * 24 * 60 * 60 * 1000);
    const Cache = cacheType === 'places' ? PlacesCache : PlaceCache;
    const cacheEntry = new Cache({ key, value, ttl });
    await cacheEntry.save();
    console.log('Saved to cache');
    // await closeDatabase();
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      throw new Error('Validation error');
    }
    if (error instanceof mongoose.Error.CastError) {
      throw new Error('Cast error');
    }
    if (error instanceof mongoose.Error) {
      throw new Error('Mongoose error');
    }
    throw new Error(`Error saving to cache: ${error}`);
  }
}

async function getFromCache(key: string, cacheType: 'places' | 'place') {
  try {
    await connectToDatabase();
    let cacheEntry;
    if (cacheType === 'places') {
      cacheEntry = await PlacesCache.findOne({ key });
    } else {
      cacheEntry = await PlaceCache.findOne({ key });
    }
    console.log('getting from cache');
    if (!cacheEntry) {
      console.log('Cache miss');
      return null;
    }

    // Check if the entry is expired
    if (cacheEntry.ttl < new Date()) {
      console.log('Cache entry expired');
      await cacheEntry.delete();
    }

    console.log('Cache hit');
    // await closeDatabase();
    return cacheEntry.value;
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      throw new Error('Validation error');
    }
    if (error instanceof mongoose.Error.CastError) {
      throw new Error('Cast error');
    }
    if (error instanceof mongoose.Error) {
      throw new Error('Mongoose error');
    }
    throw new Error(`Error getting from cache: ${error}`);
  }
}

export { saveToCache, getFromCache };
