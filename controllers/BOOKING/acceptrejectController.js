//updating code so that pending bookings are unique for particular lab owner
  
import express from 'express';
// import createLab from '../../models/BOOKING/Lab.js';
import createMedicine from '../../models/MedicineModel.js'
import createVaccine from '../../models/vaccination.js'
import createUser1 from '../../models/User1.js';

// import express from 'express';
// import createLab from '../../models/BOOKING/Lab.js';

export const acceptMedicine = async (req, res) => {
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
  
