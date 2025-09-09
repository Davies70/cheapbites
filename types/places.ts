// // Types for Foursquare Places API search response
// import { Image } from './images';

// export interface Place {
//   fsq_id: string;
//   categories: Category[];
//   chains: Chain[];
//   closed_bucket: string;
//   distance: number;
//   geocodes: Geocodes;
//   link: string;
//   location: Location;
//   name: string;
//   related_places: RelatedPlaces;
//   timezone: string;
// }

// export interface Category {
//   id: number;
//   name: string;
//   short_name: string;
//   plural_name: string;
//   icon: Icon;
// }

// export interface Icon {
//   prefix: string;
//   suffix: string;
// }

// export interface Chain {
//   id: string;
//   name: string;
// }

// export interface Geocodes {
//   main: Coordinates;
//   roof?: Coordinates;
//   drop_off?: Coordinates;
//   road?: Coordinates;
// }

// export interface Coordinates {
//   latitude: number;
//   longitude: number;
// }

// export interface Location {
//   address?: string;
//   country: string;
//   cross_street?: string;
//   formatted_address: string;
//   locality: string;
//   postcode: string;
//   region?: string;
// }

// export interface RelatedPlaces {
//   children?: RelatedPlace[];
//   parent?: RelatedPlace;
// }

// export interface RelatedPlace {
//   fsq_id: string;
//   categories: Category[];
//   name: string;
// }

// export interface Context {
//   geo_bounds: GeoBounds;
// }

// export interface GeoBounds {
//   circle: Circle;
// }

// export interface Circle {
//   center: Coordinates;
//   radius: number;
// }

// export interface PlaceDetails {
//   fsq_id: string;
//   categories: {
//     id: number;
//     name: string;
//     short_name: string;
//     plural_name: string;
//     icon: {
//       prefix: string;
//       suffix: string;
//     };
//   }[];
//   closed_bucket: string;
//   description: string;
//   email: string;
//   features: {
//     payment: {
//       credit_cards: {
//         accepts_credit_cards: boolean;
//       };
//     };
//     food_and_drink: {
//       alcohol: {
//         cocktails: boolean;
//         full_bar: boolean;
//       };
//       meals: {
//         brunch: boolean;
//         happy_hour: boolean;
//       };
//     };
//     services: {
//       delivery: boolean;
//       dine_in: {
//         reservations: boolean;
//       };
//     };
//     amenities: {
//       live_music: boolean;
//       outdoor_seating: boolean;
//       wifi: string;
//     };
//     attributes: {
//       business_meeting: string;
//       crowded: string;
//       dates_popular: string;
//       families_popular: string;
//       groups_popular: string;
//       quick_bite: string;
//       romantic: string;
//       trendy: string;
//     };
//   };
//   geocodes: {
//     drop_off: {
//       latitude: number;
//       longitude: number;
//     };
//     main: {
//       latitude: number;
//       longitude: number;
//     };
//     roof: {
//       latitude: number;
//       longitude: number;
//     };
//   };
//   hours: {
//     display: string;
//     is_local_holiday: boolean;
//     open_now: boolean;
//     regular: {
//       close: string;
//       day: number;
//       open: string;
//     }[];
//   };
//   link: string;
//   location: {
//     address: string;
//     country: string;
//     formatted_address: string;
//     locality: string;
//     postcode: string;
//     region: string;
//   };
//   name: string;
//   photos: {
//     id: string;
//     created_at: string;
//     prefix: string;
//     suffix: string;
//     width: number;
//     height: number;
//     classifications?: string[];
//   }[];
//   popularity: number;
//   price: number;
//   rating: number;
//   social_media: {
//     facebook_id: string;
//     instagram: string;
//     twitter: string;
//   };
//   tastes: string[];
//   tel: string;
//   tips: {
//     created_at: string;
//     text: string;
//   }[];
//   website: string;
// }

// export interface PlaceWithImages {
//   place: Place;
//   images: Image[];
// }

