// import createLab from "../models/MedicineModel.js"; // Adjust the path based on your project structure
// import createVaccine from "../models/vaccination.js"; // Adjust the path based on your project structure
// export const getcompletedMedicine = async (req, res) => {
//   try {
//     const Lab = createLab(req.conn2);
//     const Vaccine = createVaccine(req.conn2);

//     // Log to ensure Lab is created
//     console.log("Lab model created successfully");

//     const labs = await Lab.find({}); // Retrieve all documents
//     console.log("Retrieved labs:", labs);

//     if (!labs.length) {
//       return res.status(404).json({ message: "No Labs found in the database" });
//     }

//     // Flatten and filter bookings with status 'incoming'
//     const allBookings = labs.reduce((acc, lab) => {
//       const incomingBookings = lab.bookings.filter(
//         (booking) => booking.status === "completed"
//       );
//       return acc.concat(incomingBookings || []);
//     }, []);

//     console.log("Incoming bookings:", allBookings); // Log filtered bookings

//     if (!allBookings.length) {
//       return res.status(404).json({ message: "No completed bookings found" });
//     }

//     res.status(200).json({ allBookings });
//   } catch (error) {
//     console.error("Error retrieving bookings:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to retrieve bookings",
//       error: error.message,
//     });
//   }
// };
// export const getcompletedVaccine = async (req, res) => {
//   try {
//     // const Lab = createLab(req.conn2);
//     const Lab = createVaccine(req.conn2);
//     // Log to ensure Lab is created
//     console.log("Lab model created successfully");

//     const labs = await Lab.find({}); // Retrieve all documents
//     console.log("Retrieved labs:", labs);

//     if (!labs.length) {
//       return res.status(404).json({ message: "No Labs found in the database" });
//     }

//     // Flatten and filter bookings with status 'incoming'
//     const allBookings = labs.reduce((acc, lab) => {
//       const incomingBookings = lab.bookings.filter(
//         (booking) => booking.status === "completed"
//       );
//       return acc.concat(incomingBookings || []);
//     }, []);

//     console.log("Incoming bookings:", allBookings); // Log filtered bookings

//     if (!allBookings.length) {
//       return res.status(404).json({ message: "No completed bookings found" });
//     }

//     res.status(200).json({ allBookings });
//   } catch (error) {
//     console.error("Error retrieving bookings:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to retrieve bookings",
//       error: error.message,
//     });
//   }
// };




import createLab from "../models/MedicineModel.js"; // Adjust the path based on your project structure
import createVaccine from "../models/vaccination.js"; // Adjust the path based on your project structure


export const getcompletedMedicine = async (req, res) => {
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

export const getcompletedVaccine = async (req, res) => {
  try {
    const { labownermobile } = req.body; // Extract labownermobile from the request body

    console.log(`Fetching pending bookings for lab owner mobile: ${labownermobile}`);

    const LabModel = createVaccine(req.conn2);

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
