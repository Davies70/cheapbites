import mongoose from 'mongoose';

// Define the PlaceDetails schema (used as the value in the cache)
const placeDetailsSchema = new mongoose.Schema({
  fsq_id: { type: String },
  categories: [
    {
      id: { type: Number },
      name: { type: String },
      short_name: { type: String },
      plural_name: { type: String },
      icon: {
        prefix: { type: String },
        suffix: { type: String },
      },
    },
  ],
  closed_bucket: { type: String },
  description: { type: String },
  email: { type: String },
  features: {
    payment: {
      credit_cards: {
        accepts_credit_cards: { type: Boolean },
      },
    },
    food_and_drink: {
      alcohol: {
        cocktails: { type: Boolean },
        full_bar: { type: Boolean },
      },
      meals: {
        brunch: { type: Boolean },
        happy_hour: { type: Boolean },
      },
    },
    services: {
      delivery: { type: Boolean },
      dine_in: {
        reservations: { type: Boolean },
      },
    },
    amenities: {
      live_music: { type: Boolean },
      outdoor_seating: { type: Boolean },
      wifi: { type: String },
    },
    attributes: {
      business_meeting: { type: String },
      crowded: { type: String },
      dates_popular: { type: String },
      families_popular: { type: String },
      groups_popular: { type: String },
      quick_bite: { type: String },
      romantic: { type: String },
      trendy: { type: String },
    },
  },
  geocodes: {
    drop_off: {
      latitude: { type: Number },
      longitude: { type: Number },
    },
    main: {
      latitude: { type: Number },
      longitude: { type: Number },
    },
    roof: {
      latitude: { type: Number },
      longitude: { type: Number },
    },
  },
  hours: {
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
  },
  link: { type: String },
  location: {
    address: { type: String },
    country: { type: String },
    formatted_address: { type: String },
    locality: { type: String },
    postcode: { type: String },
    region: { type: String },
  },
  name: { type: String },
  photos: [
    {
      id: { type: String },
      created_at: { type: String },
      prefix: { type: String },
      suffix: { type: String },
      width: { type: Number },
      height: { type: Number },
      classifications: [{ type: String }],
    },
  ],
  popularity: { type: Number },
  price: { type: Number },
  rating: { type: Number },
  social_media: {
    facebook_id: { type: String },
    instagram: { type: String },
    twitter: { type: String },
  },
  tastes: [{ type: String }],
  tel: { type: String },
  tips: [
    {
      created_at: { type: String },
      text: { type: String },
    },
  ],
  website: { type: String },
});

// Define the Cache schema
const placeCacheSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    value: { type: placeDetailsSchema, required: true },
    ttl: { type: Date, required: true },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Add TTL index to the `ttl` field
placeCacheSchema.index({ ttl: 1 }, { expireAfterSeconds: 0 });

export default mongoose.models.PlaceCache ||
  mongoose.model('PlaceCache', placeCacheSchema);
