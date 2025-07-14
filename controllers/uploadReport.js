// import multer from 'multer';
// import { GridFsStorage } from 'multer-gridfs-storage';
// import dotenv from 'dotenv';
// import mongoose from 'mongoose';
// import gridfsStream from 'gridfs-stream';
// // import Document from '../models/Document.js';
// import createMedicine from '../models/MedicineModel.js';

// dotenv.config();

// // Initialize GridFS
// const conn = mongoose.connection;
// let gfs;
// conn.once('open', () => {
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection('uploads'); // Set the collection where files will be stored
// });

// // Create storage engine for multer-gridfs-storage
// const storage = new GridFsStorage({
//   url: process.env.MONGO_URI2, // Ensure this is the correct DB URI
//   file: (req, file) => {
//     return {
//       filename: `${Date.now()}-${file.originalname}`, // Customize filename as needed
//       bucketName: 'uploads' // Files will be stored in the 'uploads' bucket
//     };
//   }
// });

// const upload = multer({ storage }).single('uploadreport'); // single file upload

// export const uploadReport = (req, res) => {
//   const Medicine = createMedicine(req.conn2); // Use the correct db connection
//   const { labId } = req.params; // Extract labId from URL params

//   upload(req, res, async (err) => {
//     if (err) {
//       return res.status(400).json({ error: `Error during file upload: ${err.message}` });
//     }

//     if (!req.files || req.files.length === 0) {
//       return res.status(400).send({ error: 'No files were uploaded.' });
//     }
//     const { price, discount } = req.body;
//      console.log(price,discount)
//     // if (!price || isNaN(price)) {
//     //   return res.status(400).send({ error: 'Price is required and must be a number.' });
//     // }
//     // if (discount && isNaN(discount)) {
//     //   return res.status(400).send({ error: 'Discount must be a number.' });
//     // }
    
//     // if (discount && discount >= price) {
//     //   return res.status(400).send({ error: 'Discount must be less than the price.' });
//     // }

//     // if (discount > 100) {
//     //   return res.status(400).send({ error: 'Discount must not be greater than 100.' });
//     // }

//     const discountedPrice = price - (price * (discount / 100));
// try {
//   const medicine = await Medicine.findOneAndUpdate(
//     { "bookings.labId": labId }, // Find the booking by labId
//     {
//       $set: { "bookings.$[elem].labreportId": req.file.id,
//       "bookings.$[elem].price": price,
//       "bookings.$[elem].discount": discount,
//       "bookings.$[elem].discountedPrice": discountedPrice
//        }// Set the labreportId with the file's ID
//     },
//     {
//       new: true, // Return the updated document
//       arrayFilters: [{ "elem.labId": labId }] // Apply array 
//     }
//   );

//   if (!medicine) {
//     return res.status(404).json({ message: 'Booking not found.' });
//   }
//   console.log('Updated lab:', medicine);
//   res.status(201).json(medicine);

// } catch (error) {
//   console.error('Error updating booking with report:', error);
//   res.status(500).json({ error: 'Failed to update document with report.' });
// }
// });
// };


import multer from 'multer';
import mongoose from 'mongoose';
import Grid from 'gridfs-stream';
import { GridFsStorage } from 'multer-gridfs-storage';
import dotenv from 'dotenv';
import createLab from '../models/MedicineModel.js'; // Assuming Lab model
import createVaccine from '../models/vaccination.js'; // Assuming Vaccine model

dotenv.config();

// Initialize GridFS
const conn = mongoose.connection;
let gfs;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads'); // Set the collection where files will be stored
});

// Create storage engine for multer-gridfs-storage
const storage = new GridFsStorage({
  url: process.env.MONGO_URI2, // Ensure this is the correct DB URI
  file: (req, file) => {
    return {
      filename: `${Date.now()}-${file.originalname}`, // Customize filename as needed
      bucketName: 'uploads' // Files will be stored in the 'uploads' bucket
    };
  }
});

// Set up multer to handle single file upload
const upload = multer({ storage }).single('uploadreport'); // single file upload

// const upload = multer({ storage }).single('uploadreport'); // Handle single file upload with field name 'uploadreport'

export const uploadReport = async (req, res) => {
  const LabModel = createLab(req.conn2); // Use the correct db connection
  const { labId } = req.params; // Extract labId from URL params

  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: `Error during file upload: ${err.message}` });
    }

    // Log to verify data received
    console.log('Request Body:', req.body); // Log body fields like price and discount
    console.log('Uploaded File:', req.file); // Log file details

    const { price, discount } = req.body;
    console.log('Price:', price, 'Discount:', discount); // Check if fields are accessible

    // Calculate the discounted price
    const discountedPrice = price - (price * (discount / 100));

    try {
      // Find and update the booking by labId, setting the uploaded file's GridFS ID
      const lab = await LabModel.findOneAndUpdate(
        { "bookings.labId": labId }, // Find the booking by labId
        {
          $set: {
            "bookings.$[elem].labreportId": req.file.id,
            "bookings.$[elem].price": price,
            "bookings.$[elem].discount": discount,
            "bookings.$[elem].discountedPrice": discountedPrice
          } // Set the labreportId with the file's ID
        },
        {
          new: true, // Return the updated document
          arrayFilters: [{ "elem.labId": labId }] // Apply array filter to update the correct booking
        }
      );

      // If no lab is found, return an error
      if (!lab) {
        return res.status(404).json({ message: 'Booking not found.' });
      }

      console.log('Updated lab:', lab);

      // Return the updated lab document with the newly added file ID
      res.status(201).json(lab);

    } catch (error) {
      console.error('Error updating booking with report:', error);
      res.status(500).json({ error: 'Failed to update document with report.' });
    }
  });
};
export const uploadReport2 = async (req, res) => {
  const LabModel = createVaccine(req.conn2); // Use the correct db connection
  const { labId } = req.params; // Extract labId from URL params

  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: `Error during file upload: ${err.message}` });
    }

    // Log to verify data received
    console.log('Request Body:', req.body); // Log body fields like price and discount
    console.log('Uploaded File:', req.file); // Log file details

    const { price, discount } = req.body;
    console.log('Price:', price, 'Discount:', discount); // Check if fields are accessible

    // Calculate the discounted price
    const discountedPrice = price - (price * (discount / 100));

    try {
      // Find and update the booking by labId, setting the uploaded file's GridFS ID
      const lab = await LabModel.findOneAndUpdate(
        { "bookings.labId": labId }, // Find the booking by labId
        {
          $set: {
            "bookings.$[elem].labreportId": req.file.id,
            "bookings.$[elem].price": price,
            "bookings.$[elem].discount": discount,
            "bookings.$[elem].discountedPrice": discountedPrice
          } // Set the labreportId with the file's ID
        },
        {
          new: true, // Return the updated document
          arrayFilters: [{ "elem.labId": labId }] // Apply array filter to update the correct booking
        }
      );

      // If no lab is found, return an error
      if (!lab) {
        return res.status(404).json({ message: 'Booking not found.' });
      }

      console.log('Updated lab:', lab);

      // Return the updated lab document with the newly added file ID
      res.status(201).json(lab);

    } catch (error) {
      console.error('Error updating booking with report:', error);
      res.status(500).json({ error: 'Failed to update document with report.' });
    }
  });
};
