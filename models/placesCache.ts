import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  plural_name: { type: String, required: true },
  short_name: { type: String, required: true },
  icon: {
    prefix: { type: String, required: true },
    suffix: { type: String, required: true },
  },
});

const returnedPlaceSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  categories: { type: [categorySchema], required: true },
  address: { type: String },
  lat: { type: Number },
  lon: { type: Number },
  distance: { type: Number },
  images: [
    {
      id: { type: String },
      created_at: { type: String },
      prefix: { type: String },
      suffix: { type: String },
      width: { type: Number },
      height: { type: Number },
    },
  ],
});

// Define the Cache schema
const placesCacheSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    value: { type: [returnedPlaceSchema], required: true }, // Array of ReturnedPlace objects
    ttl: { type: Date, required: true }, // Expiry time
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Add TTL index to the `ttl` field
placesCacheSchema.index({ ttl: 1 }, { expireAfterSeconds: 0 });

export default mongoose.models.PlacesCache ||
  mongoose.model('PlacesCache', placesCacheSchema);
