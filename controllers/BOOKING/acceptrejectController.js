//updating code so that pending bookings are unique for particular lab owner
  
import express from 'express';
// import createLab from '../../models/BOOKING/Lab.js';
import createMedicine from '../../models/MedicineModel.js'
import createVaccine from '../../models/vaccination.js'
import createUser1 from '../../models/User1.js';

// import express from 'express';
// import createLab from '../../models/BOOKING/Lab.js';

// export const acceptMedicine = async (req, res) => {
//   try {
//     const LabModel = createMedicine(req.conn2);
//     const { labId } = req.body; // Make sure you're getting labId from body
//     const { labownermobile } = req.body;

//     console.log(`Searching for booking with labId: ${labId}`);

//     console.log(labId,labownermobile)
//     // Use arrayFilters to target the specific booking
//     const lab = await LabModel.findOneAndUpdate(
//       { "bookings.labId": labId, "bookings.status": "incoming" },
//       { 
//         $set: { 
//           "bookings.$[elem].status": "pending",
//           "bookings.$[elem].labownermobile": labownermobile // Update labownermobile field
//         }
//       },
//       {
//         new: true, // Return the updated document
//         arrayFilters: [{ "elem.labId": labId }]
//       }
//     );

//     console.log('Found lab:', lab); // Log the found lab object

//     if (!lab) {
//       return res.status(404).json({ message: 'Incoming booking not found.' });
//     }

//     // Return the updated lab document
//     res.status(200).json({
//       message: 'Booking status updated successfully to completed',
//       lab,
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating booking status', error: error.message });
//   }
// };
export const acceptMedicine = async (req, res) => {
  try {
    const LabModel = createMedicine(req.conn2);
    const { labId, labownermobile } = req.body;

    console.log(`Searching for booking with labId: ${labId}`);

    const lab = await LabModel.findOneAndUpdate(
      { "bookings.labId": labId, "bookings.status": "incoming" },
      {
        $set: {
          "bookings.$[elem].status": "pending",
          "bookings.$[elem].labownermobile": labownermobile
        }
      },
      {
        new: true,
        arrayFilters: [{ "elem.labId": labId }]
      }
    );

    if (!lab) {
      return res.status(404).json({ message: 'Incoming booking not found.' });
    }

    // Extract the updated booking
    const updatedBooking = lab.bookings.find(b => b.labId === labId);

    if (!updatedBooking) {
      return res.status(404).json({ message: 'Updated booking not found.' });
    }

    // ✅ Now send booking + mobileNumber explicitly
    return res.status(200).json({
      message: 'Booking status updated successfully to pending',
      booking: updatedBooking,
      mobileNumber: updatedBooking.mobileNumber  // ✅ Ensure this shows
    });

  } catch (error) {
    console.error('Error accepting booking:', error);
    return res.status(500).json({
      message: 'Error updating booking status',
      error: error.message
    });
  }
};

// export const acceptMedicine = async (req, res) => {
//   try {
//     const { labId, labownermobile } = req.body;
//     const conn2 = req.conn2;
//     const MedicineModel = createMedicine(conn2);

//     // Find the lab document
//     const lab = await MedicineModel.findOne({ _id: labId });
//     if (!lab) {
//       return res.status(404).json({ success: false, message: 'Lab not found' });
//     }

//     // Find the first pending booking (you can change filter as needed)
//     const booking = lab.bookings.find(b => b.status === 'Pending');
//     if (!booking) {
//       return res.status(404).json({ success: false, message: 'No pending booking found' });
//     }

//     // Update status to Accepted (you can use Mongoose array filters if needed)
//     booking.status = 'Accepted';
//     await lab.save();

//     return res.status(200).json({
//       success: true,
//       message: 'Booking accepted',
//       data: {
//         bookingId: booking._id,
//         userId: booking.userId,
//         pharmacyId: labId, // same as labId
//       }
//     });
//   } catch (error) {
//     console.error('Error accepting booking:', error);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// };




