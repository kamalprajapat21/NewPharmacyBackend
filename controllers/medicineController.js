// // medicineController.js

// import MedicineModel from '../models/MedicineModel.js'; // Adjust the path based on your project structure

// export const getMedicine = async (req, res) => {
//   try {
//     const Medicine = MedicineModel(req.conn2);
//     const medicines = await Medicine.find({}); // Retrieve all documents

//     // Log the retrieved documents
//     console.log('Retrieved medicines:', JSON.stringify(medicines, null, 2));

//     // Flatten and log all bookings
//     const allBookings = medicines.reduce((acc, medicine) => {
//       medicine.bookings.forEach(booking => {
//         console.log('Booking:', JSON.stringify(booking, null, 2)); // Log individual booking
//       });
//       return acc.concat(medicine.bookings || []);
//     }, []);

//     // Log all bookings before sending response
//     console.log('All bookings:', JSON.stringify(allBookings, null, 2));

//     res.status(200).json({ allBookings });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Failed to retrieve bookings',
//       error: error.message,
//     });
//   }
// };

// // final working booking
// import createLab from '../../models/BOOKING/Lab.js'; // Adjust the path based on your project structure
// import mongoose from 'mongoose';
// export const getLab = async (req, res) => {
//   try {
//     const Lab = createLab(req.conn2);
//     const labs = await Lab.find({}); // Retrieve all documents

//     // Log the retrieved documents
//     console.log('Retrieved labs:', JSON.stringify(labs, null, 2));

//     // Flatten and log all bookings
//     const allBookings = labs.reduce((acc, lab) => {
//       lab.bookings.forEach(booking => {
//         console.log('Booking:', JSON.stringify(booking, null, 2)); // Log individual booking
//       });
//       return acc.concat(lab.bookings || []);
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


// // Establish connection to MongoDB
// const conn = mongoose.connection;
// let gfs;

// conn.once('open', () => {
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection('uploads'); // Ensure you set the correct collection name
// });

// // Controller to retrieve the prescription by ID
// export const getPrescriptionById = async (req, res) => {
//   try {
//     const { id } = req.params.id;
//     console.log(id)
    
//     if (!id || !mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ success: false, message: 'Invalid prescription ID' });
//     }

//     gfs.files.findOne({ _id: mongoose.Types.ObjectId(id) }, (err, file) => {
//       if (err || !file) {
//         return res.status(404).json({ success: false, message: 'Prescription not found' });
//       }

//       // Check if the file is an image
//       if (file.contentType === 'image/jpeg' || file.contentType === 'image/png' || file.contentType === 'application/pdf') {
//         const readstream = gfs.createReadStream({ _id: file._id });
//         res.set('Content-Type', file.contentType);
//         readstream.pipe(res);
//       } else {
//         res.status(400).json({ success: false, message: 'File is not an image' });
//       }
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Failed to retrieve prescription',
//       error: error.message,
//     });
//   }
// };


// // Controller to retrieve the prescription by ID
// export const getPrescriptionById = async (req, res) => {
//   try {
//     const { id } = req.params.id;
//     console.log(id)
    
//     if (!id || !mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ success: false, message: 'Invalid prescription ID' });
//     }

//     gfs.files.findOne({ _id: mongoose.Types.ObjectId(id) }, (err, file) => {
//       if (err || !file) {
//         return res.status(404).json({ success: false, message: 'Prescription not found' });
//       }

//       // Check if the file is an image
//       if (file.contentType === 'image/jpeg' || file.contentType === 'image/png' || file.contentType === 'application/pdf') {
//         const readstream = gfs.createReadStream({ _id: file._id });
//         res.set('Content-Type', file.contentType);
//         readstream.pipe(res);
//       } else {
//         res.status(400).json({ success: false, message: 'File is not an image' });
//       }
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Failed to retrieve prescription',
//       error: error.message,
//     });
//   }
// };



// //practice
// import createLab from '../../models/BOOKING/Lab.js'; // Adjust the path based on your project structure
// import mongoose from 'mongoose';
// export const getLab = async (req, res) => {
  //   try {
    //     const Lab = createLab(req.conn2);
    //     const labs = await Lab.find({}); // Retrieve all documents
    
    //     // Log the retrieved documents
    //     console.log('Retrieved labs:', JSON.stringify(labs, null, 2));
    
    //     // Flatten and filter bookings with status 'incoming'
    //     const allBookings = labs.reduce((acc, lab) => {
      //       const incomingBookings = lab.bookings.filter(booking => booking.status === 'incoming');
      
      //       // Log individual incoming booking
      //       incomingBookings.forEach(booking => {
        //         console.log('Incoming Booking:', JSON.stringify(booking, null, 2)); // Log individual booking
        //       });
        
        //       return acc.concat(incomingBookings || []);
        //     }, []);
        
        //     // Log filtered bookings before sending response
        //     console.log('Incoming bookings:', JSON.stringify(allBookings, null, 2));
        
        //     res.status(200).json({ allBookings });
        //   } catch (error) {
          //     res.status(500).json({
            //       success: false,
            //       message: 'Failed to retrieve bookings',
            //       error: error.message,
            //     });
            //   }
            // };
            
            
            import createLab from '../models/MedicineModel.js'; // Adjust the path based on your project structure
            export const getMedicine = async (req, res) => {
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