import { ReturnedPlace } from './places';

type Icon = {
  prefix: string;
  suffix: string;
};

type Category = {
  id: string;
  name: string;
  plural_name: string;
  short_name: string;
  icon: Icon;
};

type Image = {
  id?: string;
  created_at?: string;
  prefix?: string;
  suffix?: string;
  width?: number;
  height?: number;
};

export type Place = {
  id: string;
  name: string;
  categories: Category[];
  address?: string;
  lat?: number;
  lon?: number;
  distance?: number;
  images?: Image[];
};

export type Review = {
  placeId: string;
  rating: number;
  review: string;
  created_at?: Date;
};

export type SavedPlace = {
  id: string;
  name: string;
  category: string;
  rating: number;
};

export type User = {
  email: string;
  reviews: Review[];
  saved: SavedPlace[];
  visited: SavedPlace[];
  dietaryPreferences: string[];
  recommendations: ReturnedPlace[];
};
