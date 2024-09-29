import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  plateNumber: { type: String, unique: true, required: true },
  model: { type: String, required: true },
  capacity: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['active', 'in_maintenance', 'retired'], 
    required: true 
  },
  assignedDriverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', optional: true }
}, { timestamps: true });

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

export default Vehicle;