import mongoose from 'mongoose';

const RecyclingCategorySchema = new mongoose.Schema({
  name:             { type: String, required: true },
  description:      { type: String, required: true },
  icon:             { type: String, default: '♻️' },
  color:            { type: String, default: '#22c55e' },
  guidelines:       [{ type: String }],
  acceptedItems:    [{ type: String }],
  notAcceptedItems: [{ type: String }],
  isActive:         { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.RecyclingCategory || mongoose.model('RecyclingCategory', RecyclingCategorySchema);
