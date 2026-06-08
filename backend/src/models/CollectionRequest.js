import mongoose from 'mongoose';

const CollectionRequestSchema = new mongoose.Schema({
  name:          { type: String, required: true },
  email:         { type: String, required: true },
  phone:         { type: String, required: true },
  address:       { type: String, required: true },
  wasteType:     { type: String, required: true },
  quantity:      { type: String, required: true },
  preferredDate: { type: Date,   required: true },
  notes:         { type: String },
  status: {
    type: String,
    enum: ['pending', 'approved', 'in-progress', 'completed', 'cancelled'],
    default: 'pending',
  },
}, { timestamps: true });

export default mongoose.models.CollectionRequest || mongoose.model('CollectionRequest', CollectionRequestSchema);
