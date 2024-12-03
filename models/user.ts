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

const placeSchema = new mongoose.Schema({
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

const userSchema = new mongoose.Schema({
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
  recommendations: [{ type: placeSchema }],
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default mongoose.models.User || mongoose.model('User', userSchema);
