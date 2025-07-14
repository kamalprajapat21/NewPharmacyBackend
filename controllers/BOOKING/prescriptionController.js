// import mongoose from 'mongoose';
// import Grid from 'gridfs-stream';

// const conn = mongoose.connection;
// let gfs;
// conn.once('open', () => {
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection('uploads');
//   console.log(conn.db)
// });

// // Controller to retrieve prescription by ID
// export const getPrescriptionById = async (req, res) => {
//   const { id } = req.params;
//   console.log(id)

//   try {
//     // Find the file by ID in GridFS
//     const file = await gfs.files.findOne({ _id: mongoose.Types.ObjectId(id) });

//     if (!file || file.length === 0) {
//       return res.status(404).json({ error: 'File not found' });
//     }

//     // Set appropriate content type for the file
//     res.set('Content-Type', file.contentType);
//     res.set('Content-Disposition', 'attachment; filename=' + file.filename);

//     // Create a read stream from the GridFS bucket and pipe it to the response
//     const readStream = gfs.createReadStream({ _id: id });
//     readStream.pipe(res);

//     readStream.on('error', (err) => {
//       res.status(500).json({ error: 'Failed to retrieve file' });
//     });
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// };


// import mongoose from 'mongoose';
// import Grid from 'gridfs-stream';

// const conn = mongoose.connection;
// let gfs;

// // Log when the MongoDB connection is open
// conn.once('open', () => {
//   console.log('MongoDB connection is open');
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection('uploads');
// });

// // Controller to retrieve prescription by ID
// export const getPrescriptionById = async (req, res) => {
//   const { id } = req.params;

//   // Check if gfs is initialized
//   if (!gfs) {
//     console.error('GridFS not initialized');
//     return res.status(500).json({ error: 'GridFS not initialized' });
//   }

//   // Check if the ID is a valid ObjectId
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     console.error('Invalid ID format');
//     return res.status(400).json({ error: 'Invalid ID format' });
//   }

//   try {
//     // Find the file by ID in GridFS
//     const file = await gfs.files.findOne({ _id: mongoose.Types.ObjectId(id) });

//     if (!file || file.length === 0) {
//       console.error('File not found');
//       return res.status(404).json({ error: 'File not found' });
//     }

//     // Set appropriate content type for the file
//     res.set('Content-Type', file.contentType);
//     res.set('Content-Disposition', 'attachment; filename=' + file.filename);

//     // Create a read stream from the GridFS bucket and pipe it to the response
//     const readStream = gfs.createReadStream({ _id: id });

//     readStream.on('error', (err) => {
//       console.error('Error while reading the stream:', err);
//       res.status(500).json({ error: 'Failed to retrieve file' });
//     });

//     readStream.pipe(res);

//   } catch (error) {
//     console.error('Error retrieving file:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };


import mongoose from 'mongoose';
import Grid from 'gridfs-stream';

// Controller to retrieve prescription by ID
export const getPrescriptionById = async (req, res) => {
  const { id } = req.params;

  // Ensure we have access to the correct database connection
  const db = req.conn2;

  if (!db) {
    console.error('Database connection not found in request');
    return res.status(500).json({ error: 'Database connection not found' });
  }

  let gfs;
  try {
    // Initialize GridFS using the database connection from the request
    gfs = Grid(db.db, mongoose.mongo);
    gfs.collection('uploads');
  } catch (error) {
    console.error('Failed to initialize GridFS:', error);
    return res.status(500).json({ error: 'Failed to initialize GridFS' });
  }

  // Check if the ID is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.error('Invalid ID format');
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  try {
    // Find the file by ID in GridFS
    const file = await gfs.files.findOne({ _id: mongoose.Types.ObjectId(id) });

    if (!file) {
      console.error('File not found');
      return res.status(404).json({ error: 'File not found' });
    }

    // Set appropriate content type for the file
    res.set('Content-Type', file.contentType);
    res.set('Content-Disposition', 'attachment; filename=' + file.filename);

    // Create a read stream from the GridFS bucket and pipe it to the response
    const readStream = gfs.createReadStream({ _id: id });

    readStream.on('error', (err) => {
      console.error('Error while reading the stream:', err);
      res.status(500).json({ error: 'Failed to retrieve file' });
    });

    readStream.pipe(res);
  } catch (error) {
    console.error('Error retrieving file:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
