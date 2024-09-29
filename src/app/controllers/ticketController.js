import Ticket from '../models/ticket.js';
import Journey from '../models/journey.js';
import Destination from '../models/destination.js';
import Transaction from '../models/transaction.js';
import { processPayment } from '../services/paymentService.js';

const bookTicket = async (req, res, next) => {
  try {
    const { userId, journeyId } = req.body;
    const journey = await Journey.findById(journeyId).populate('destinationId');
    if (!journey) {
      return res.status(404).json({ message: 'Journey not found' });
    }
    if (journey.availableSeats === 0) {
      return res.status(400).json({ message: 'No available seats' });
    }

    const price = journey.destinationId.baseFare;
    const paymentResult = await processPayment(userId, price);
    if (!paymentResult.success) {
      return res.status(400).json({ message: 'Payment failed' });
    }

    const ticket = await Ticket.create({ userId, journeyId, seatNumber: journey.capacity - journey.availableSeats + 1, status: 'booked', price
    });

    await Journey.findByIdAndUpdate(journeyId, { $inc: { availableSeats: -1 } });
    await Transaction.create({ userId, ticketId: ticket._id, amount: price, type: 'purchase'
    });

    res.status(201).json(ticket);
  } catch (error) {
    next(error);
  }
};

const cancelTicket = async (req, res, next) => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findById(id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    if (ticket.status === 'cancelled') {
      return res.status(400).json({ message: 'Ticket already cancelled' });
    }

    ticket.status = 'cancelled';
    await ticket.save();

    await Journey.findByIdAndUpdate(ticket.journeyId, { $inc: { availableSeats: 1 } });
    await Transaction.create({
      userId: ticket.userId,
      ticketId: ticket._id,
      amount: ticket.price,
      type: 'refund'
    });

    res.json({ message: 'Ticket cancelled successfully' });
  } catch (error) {
    next(error);
  }
};

const getTickets = async (req, res, next) => {
  try {
    const tickets = await Ticket.find().populate('userId journeyId');
    res.json(tickets);
  } catch (error) {
    next(error);
  }
};

export { bookTicket, cancelTicket, getTickets };