export const rejectMedicine = async (req, res) => {
  try {
    const LabModel = createMedicine(req.conn2);
    const { labId } = req.body; // Make sure you're getting labId from body
    const { labownermobile } = req.body;

    console.log(`Searching for booking with labId: ${labId}`);

    console.log(labId,labownermobile)
    // Use arrayFilters to target the specific booking
    const lab = await LabModel.findOneAndUpdate(
      { "bookings.labId": labId, "bookings.status": "incoming" },
      { 
        $set: { 
          "bookings.$[elem].status": "cancelled",
          "bookings.$[elem].labownermobile": labownermobile // Update labownermobile field
        }
      },
      {
        new: true, // Return the updated document
        arrayFilters: [{ "elem.labId": labId }]
      }
    );

    console.log('Found lab:', lab); // Log the found lab object

    if (!lab) {
      return res.status(404).json({ message: 'Incoming booking not found.' });
    }

    // Return the updated lab document
    res.status(200).json({
      message: 'Booking status updated successfully to completed',
      lab,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating booking status', error: error.message });
  }
};


export const acceptVaccine = async (req, res) => {
  try {
    const LabModel = createVaccine(req.conn2);
    const { labId } = req.body; // Make sure you're getting labId from body
    const { labownermobile } = req.body;

    console.log(`Searching for booking with labId: ${labId}`);

    console.log(labId,labownermobile)
    // Use arrayFilters to target the specific booking
    const lab = await LabModel.findOneAndUpdate(
      { "bookings.labId": labId, "bookings.status": "incoming" },
      { 
        $set: { 
          "bookings.$[elem].status": "pending",
          "bookings.$[elem].labownermobile": labownermobile // Update labownermobile field
        }
      },
      {
        new: true, // Return the updated document
        arrayFilters: [{ "elem.labId": labId }]
      }
    );

    console.log('Found lab:', lab); // Log the found lab object

    if (!lab) {
      return res.status(404).json({ message: 'Incoming booking not found.' });
    }

    // Return the updated lab document
    res.status(200).json({
      message: 'Booking status updated successfully to completed',
      lab,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating booking status', error: error.message });
  }
};

export const rejectVaccine = async (req, res) => {
  try {
    const LabModel = createVaccine(req.conn2);
    const { labId } = req.body; // Make sure you're getting labId from body
    const { labownermobile } = req.body;

    console.log(`Searching for booking with labId: ${labId}`);

    console.log(labId,labownermobile)
    // Use arrayFilters to target the specific booking
    const lab = await LabModel.findOneAndUpdate(
      { "bookings.labId": labId, "bookings.status": "incoming" },
      { 
        $set: { 
          "bookings.$[elem].status": "cancelled",
          "bookings.$[elem].labownermobile": labownermobile // Update labownermobile field
        }
      },
      {
        new: true, // Return the updated document
        arrayFilters: [{ "elem.labId": labId }]
      }
    );

    console.log('Found lab:', lab); // Log the found lab object

    if (!lab) {
      return res.status(404).json({ message: 'Incoming booking not found.' });
    }

    // Return the updated lab document
    res.status(200).json({
      message: 'Booking status updated successfully to completed',
      lab,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating booking status', error: error.message });
  }
};
// export const rejectLab = async (req, res) => {
//   try {
//     const LabModel = createLab(req.conn2);
//     const { labId } = req.body; // Make sure you're getting labId from body
//     const { labownermobile } = req.body;

//     console.log(`Searching for booking with labId: ${labId}`);

//     // Use arrayFilters to target the specific booking
//     const lab = await LabModel.findOneAndUpdate(
//       { "bookings.labId": labId, "bookings.status": "incoming" },
//       { 
//         $set: { 
//           "bookings.$[elem].status": "cancelled",
//           "bookings.$[elem].labownermobile": labownermobile // Update labownermobile field
//         }
//       },
//       {
//         new: true, // Return the updated document
//         arrayFilters: [{ "elem.labId": labId }]
//       }
//     );

//     console.log('Found lab:', lab); // Log the found lab object

//     if (!lab) {
//       return res.status(404).json({ message: 'Incoming booking not found.' });
//     }

//     // Return the updated lab document
//     res.status(200).json({
//       message: 'Booking status updated successfully to completed',
//       lab,
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating booking status', error: error.message });
//   }
//   };











// GET /api/sd/get-booking-info?labId=...
export const getBookingInfo = async (req, res) => {
  const { labId } = req.query;
  const conn2 = req.conn2; // PWA DB
  const Medicine = createMedicine(conn2); // model function you shared

  try {
    // Find document where any booking has this labId
    const doc = await Medicine.findOne({ 'bookings.labId': labId });

    if (!doc) {
      return res.status(404).json({ message: 'No booking found with this labId' });
    }

    const matchedBooking = doc.bookings.find(b => b.labId === labId);

    if (!matchedBooking) {
      return res.status(404).json({ message: 'Booking not found in bookings array' });
    }

    return res.status(200).json({
      bookingId: matchedBooking._id, // or matchedBooking.bookingId if you're using that
      userId: matchedBooking.userId
    });
  } catch (err) {
    console.error('Error fetching booking info:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};











































































































  
export const completeLab = async (req, res) => {
  try {
    const LabModel = createLab(req.conn2);
    const { labId } = req.params; // Make sure you're getting labId from body
    const { labownermobile } = req.body;

    console.log(`Searching for booking with labId: ${labId}`);

    // Use arrayFilters to target the specific booking
    const lab = await LabModel.findOneAndUpdate(
      { "bookings.labId": labId, "bookings.status": "pending", "bookings.labownermobile":labownermobile },
      { 
        $set: { 
          "bookings.$[elem].status": "completed",
          // "bookings.$[elem].labownermobile": labownermobile // Update labownermobile field
        }
      },
      {
        new: true, // Return the updated document
        arrayFilters: [{ "elem.labId": labId }]
      }
    );

    console.log('Found lab:', lab); // Log the found lab object

    if (!lab) {
      return res.status(404).json({ message: 'pending booking not found.' });
    }

    // Return the updated lab document
    res.status(200).json({
      message: 'Booking status updated successfully to completed',
      lab,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating booking status', error: error.message });
  }
  };
  
