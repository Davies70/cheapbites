import { connectToDatabase, handleMongooseError } from './mongodb';
import User from '@/models/user';
import { ReturnedPlace } from '@/types/places';
import { User as UserType, Review, Place, SavedPlace } from '@/types/user';

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
    user.reviews.push(review);
    await user.save();
    console.log('Review added');
    return user.toObject();
  } catch (error) {
    handleMongooseError(error, 'Error adding review');
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

export const addSavedPlace = async (
  email: string,
  savedPlace: SavedPlace
): Promise<UserType | null> => {
  try {
    await connectToDatabase();
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }
    user.saved.push(savedPlace);
    await user.save();
    console.log('Saved place added');
    return user.toObject();
  } catch (error) {
    handleMongooseError(error, 'Error adding saved place');
  }
  return null;
};

export const addVisitedPlace = async (
  email: string,
  visitedPlace: SavedPlace
): Promise<UserType | null> => {
  try {
    await connectToDatabase();
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }
    user.visited.push(visitedPlace);
    await user.save();
    console.log('Visited place added');
    return user.toObject();
  } catch (error) {
    handleMongooseError(error, 'Error adding visited place');
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