// export interface FoursquareSearchResponse {
//   results: Place[];
//   context: Context;
// }

// export interface PlacesResponse {
//   places: PlaceWithImages[];
//   context: Context | object;
//   ok: boolean;
//   message: string;
//   status: number;
// }

// export interface PlaceResponse {
//   place: PlaceDetails | object;
//   ok: boolean;
//   message: string;
//   status: number;
// }

// export interface ReturnedPlace {
//   id: string;
//   name: string;
//   categories: Category[];
//   address: string;
//   lat?: number;
//   lon?: number;
//   distance: number;
//   images: Image[];
//   geocodes: Geocodes;
// }

// ====== Updated Foursquare API Types (2025) ======

export interface FSQSearchResponse {
  results: FSQPlace[];
  context: FSQContext;
}

export interface FSQContext {
  geo_bounds: {
    circle: {
      center: {
        latitude: number;
        longitude: number;
      };
      radius: number;
    };
  };
}

export interface FSQPlace {
  fsq_place_id: string;
  name: string;
  description?: string;
  distance?: number;
  popularity?: number;
  price?: number;
  rating?: number;
  verified?: boolean;
  website?: string;
  tel?: string;
  email?: string;
  link?: string;
  placemaker_url?: string;
  latitude: number;
  longitude: number;
  location: FSQLocation;
  categories: FSQCategory[];
  chains?: FSQChain[];
  photos?: FSQPhoto[];
  tips?: FSQTip[];
  related_places?: {
    parent?: FSQPlaceSummary;
    children?: FSQPlaceSummary[];
  };

  // new/extended fields
  social_media?: {
    facebook_id?: string;
    instagram?: string;
    twitter?: string;
  };
  stats?: {
    total_photos?: number;
    total_ratings?: number;
    total_tips?: number;
  };
  tastes?: string[];
  store_id?: string;

  // business attributes
  attributes?: {
    restroom?: boolean | object;
    outdoor_seating?: boolean | object;
    atm?: boolean | object;
    has_parking?: boolean | object;
    wifi?: string;
    delivery?: boolean | object;
    reservations?: boolean | object;
    takes_credit_card?: boolean | object;
  };

  hours?: {
    display: string;
    is_local_holiday: boolean;
    open_now: boolean;
    regular: FSQHour[];
  };
  hours_popular?: FSQHour[];
}

export interface FSQCategory {
  fsq_category_id: string;
  name: string;
  short_name: string;
  plural_name: string;
  icon: FSQIcon;
}

export interface FSQIcon {
  id: string;
  created_at: string;
  prefix: string;
  suffix: string;
  width: number;
  height: number;
  classifications?: string[];
  tip?: FSQTip;
}

export interface FSQChain {
  fsq_chain_id: string;
  name: string;
  logo?: FSQIcon;
  parent_id?: string;
}

export interface FSQPhoto {
  fsq_photo_id: string;
  created_at: string;
  prefix: string;
  suffix: string;
  width: number;
  height: number;
  classifications?: string[];
  tip?: FSQTip;
}

export interface FSQTip {
  fsq_tip_id?: string;
  id?: string; // some tips return `id`
  created_at: string;
  text: string;
  url?: string;
  lang?: string;
  agree_count?: number;
  disagree_count?: number;
  photo?: FSQPhoto;
}

export interface FSQLocation {
  address?: string;
  locality?: string;
  region?: string;
  postcode?: string;
  admin_region?: string;
  post_town?: string;
  po_box?: string;
  country: string;
  formatted_address: string;
}

export interface FSQHour {
  close: string;
  day: number;
  open: string;
}

export interface FSQPlaceSummary {
  fsq_place_id: string;
  name: string;
  categories: FSQCategory[];
  location?: FSQLocation;
  photos?: FSQPhoto[];
  rating?: number;
  popularity?: number;
}

export type Coordinates = {
  longitude: number;
  latitude: number;
};
