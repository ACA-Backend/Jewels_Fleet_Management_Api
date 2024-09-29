import Report from '../models/report.js';
import { generatePDF } from '../services/pdfService.js';

const createReport = async (req, res, next) => {
  try {
    const { journeyId, driverId, passengerFeedback, issuesReported, journeyDuration, fuelConsumption } = req.body;
    const report = await Report.create({journeyId, driverId, passengerFeedback, issuesReported, journeyDuration, fuelConsumption });
    res.status(201).json(report);
  } catch (error) {
    next(error);
  }
};

const getReports = async (req, res, next) => {
  try {
    const reports = await Report.find().populate('journeyId driverId');
    res.json(reports);
  } catch (error) {
    next(error);
  }
};

const generatePassengerManifest = async (req, res, next) => {
  try {
    const { journeyId } = req.params;
    const tickets = await Ticket.find({ journeyId }).populate('userId');
    const pdfBuffer = await generatePDF(tickets);
    res.contentType('application/pdf');
    res.send(pdfBuffer);
  } catch (error) {
    next(error);
  }
};

export { createReport, getReports, generatePassengerManifest };