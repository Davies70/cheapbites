// import mongoose from 'mongoose';

// // Define the PlaceDetails schema (used as the value in the cache)
// const placeDetailsSchema = new mongoose.Schema({
//   fsq_id: { type: String },
//   categories: [
//     {
//       id: { type: Number },
//       name: { type: String },
//       short_name: { type: String },
//       plural_name: { type: String },
//       icon: {
//         prefix: { type: String },
//         suffix: { type: String },
//       },
//     },
//   ],
//   closed_bucket: { type: String },
//   description: { type: String },
//   email: { type: String },
//   features: {
//     payment: {
//       credit_cards: {
//         accepts_credit_cards: { type: Boolean },
//       },
//     },
//     food_and_drink: {
//       alcohol: {
//         cocktails: { type: Boolean },
//         full_bar: { type: Boolean },
//       },
//       meals: {
//         brunch: { type: Boolean },
//         happy_hour: { type: Boolean },
//       },
//     },
//     services: {
//       delivery: { type: Boolean },
//       dine_in: {
//         reservations: { type: Boolean },
//       },
//     },
//     amenities: {
//       live_music: { type: Boolean },
//       outdoor_seating: { type: Boolean },
//       wifi: { type: String },
//     },
//     attributes: {
//       business_meeting: { type: String },
//       crowded: { type: String },
//       dates_popular: { type: String },
//       families_popular: { type: String },
//       groups_popular: { type: String },
//       quick_bite: { type: String },
//       romantic: { type: String },
//       trendy: { type: String },
//     },
//   },
//   geocodes: {
//     drop_off: {
//       latitude: { type: Number },
//       longitude: { type: Number },
//     },
//     main: {
//       latitude: { type: Number },
//       longitude: { type: Number },
//     },
//     roof: {
//       latitude: { type: Number },
//       longitude: { type: Number },
//     },
//   },
//   hours: {
//     display: { type: String },
//     is_local_holiday: { type: Boolean },
//     open_now: { type: Boolean },
//     regular: [
//       {
//         close: { type: String },
//         day: { type: Number },
//         open: { type: String },
//       },
//     ],
//   },
//   link: { type: String },
//   location: {
//     address: { type: String },
//     country: { type: String },
//     formatted_address: { type: String },
//     locality: { type: String },
//     postcode: { type: String },
//     region: { type: String },
//   },
//   name: { type: String },
//   photos: [
//     {
//       id: { type: String },
//       created_at: { type: String },
//       prefix: { type: String },
//       suffix: { type: String },
//       width: { type: Number },
//       height: { type: Number },
//       classifications: [{ type: String }],
//     },
//   ],
//   popularity: { type: Number },
//   price: { type: Number },
//   rating: { type: Number },
//   social_media: {
//     facebook_id: { type: String },
//     instagram: { type: String },
//     twitter: { type: String },
//   },
//   tastes: [{ type: String }],
//   tel: { type: String },
//   tips: [
//     {
//       created_at: { type: String },
//       text: { type: String },
//     },
//   ],
//   website: { type: String },
// });

// // Define the Cache schema
// const placeCacheSchema = new mongoose.Schema(
//   {
//     key: { type: String, required: true, unique: true },
//     value: { type: placeDetailsSchema, required: true },
//     ttl: { type: Date, required: true },
//   },
//   {
//     timestamps: true, // Automatically add createdAt and updatedAt fields
//   }
// );

// // Add TTL index to the `ttl` field
// placeCacheSchema.index({ ttl: 1 }, { expireAfterSeconds: 0 });

// export default mongoose.models.PlaceCache ||
//   mongoose.model('PlaceCache', placeCacheSchema);

import mongoose from 'mongoose';

// ------------------ Sub Schemas ------------------

// Tip schema
const tipSchema = new mongoose.Schema({
  id: String,
  fsq_tip_id: String, // sometimes just "id"
  created_at: Date,
  text: String,
  url: String,
  lang: String,
  agree_count: Number,
  disagree_count: Number,
  photo: { type: Object }, // nested photo allowed
});

// Media schema (icon, logo, photos)
const mediaSchema = new mongoose.Schema({
  id: String,
  fsq_photo_id: String,
  created_at: Date,
  prefix: String,
  suffix: String,
  width: Number,
  height: Number,
  classifications: [String],
  tip: tipSchema,
});

