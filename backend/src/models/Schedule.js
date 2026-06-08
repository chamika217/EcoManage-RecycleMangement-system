import mongoose from 'mongoose';

const ScheduleSchema = new mongoose.Schema({
  title:          { type: String, required: true },
  area:           { type: String, required: true },
  collectionDate: { type: Date,   required: true },
  collectionTime: { type: String, required: true },
  team:           { type: mongoose.Schema.Types.ObjectId, ref: 'CollectionTeam' },
  wasteTypes:     [{ type: String }],
  status: {
    type: String,
    enum: ['scheduled', 'in-progress', 'completed', 'cancelled'],
    default: 'scheduled',
  },
  notes: { type: String },
}, { timestamps: true });

export default mongoose.models.Schedule || mongoose.model('Schedule', ScheduleSchema);
