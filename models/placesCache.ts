// import mongoose from 'mongoose';

// const categorySchema = new mongoose.Schema({
//   id: { type: String, required: true },
//   name: { type: String, required: true },
//   plural_name: { type: String, required: true },
//   short_name: { type: String, required: true },
//   icon: {
//     prefix: { type: String, required: true },
//     suffix: { type: String, required: true },
//   },
// });

// const returnedPlaceSchema = new mongoose.Schema({
//   id: { type: String, required: true },
//   name: { type: String, required: true },
//   categories: { type: [categorySchema], required: true },
//   address: { type: String },
//   lat: { type: Number },
//   lon: { type: Number },
//   distance: { type: Number },
//   images: [
//     {
//       id: { type: String },
//       created_at: { type: String },
//       prefix: { type: String },
//       suffix: { type: String },
//       width: { type: Number },
//       height: { type: Number },
//     },
//   ],
//   geocodes: { type: Object },
// });

// // Define the Cache schema
// const placesCacheSchema = new mongoose.Schema(
//   {
//     key: { type: String, required: true, unique: true },
//     value: { type: [returnedPlaceSchema], required: true }, // Array of ReturnedPlace objects
//     ttl: { type: Date, required: true }, // Expiry time
//   },
//   {
//     timestamps: true, // Automatically add createdAt and updatedAt fields
//   }
// );

// // Add TTL index to the `ttl` field
// placesCacheSchema.index({ ttl: 1 }, { expireAfterSeconds: 0 });

// export default mongoose.models.PlacesCache ||
//   mongoose.model('PlacesCache', placesCacheSchema);

import mongoose from 'mongoose';

// -------------------- Sub-schemas --------------------

// Tip Schema
const tipSchema = new mongoose.Schema({
  fsq_tip_id: { type: String }, // sometimes just "id"
  created_at: { type: Date },
  text: { type: String },
  url: { type: String },
  lang: { type: String },
  agree_count: { type: Number },
  disagree_count: { type: Number },
  photo: { type: Object }, // nested photo object (to avoid circular refs, store as object)
});

// Icon/Photo Schema
const mediaSchema = new mongoose.Schema({
  id: { type: String },
  fsq_photo_id: { type: String },
  created_at: { type: Date },
  prefix: { type: String },
  suffix: { type: String },
  width: { type: Number },
  height: { type: Number },
  classifications: [String],
  tip: tipSchema,
});

// Category Schema
const categorySchema = new mongoose.Schema({
  fsq_category_id: { type: String },
  name: { type: String },
  short_name: { type: String },
  plural_name: { type: String },
  icon: mediaSchema,
});

// Chain Schema
const chainSchema = new mongoose.Schema({
  fsq_chain_id: { type: String },
  name: { type: String },
  logo: mediaSchema,
  parent_id: { type: String },
});

// Hours Schema
const hoursSchema = new mongoose.Schema({
  display: { type: String },
  is_local_holiday: { type: Boolean },
  open_now: { type: Boolean },
  regular: [
    {
      close: { type: String },
      day: { type: Number },
      open: { type: String },
    },
  ],
});

// Location Schema
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

// Social Media Schema
const socialMediaSchema = new mongoose.Schema({
  facebook_id: String,
  instagram: String,
  twitter: String,
});

// Stats Schema
const statsSchema = new mongoose.Schema({
  total_photos: Number,
  total_ratings: Number,
  total_tips: Number,
});

// Related Places (recursive)
const relatedPlaceSchema = new mongoose.Schema({
  fsq_place_id: String,
  latitude: mongoose.Schema.Types.Mixed,
  longitude: mongoose.Schema.Types.Mixed,
  categories: [categorySchema],
  chains: [chainSchema],
  location: locationSchema,
  name: String,
});

// -------------------- Main Place Schema --------------------

export const returnedPlaceSchema = new mongoose.Schema({
  fsq_place_id: { type: String, required: true },
  name: { type: String, required: true },
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
  extended_location: { type: Object },
  attributes: { type: Object },
  hours: hoursSchema,
  hours_popular: [Object],
  link: String,
  location: locationSchema,
  menu: String,
  photos: [mediaSchema],
  popularity: Number,
  placemaker_url: String,
  price: Number,
  rating: Number,
  related_places: {
    parent: relatedPlaceSchema,
    children: [relatedPlaceSchema],
  },
  social_media: socialMediaSchema,
  stats: statsSchema,
  store_id: String,
  tastes: [String],
  tel: String,
  tips: [tipSchema],
  verified: Boolean,
  unresolved_flags: [String],
  veracity_rating: { type: Object },
  website: String,
});

// -------------------- Cache Schema --------------------
const placesCacheSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    value: { type: [returnedPlaceSchema], required: true }, // array of places
    ttl: { type: Date, required: true },
  },
  { timestamps: true }
);

placesCacheSchema.index({ ttl: 1 }, { expireAfterSeconds: 0 });

export default mongoose.models.PlacesCache ||
  mongoose.model('PlacesCache', placesCacheSchema);
