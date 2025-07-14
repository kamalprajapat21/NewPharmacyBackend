
// // final working booking
// import createVaccine from '../../models/BOOKING/vaccination.js'; // Adjust the path based on your project structure
// export const getvaccine = async (req, res) => {
//   try {
//     const Vaccine = createVaccine(req.db);
//     const vaccines = await Vaccine.find({}); // Retrieve all documents

//     // Log the retrieved documents
//     console.log('Retrieved vaccines:', JSON.stringify(vaccines, null, 2));

//     // Flatten and log all bookings
//     const allBookings = vaccines.reduce((acc, vaccine) => {
//       vaccine.bookings.forEach(booking => {
//         console.log('Booking:', JSON.stringify(booking, null, 2)); // Log individual booking
//       });
//       return acc.concat(vaccine.bookings || []);
//     }, []);

//     // Log all bookings before sending response
//     console.log('All bookings:', JSON.stringify(allBookings, null, 2));

//     res.status(200).json({allBookings});
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Failed to retrieve bookings',
//       error: error.message,
//     });
//   }
// };

// final working booking
// import createVaccine from '../models/vaccination.js'; // Adjust the path based on your project structure
// export const getvaccine = async (req, res) => {
//   try {
//     const Vaccine = createVaccine(req.db);
//     const vaccines = await Vaccine.find({}); // Retrieve all documents

//     // Log the retrieved documents
//     console.log('Retrieved vaccines:', JSON.stringify(vaccines, null, 2));

//     // Flatten and log all bookings
//     const allBookings = vaccines.reduce((acc, vaccine) => {
//       vaccine.bookings.forEach(booking => {
//         console.log('Booking:', JSON.stringify(booking, null, 2)); // Log individual booking
//       });
//       return acc.concat(vaccine.bookings || []);
//     }, []);

//     // Log all bookings before sending response
//     console.log('All bookings:', JSON.stringify(allBookings, null, 2));

//     res.status(200).json({allBookings});
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Failed to retrieve bookings',
//       error: error.message,
//     });
//   }
// };


import createLab from '../models/vaccination.js'; // Adjust the path based on your project structure
export const getvaccine = async (req, res) => {
  try {
    const Lab = createLab(req.conn2);
   
    // Log to ensure Lab is created
    console.log('Lab model created successfully');

    const labs = await Lab.find({}); // Retrieve all documents
    console.log('Retrieved labs:', labs);

    if (!labs.length) {
      return res.status(404).json({ message: 'No Labs found in the database' });
    }

    // Flatten and filter bookings with status 'incoming'
    const allBookings = labs.reduce((acc, lab) => {
      const incomingBookings = lab.bookings.filter(booking => booking.status === 'incoming');
      return acc.concat(incomingBookings || []);
    }, []);

    console.log('Incoming bookings:', allBookings); // Log filtered bookings

    if (!allBookings.length) {
      return res.status(404).json({ message: 'No incoming bookings found' });
    }

    res.status(200).json({ allBookings });
  } catch (error) {
    console.error('Error retrieving bookings:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve bookings',
      error: error.message,
    });
  }
};