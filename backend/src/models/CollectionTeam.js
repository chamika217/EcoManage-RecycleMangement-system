import mongoose from 'mongoose';

const CollectionTeamSchema = new mongoose.Schema({
  teamName:      { type: String, required: true },
  teamLeader:    { type: String, required: true },
  members:       [{ type: String }],
  vehicleNumber: { type: String },
  contactNumber: { type: String, required: true },
  area:          { type: String },
  isActive:      { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.CollectionTeam || mongoose.model('CollectionTeam', CollectionTeamSchema);
