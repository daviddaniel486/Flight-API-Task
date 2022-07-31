const { Flights } = require('../models/Flight');
const { v4: uuid } = require('uuid');

// exports.example = (req, res) => {
//   console.log('example');
//   res.send('Flight example');
// };

// Get all Flights
exports.getFlights = async (req, res) => {
  try {
    const flights = Flights;
    res.status(200).json({
      message: 'All flights booked.',
      flights,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add/Book Flight
exports.bookFlight = async (req, res) => {
  try {
    const flight = await req.body;
    flight.id = uuid();
    Flights.push(flight);
    res.status(200).json({
      message: 'Flight booked!',
      flight,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single Flight
exports.getFlight = async (req, res) => {
  try {
    let id = req.params.id;
    const flight = Flights.find((flight) => flight.id === id);
    res.status(200).json({
      message: 'Flight found',
      flight,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Update/Edit Flight
exports.updateFlight = async (req, res) => {
  try {
    let id = req.params.id;
    let flight = Flights.find((flight) => flight.id === id);

    const { title, time, price, date } = await req.body;

    flight.title = title;
    flight.time = time;
    flight.price = price;
    flight.date = date;

    res.status(200).json({
      message: 'User Upated',
      flight,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Flight
exports.deleteFlight = async (req, res) => {
  try {
    let id = req.params.id;
    const flight = Flights.find((flight) => flight.id === id);
    Flights.splice(Flights.indexOf(flight), 1);
    res.status(200).json({
      message: 'Flight Deleted',
      flight,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
