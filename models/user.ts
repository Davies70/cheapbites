// import mongoose from 'mongoose';
// import { returnedPlaceSchema } from './placesCache';

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

// // const placeSchema = new mongoose.Schema({
// //   id: { type: String, required: true },
// //   name: { type: String, required: true },
// //   categories: { type: [categorySchema], required: true },
// //   address: { type: String },
// //   lat: { type: Number },
// //   lon: { type: Number },
// //   distance: { type: Number },
// //   images: [
// //     {
// //       id: { type: String },
// //       created_at: { type: String },
// //       prefix: { type: String },
// //       suffix: { type: String },
// //       width: { type: Number },
// //       height: { type: Number },
// //     },
// //   ],
// // });

// const userSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   reviews: [
//     {
//       placeId: { type: String, required: true },
//       rating: { type: Number, required: true },
//       review: { type: String, required: true },
//       created_at: { type: Date, default: Date.now },
//       name: { type: String, required: true },
//     },
//   ],
//   saved: [
//     {
//       id: { type: String, required: true },
//       name: { type: String, required: true },
//       category: { type: String, required: true },
//       rating: { type: Number },
//       address: { type: String, required: true },
//     },
//   ],
//   visited: [
//     {
//       id: { type: String, required: true },
//       name: { type: String, required: true },
//       category: { type: String, required: true },
//       rating: { type: Number },
//       address: { type: String, required: true },
//     },
//   ],
//   dietaryPreferences: [{ type: String }],
//   recommendations: [{ type: returnedPlaceSchema }],
// });

// userSchema.set('toJSON', {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString();
//     delete returnedObject._id;
//     delete returnedObject.__v;
//   },
// });

// export default mongoose.models.User || mongoose.model('User', userSchema);

import mongoose from 'mongoose';

// Category sub-schema
const categorySchema = new mongoose.Schema({
  fsq_category_id: { type: String },
  name: { type: String },
  plural_name: { type: String },
  short_name: { type: String },
  icon: {
    prefix: { type: String },
    suffix: { type: String },
  },
});

// Location sub-schema
const locationSchema = new mongoose.Schema({
  address: { type: String },
  locality: { type: String },
  region: { type: String },
  postcode: { type: String },
  country: { type: String },
  formatted_address: { type: String },
});

// Related places sub-schema
const relatedPlacesSchema = new mongoose.Schema({
  parent: { type: mongoose.Schema.Types.Mixed },
});

// Social media sub-schema
const socialMediaSchema = new mongoose.Schema({
  twitter: { type: String },
  facebook: { type: String },
  instagram: { type: String },
});

// Recommendation schema (from Foursquare API)
const recommendationSchema = new mongoose.Schema({
  fsq_place_id: { type: String, required: true, index: true },
  name: { type: String, required: true },
  categories: [categorySchema],
  latitude: { type: Number },
  longitude: { type: Number },
  distance: { type: Number },
  date_created: { type: String },
  date_refreshed: { type: String },
  email: { type: String },
  tel: { type: String },
  website: { type: String },
  link: { type: String },
  placemaker_url: { type: String },
  extended_location: { type: mongoose.Schema.Types.Mixed },
  location: locationSchema,
  related_places: relatedPlacesSchema,
  social_media: socialMediaSchema,
});

// User schema
const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },

    reviews: [
      {
        placeId: { type: String, required: true },
        rating: { type: Number, required: true },
        review: { type: String, required: true },
        created_at: { type: Date, default: Date.now },
        name: { type: String, required: true },
      },
    ],

    saved: [
      {
        id: { type: String, required: true },
        name: { type: String, required: true },
        category: { type: String, required: true },
        rating: { type: Number },
        address: { type: String, required: true },
      },
    ],

    visited: [
      {
        id: { type: String, required: true },
        name: { type: String, required: true },
        category: { type: String, required: true },
        rating: { type: Number },
        address: { type: String, required: true },
      },
    ],

    dietaryPreferences: [{ type: String }],

    // Embedded Foursquare recommendations
    recommendations: [recommendationSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model('User', userSchema);
