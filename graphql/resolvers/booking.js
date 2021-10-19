const Booking = require('../../models/booking');
const Event = require('../../models/event')


const { transformBooking, transformEvent } = require('./merge');



// const transformEvent = event => {
//     return {
//         ...event._doc,
//         _id: event.id,
//         date: dateToString(event._doc.date),
//         creator: user.bind(this, event.creator)
//     };

// };

module.exports = {

    booking: async(args, req) => {
        if (!req.isAuth) {
            throw new Error('unauthenticated!!');
        }
        try {
            const booking = await Booking.find();
            return booking.map(booking => {
                return transformBooking(booking);
            });

        } catch (err) {
            throw err;
        }

    },
    bookEvent: async(args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticted!!');
        }
        const fetchedEvent = await Event.findOut({ _id: args.eventId });
        const booking = new Booking({
            user: req.userId,
            event: fetchedEvent

        });
        const result = await booking.save();
        return transformbooking(result);
    },
    cancelBooking: async(args, req) => {
        if (!req.isAuth) {
            throw new Error('unauthenticated!!');
        }
        try {
            const booking = await Booking.findById(args.bookingId).Populate('event');
            const event = transformEvent(booking.event);
            await Booking.deleteOne({ _id: args.bookingId });
            return event;
        } catch (err) {
            throw err;
        }

    }
};