// Category schema
const categorySchema = new mongoose.Schema({
  fsq_category_id: String,
  name: String,
  short_name: String,
  plural_name: String,
  icon: mediaSchema,
});

// Chain schema
const chainSchema = new mongoose.Schema({
  fsq_chain_id: String,
  name: String,
  logo: mediaSchema,
  parent_id: String,
});

// Extended location
const extendedLocationSchema = new mongoose.Schema({
  dma: String,
  census_block_id: String,
});

// Attributes schema
const attributesSchema = new mongoose.Schema({
  restroom: Object,
  outdoor_seating: Object,
  atm: Object,
  has_parking: Object,
  wifi: String,
  delivery: Object,
  reservations: Object,
  takes_credit_card: Object,
});

// Hours schema
const hoursSchema = new mongoose.Schema({
  display: String,
  is_local_holiday: Boolean,
  open_now: Boolean,
  regular: [
    {
      close: String,
      day: Number,
      open: String,
    },
  ],
});

const popularHoursSchema = new mongoose.Schema({
  close: String,
  day: Number,
  open: String,
});

// Location schema
const locationSchema = new mongoose.Schema({
  address: String,
  locality: String,
  region: String,
  postcode: String,
  admin_region: String,
  post_town: String,
  po_box: String,
  country: String,
  formatted_address: String,
});

// Related Places schema (recursive-ish)
const relatedPlaceSchema = new mongoose.Schema({
  fsq_place_id: String,
  latitude: mongoose.Schema.Types.Mixed,
  longitude: mongoose.Schema.Types.Mixed,
  categories: [categorySchema],
  chains: [chainSchema],
  date_closed: String,
  date_created: String,
  date_refreshed: String,
  description: String,
  distance: Number,
  email: String,
  extended_location: extendedLocationSchema,
  attributes: attributesSchema,
  hours: hoursSchema,
  hours_popular: [popularHoursSchema],
  link: String,
  location: locationSchema,
  menu: String,
  name: String,
  photos: [mediaSchema],
  popularity: Number,
  placemaker_url: String,
  price: Number,
  rating: Number,
  social_media: {
    facebook_id: String,
    instagram: String,
    twitter: String,
  },
  stats: {
    total_photos: Number,
    total_ratings: Number,
    total_tips: Number,
  },
  store_id: String,
  tastes: [String],
  tel: String,
  tips: [tipSchema],
  verified: Boolean,
  website: String,
});

// ------------------ Main Place Schema ------------------

const placeSchema = new mongoose.Schema({
  fsq_place_id: { type: String, required: true },
  latitude: mongoose.Schema.Types.Mixed,
  longitude: mongoose.Schema.Types.Mixed,
  categories: [categorySchema],
  chains: [chainSchema],
  date_closed: String,
  date_created: String,
  date_refreshed: String,
  description: String,
  distance: Number,
  email: String,
  extended_location: extendedLocationSchema,
  attributes: attributesSchema,
  hours: hoursSchema,
  hours_popular: [popularHoursSchema],
  link: String,
  location: locationSchema,
  menu: String,
  name: String,
  photos: [mediaSchema],
  popularity: Number,
  placemaker_url: String,
  price: Number,
  rating: Number,
  related_places: {
    parent: relatedPlaceSchema,
    children: [relatedPlaceSchema],
  },
  social_media: {
    facebook_id: String,
    instagram: String,
    twitter: String,
  },
  stats: {
    total_photos: Number,
    total_ratings: Number,
    total_tips: Number,
  },
  store_id: String,
  tastes: [String],
  tel: String,
  tips: [tipSchema],
  verified: Boolean,
  unresolved_flags: [String],
  veracity_rating: Object,
  website: String,
});

// ------------------ Cache Schema ------------------

const placeCacheSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    value: { type: placeSchema, required: true }, 
    ttl: { type: Date, required: true },
  },
  { timestamps: true }
);

placeCacheSchema.index({ ttl: 1 }, { expireAfterSeconds: 0 });

export default mongoose.models.PlaceCache ||
  mongoose.model('PlaceCache', placeCacheSchema);
