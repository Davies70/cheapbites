// Types for Foursquare Places API search response

export interface FoursquareSearchResponse {
  results: Place[];
  context: Context;
}

export interface Place {
  fsq_id: string;
  categories: Category[];
  chains: Chain[];
  closed_bucket: string;
  distance: number;
  geocodes: Geocodes;
  link: string;
  location: Location;
  name: string;
  related_places: RelatedPlaces;
  timezone: string;
}

export interface Category {
  id: number;
  name: string;
  short_name: string;
  plural_name: string;
  icon: Icon;
}

export interface Icon {
  prefix: string;
  suffix: string;
}

export interface Chain {
  id: string;
  name: string;
}

export interface Geocodes {
  main: Coordinates;
  roof?: Coordinates;
  drop_off?: Coordinates;
  road?: Coordinates;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Location {
  address?: string;
  country: string;
  cross_street?: string;
  formatted_address: string;
  locality: string;
  postcode: string;
  region?: string;
}

export interface RelatedPlaces {
  children?: RelatedPlace[];
  parent?: RelatedPlace;
}

export interface RelatedPlace {
  fsq_id: string;
  categories: Category[];
  name: string;
}

export interface Context {
  geo_bounds: GeoBounds;
}

export interface GeoBounds {
  circle: Circle;
}

export interface Circle {
  center: Coordinates;
  radius: number;
}

export interface Restaurant {
  id: number;
  name: string;
  lat: number;
  lng: number;
  price: number;
  rating: number;
  cuisine: string;
  mood: string;
  image: string;
}

export interface PlacesResponse {
  places: Place[] | [];
  context: Context | object;
  ok: boolean;
  message: string;
  status: number;
}

// const categories = [13000];

// const latitude_longitude = '54.3150,10.1320';
// const fsq_id = '535bf4fc498ebbfcfcc44f53';
// const fsq_id2 = '4b9a3c32f964a52047a635e3';
