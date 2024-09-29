import mongoose from 'mongoose';

const journeySchema = new mongoose.Schema({
  vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  destinationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination', required: true },
  departureTime: { type: Date, required: true },
  availableSeats: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['scheduled', 'in_progress', 'completed', 'cancelled'], 
    required: true 
  }
}, { timestamps: true });

const Journey = mongoose.model('Journey', journeySchema);

export default Journey;