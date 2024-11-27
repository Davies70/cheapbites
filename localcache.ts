'use client';

import { Place } from './types/places';
import { Image } from './types/images';

// Utility function to get the current timestamp in seconds
const getCurrentTimestamp = (): number => Math.floor(Date.now() / 1000);

type CacheData = Place[] | Image[];

export function getFromCache<T>(key: string): any | null {
  try {
    const cachedData = localStorage.getItem(key);
    if (!cachedData) return null;

    const { value, expiry } = JSON.parse(cachedData);

    // Check if the cached data has expired
    if (getCurrentTimestamp() > expiry) {
      localStorage.removeItem(key); // Clean up expired data
      return null;
    }

    return value;
  } catch (error) {
    console.error('Error retrieving data from cache:', error);
    return null;
  }
}

/**
 * Stores data in localStorage cache with a specified TTL.
 * @param key - The key to store the data under.
 * @param value - The value to store in the cache.
 * @param ttlInSeconds - The time-to-live for the cached data in seconds.
 */
export function setToCache<T>(
  key: string,
  value: any,
  ttlInSeconds: number
): void {
  try {
    const expiry = getCurrentTimestamp() + ttlInSeconds;
    const cacheData = JSON.stringify({ value, expiry });
    localStorage.setItem(key, cacheData);
  } catch (error) {
    console.error('Error storing data to cache:', error);
  }
}
