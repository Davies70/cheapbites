import { connectToDatabase, handleMongooseError } from './mongodb';
import User from '@/models/user';
import { ReturnedPlace } from '@/types/places';
import { User as UserType, Review, SavedPlace } from '@/types/user';

export const getORCreateUser = async (
  email: string
): Promise<UserType | null> => {
  try {
    await connectToDatabase();
    const user = await User.findOne({ email });
    if (!user) {
      const newUser = new User({ email });
      await newUser.save();
      console.log('User created: ' + email);
      return newUser.toObject();
    }
    console.log('User found: ' + email);
    return user.toObject();
  } catch (error) {
    handleMongooseError(error, 'Error getting user');
  }
  return null;
};

export const saveReview = async (
  email: string,
  review: Review
): Promise<UserType | null> => {
  try {
    await connectToDatabase();
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }
    const existingReviewIndex = user.reviews.findIndex(
      (r: Review) => r.placeId === review.placeId
    );
    if (existingReviewIndex !== -1) {
      user.reviews[existingReviewIndex] = review;
    } else {
      user.reviews.push(review);
    }
    await user.save();
    console.log('Review added');
    return user.toObject();
  } catch (error) {
    handleMongooseError(error, 'Error adding review');
  }
  return null;
};

export const deleteReview = async (
  email: string,
  placeId: string
): Promise<UserType | null> => {
  try {
    await connectToDatabase();
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }
    const reviewIndex = user.reviews.findIndex(
      (r: Review) => r.placeId === placeId
    );
    if (reviewIndex === -1) {
      throw new Error('Review not found');
    }
    user.reviews.splice(reviewIndex, 1);

    await user.save();
    console.log('Review deleted');
    return user.toObject();
  } catch (error) {
    handleMongooseError(error, 'Error deleting review');
  }
  return null;
};

export const createRecommendations = async (
  email: string,
  recommendations: ReturnedPlace[]
): Promise<UserType | null> => {
  try {
    await connectToDatabase();
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }
    user.recommendations = recommendations;
    await user.save();
    console.log('Recommendations added');
    return user.toObject();
  } catch (error) {
    handleMongooseError(error, 'Error adding recommendations');
  }
  return null;
};

export const addOrRemoveSavedPlace = async (
  email: string,
  savedPlace: SavedPlace
): Promise<UserType | null> => {
  try {
    await connectToDatabase();
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }
    const existingPlaceIndex = user.saved.findIndex(
      (place: SavedPlace) => place.id === savedPlace.id
    );
    if (existingPlaceIndex !== -1) {
      user.saved.splice(existingPlaceIndex, 1);
      console.log('Saved place removed');
    } else {
      user.saved.push(savedPlace);
      console.log('Saved place added');
    }
    await user.save();
    return user.toObject();
  } catch (error) {
    handleMongooseError(error, 'Error adding or removing saved place');
  }
  return null;
};

export const addOrRemoveVisitedPlace = async (
  email: string,
  visitedPlace: SavedPlace
): Promise<UserType | null> => {
  try {
    await connectToDatabase();
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }
    const existingPlaceIndex = user.visited.findIndex(
      (place: SavedPlace) => place.id === visitedPlace.id
    );
    if (existingPlaceIndex !== -1) {
      user.visited.splice(existingPlaceIndex, 1);
      console.log('Visited place removed');
    } else {
      user.visited.push(visitedPlace);
      console.log('Visited place added');
    }
    await user.save();
    return user.toObject();
  } catch (error) {
    handleMongooseError(error, 'Error adding or removing visited place');
  }
  return null;
};

export const addDietaryPreference = async (
  email: string,
  preference: string
): Promise<UserType | null> => {
  try {
    await connectToDatabase();
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }
    user.dietaryPreferences.push(preference);
    await user.save();
    console.log('Dietary preference added');
    return user.toObject();
  } catch (error) {
    handleMongooseError(error, 'Error adding dietary preference');
  }
  return null;
};
