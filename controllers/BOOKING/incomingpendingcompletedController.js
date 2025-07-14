import createLab from '../../models/BOOKING/Lab.js'; // Adjust the path based on your project structure

export const getPending = async (req, res) => {
  try {
    const { labownermobile } = req.body; // Extract labownermobile from the request body

    console.log(`Fetching pending bookings for lab owner mobile: ${labownermobile}`);

    const LabModel = createLab(req.conn2);

    // Find bookings where labownermobile matches and status is pending
    const labs = await LabModel.find({}); // Retrieve all labs

    // Filter and flatten the pending bookings
    const pendingBookings = labs.reduce((acc, lab) => {
      const labPendingBookings = lab.bookings.filter(booking => 
        booking.labownermobile === labownermobile && booking.status === 'pending'
      );
      return acc.concat(labPendingBookings || []);
    }, []);

    if (!pendingBookings.length) {
      return res.status(404).json({ message: 'No pending bookings found for this lab owner.' });
    }

    // Return the found bookings in a similar format
    res.status(200).json({
      message: 'Pending bookings retrieved successfully',
      allBookings: pendingBookings, // Using the same key as in getLab
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pending bookings', error: error.message });
  }
};



export const getCancelled = async (req, res) => {
  try {
    const { labownermobile } = req.body; // Extract labownermobile from the request body

    console.log(`Fetching pending bookings for lab owner mobile: ${labownermobile}`);

    const LabModel = createLab(req.conn2);

    // Find bookings where labownermobile matches and status is pending
    const labs = await LabModel.find({}); // Retrieve all labs

    // Filter and flatten the pending bookings
    const pendingBookings = labs.reduce((acc, lab) => {
      const labPendingBookings = lab.bookings.filter(booking => 
        booking.labownermobile === labownermobile && booking.status === 'cancelled'
      );
      return acc.concat(labPendingBookings || []);
    }, []);

    if (!pendingBookings.length) {
      return res.status(404).json({ message: 'No pending cancelled found for this lab owner.' });
    }

    // Return the found bookings in a similar format
    res.status(200).json({
      message: 'Pending bookings retrieved successfully',
      allBookings: pendingBookings, // Using the same key as in getLab
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pending bookings', error: error.message });
  }
};

export const getCompleted = async (req, res) => {
  try {
    const { labownermobile } = req.body; // Extract labownermobile from the request body

    console.log(`Fetching pending bookings for lab owner mobile: ${labownermobile}`);

    const LabModel = createLab(req.conn2);

    // Find bookings where labownermobile matches and status is pending
    const labs = await LabModel.find({}); // Retrieve all labs

    // Filter and flatten the pending bookings
    const pendingBookings = labs.reduce((acc, lab) => {
      const labPendingBookings = lab.bookings.filter(booking => 
        booking.labownermobile === labownermobile && booking.status === 'completed'
      );
      return acc.concat(labPendingBookings || []);
    }, []);

    if (!pendingBookings.length) {
      return res.status(404).json({ message: 'No completed bookings found for this lab owner.' });
    }

    // Return the found bookings in a similar format
    res.status(200).json({
      message: 'Pending bookings retrieved successfully',
      allBookings: pendingBookings, // Using the same key as in getLab
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pending bookings', error: error.message });
  }
};