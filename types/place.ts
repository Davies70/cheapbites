// Base types
type PrimitiveId = string | number;

interface LatLng {
  latitude: number;
  longitude: number;
}

interface Tip {
  id: string;
  created_at: string;
  text: string;
  url?: string;
  lang?: string;
  agree_count: number;
  disagree_count: number;
  photo?: Photo;
}

interface Photo {
  id: string;
  created_at: string;
  prefix: string;
  suffix: string;
  width: number;
  height: number;
  classifications?: string[];
  tip?: Tip;
}

interface Icon {
  id: string;
  created_at: string;
  prefix: string;
  suffix: string;
  width: number;
  height: number;
  classifications?: string[];
  tip?: Tip;
}

interface Category {
  fsq_category_id: string;
  name: string;
  short_name: string;
  plural_name: string;
  icon: Icon;
}

interface Chain {
  fsq_chain_id: string;
  name: string;
  logo: Icon;
  parent_id?: string;
}

interface Hours {
  display: string;
  is_local_holiday: boolean;
  open_now: boolean;
  regular: {
    close: string;
    day: number;
    open: string;
  }[];
}

interface PopularHours {
  close: string;
  day: number;
  open: string;
}

interface ExtendedLocation {
  dma?: string;
  census_block_id?: string;
}

interface Attributes {
  restroom?: unknown;
  outdoor_seating?: unknown;
  atm?: unknown;
  has_parking?: unknown;
  wifi?: string;
  delivery?: unknown;
  reservations?: unknown;
  takes_credit_card?: unknown;
}

interface PlaceLocation {
  address?: string;
  locality?: string;
  region?: string;
  postcode?: string;
  admin_region?: string;
  post_town?: string;
  po_box?: string;
  country?: string;
  formatted_address?: string;
}

interface SocialMedia {
  facebook_id?: string;
  instagram?: string;
  twitter?: string;
}

interface Stats {
  total_photos: number;
  total_ratings: number;
  total_tips: number;
}

// Recursive Related Place
interface RelatedPlace extends Omit<Place, 'related_places'> {
  related_places?: {
    parent?: RelatedPlace;
    children?: RelatedPlace[];
  };
}

// Main Place type
export interface Place {
  fsq_place_id: string;
  latitude: number;
  longitude: number;
  categories: Category[];
  chains: Chain[];
  date_closed?: string;
  date_created?: string;
  date_refreshed?: string;
  description?: string;
  distance?: number;
  email?: string;
  extended_location?: ExtendedLocation;
  attributes?: Attributes;
  hours?: Hours;
  hours_popular?: PopularHours[];
  link?: string;
  location: PlaceLocation;
  menu?: string;
  name: string;
  photos?: Photo[];
  popularity?: number;
  placemaker_url?: string;
  price?: number;
  rating?: number;
  related_places?: {
    parent?: RelatedPlace;
    children?: RelatedPlace[];
  };
  social_media?: SocialMedia;
  stats?: Stats;
  store_id?: string;
  tastes?: string[];
  tel?: string;
  tips?: Tip[];
  verified?: boolean;
  unresolved_flags?: string[];
  veracity_rating?: unknown;
  website?: string;
}

// Top-level response
// export interface FSQPlaceDetailsResponse {
//   result: Place;
//   context: {
//     geo_bounds: {
//       circle: {
//         center: LatLng;
//         radius: number;
//       };
//     };
//   };
// }

export interface PlaceResponse {
  placeResponse?: Place | null;
  ok: boolean;
  message: string;
  status: number;
}

