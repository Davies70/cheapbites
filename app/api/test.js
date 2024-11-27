import { PrismaClient } from '@prisma/client';
import { DateTime } from 'luxon';

const prisma = new PrismaClient();

// Utility function to generate a test key
const generateTestKey = () => `test_key_${Date.now()}`;

// Upsert function for PlaceCache
export async function upsertPlaceCache(key, newValue) {
  try {
    const expirationTime = DateTime.now().plus({ hours: 1 }).toJSDate();

    const upsertedPlace = await prisma.placeCache.upsert({
      where: { key },
      update: {
        value: newValue,
        ttl: expirationTime,
      },
      create: {
        key,
        value: newValue,
        ttl: expirationTime,
      },
    });

    console.log('PlaceCache upserted:', upsertedPlace);
    return upsertedPlace;
  } catch (error) {
    console.error('PlaceCache Upsert Failed:', error);
    throw error;
  }
}

// Upsert function for ImagesCache
export async function upsertImagesCache(key, newValue) {
  try {
    const expirationTime = DateTime.now().plus({ hours: 2 }).toJSDate();

    const upsertedImages = await prisma.imagesCache.upsert({
      where: { key },
      update: {
        value: newValue,
        ttl: expirationTime,
      },
      create: {
        key,
        value: newValue,
        ttl: expirationTime,
      },
    });

    console.log('ImagesCache upserted:', upsertedImages);
    return upsertedImages;
  } catch (error) {
    console.error('ImagesCache Upsert Failed:', error);
    throw error;
  }
}

// Example test function demonstrating upsert
export async function testUpsertOperations() {
  try {
    // PlaceCache upsert test
    const placeCacheKey = generateTestKey();
    const initialPlaceValue = {
      places: [{ name: 'Initial Place' }],
      ok: true,
      status: 200,
      message: 'Initial place data',
      context: {},
    };

    const updatedPlaceValue = {
      ...initialPlaceValue,
      message: 'Updated place data',
    };

    // First upsert (create)
    await upsertPlaceCache(placeCacheKey, initialPlaceValue);

    // Second upsert (update)
    const upsertedPlace = await upsertPlaceCache(
      placeCacheKey,
      updatedPlaceValue
    );

    // ImagesCache upsert test
    const imagesCacheKey = generateTestKey();
    const initialImagesValue = {
      ok: true,
      status: 200,
      message: 'Initial images',
      images: [{ url: 'https://example.com/initial.jpg' }],
    };

    const updatedImagesValue = {
      ...initialImagesValue,
      message: 'Updated images',
      images: [
        ...initialImagesValue.images,
        { url: 'https://example.com/additional.jpg' },
      ],
    };

    // First upsert (create)
    await upsertImagesCache(imagesCacheKey, initialImagesValue);

    // Second upsert (update)
    const upsertedImages = await upsertImagesCache(
      imagesCacheKey,
      updatedImagesValue
    );

    console.log('Upsert Tests Completed Successfully');
    return {
      placeCache: upsertedPlace,
      imagesCache: upsertedImages,
    };
  } catch (error) {
    console.error('Upsert Tests Failed:', error);
    throw error;
  }
}

// Existing test functions remain the same...
export async function testPlaceCache() {
  // ... (previous implementation)
}

export async function testImagesCache() {
  // ... (previous implementation)
}

export async function runCacheTests() {
  console.log('Starting Cache Model Tests...');

  const placesCacheTest = await testPlaceCache();
  const imagesCacheTest = await testImagesCache();
  const upsertTest = await testUpsertOperations();

  console.log('Place Cache Test:', placesCacheTest ? 'PASSED' : 'FAILED');
  console.log('Images Cache Test:', imagesCacheTest ? 'PASSED' : 'FAILED');
  console.log('Upsert Tests:', upsertTest ? 'PASSED' : 'FAILED');

  return {
    placesCacheTest,
    imagesCacheTest,
    upsertTest: !!upsertTest,
    overallResult: placesCacheTest && imagesCacheTest && !!upsertTest,
  };
}

await runCacheTests();

// Call the test runner if this file is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runCacheTests()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Test Suite Failed:', error);
      process.exit(1);
    });
}
