import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  distance: { type: Number, required: true },
  baseFare: { type: Number, required: true }
}, { timestamps: true });

const Destination = mongoose.model('Destination', destinationSchema);

export default Destination;