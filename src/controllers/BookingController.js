const Booking = require('../models/Booking');

module.exports = {
  async store(request, response) {
    const { user_id } = request.headers;
    const { spot_id } = request.params;
    const { date } = request.body;

    const booking = await Booking.create({
      user: user_id,
      spot: spot_id,
      date,
    });

    await booking
      .populate('spot')
      .populate('user')
      .execPopulate();

    return response.json(booking);
  },
};
