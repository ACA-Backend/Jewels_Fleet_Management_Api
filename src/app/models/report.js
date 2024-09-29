import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  journeyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Journey', required: true },
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  passengerFeedback: [{ type: String }],
  issuesReported: { type: String },
  journeyDuration: { type: Number, required: true },
  fuelConsumption: { type: Number }
}, { timestamps: true });

const Report = mongoose.model('Report', reportSchema);

export default Report;