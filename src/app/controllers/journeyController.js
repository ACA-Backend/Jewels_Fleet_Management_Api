import Journey from '../models/journey.js';
import Vehicle from '../models/vehicle.js';

const createJourney = async (req, res, next) => {
  try {
    const { vehicleId, destinationId, departureTime } = req.body;
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    const journey = await Journey.create({ vehicleId, destinationId, departureTime, availableSeats: vehicle.capacity, status: 'scheduled'});
    
    res.status(201).json(journey);
  } catch (error) {
    next(error);
  }
};

const getJourneys = async (req, res, next) => {
  try {
    const journeys = await Journey.find().populate('vehicleId destinationId');
    res.json(journeys);
  } catch (error) {
    next(error);
  }
};

const updateJourneyStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedJourney = await Journey.findByIdAndUpdate(id, { status }, { new: true });
    if (!updatedJourney) {
      return res.status(404).json({ message: 'Journey not found' });
    }
    res.json(updatedJourney);
  } catch (error) {
    next(error);
  }
};

export { createJourney, getJourneys, updateJourneyStatus };