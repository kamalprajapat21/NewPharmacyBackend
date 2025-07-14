// //backend/confi/db  atlas database
// import mongoose from 'mongoose';

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI|| 'mongodb+srv://pharmacy:IRH5Pe9roBEpryh3@pharmacycluster.nllme1p.mongodb.net/?retryWrites=true&w=majority&appName=pharmacyCluster', {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       serverSelectionTimeoutMS: 50000, // Increase timeout to 50 seconds
//       socketTimeoutMS: 45000, // Set socket timeout to 45 seconds
//     });
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (err) {
//     console.error(`Error: ${err.message}`);
//     process.exit(1);
//   }
// };

// export default connectDB;



// // backend/config/db.js  single DB
// import mongoose from 'mongoose';
// import dotenv from 'dotenv'

// dotenv.config()

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       serverSelectionTimeoutMS: 50000, // Increase timeout to 50 seconds
//       socketTimeoutMS: 45000, // Set socket timeout to 45 seconds 
//     });
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (err) {
//     console.error(`Error: ${err.message}`);
//     process.exit(1);
//   }
// };

// export default connectDB;

// 2DB
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';

// dotenv.config();

// // Create first connection
// const connectDB1 = async () => {
//   try {
//     const conn = await mongoose.createConnection(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       serverSelectionTimeoutMS: 50000, // Increase timeout to 50 seconds
//       socketTimeoutMS: 45000, // Set socket timeout to 45 seconds
//     });
//     console.log(`MongoDB Connection 1: ${conn.host}`);
//     return conn;
//   } catch (err) {
//     console.error(`Error: ${err.message}`);
//     process.exit(1);
//   }
// };

// // Create second connection
// const connectDB2 = async () => {
//   try {
//     const conn = await mongoose.createConnection(process.env.MONGO_URI2, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       serverSelectionTimeoutMS: 50000, // Increase timeout to 50 seconds
//       socketTimeoutMS: 45000, // Set socket timeout to 45 seconds
//     });
//     console.log(`MongoDB Connection 2: ${conn.host}`);
//     return conn;
//   } catch (err) {
//     console.error(`Error: ${err.message}`);
//     process.exit(1);
//   }
// };

// export { connectDB1, connectDB2 };

// code of 2Database repo
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';

// dotenv.config();

// const connectDB = async () => {
//   try {
//     const conn1 = await mongoose.createConnection(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     const conn2 = await mongoose.createConnection(process.env.MONGO_URI2, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     console.log(`MONGODB CONNECTED1: UsersDB - ${conn1.client.s.url}, \n \n MONGODB CONNECTED2: BookingsDB - ${conn2.client.s.url}`);

//     return { conn1, conn2 };
//   } catch (error) {
//     console.error(`Error: ${error.message}`);
//     process.exit(1);
//   }
// };

// export default connectDB;

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const connectDB = async () => {
  try {
    const conn1 = mongoose.createConnection(process.env.MONGO_URI);
    const conn2 = mongoose.createConnection(process.env.MONGO_URI2);
    
    // Event listeners for connection 1
    conn1.on('connected', () => {
      console.log('Mongoose connected to UsersDB');
    });
    conn1.on('error', (err) => {
      console.log('Mongoose connection error for UsersDB:', err);
    });
    
    // Event listeners for connection 2
    conn2.on('connected', () => {
      console.log('Mongoose connected to BookingsDB');
    });
    conn2.on('error', (err) => {
      console.log('Mongoose connection error for BookingsDB:', err);
    });

    console.log(`MONGODB CONNECTED: UsersDB - ${conn1.client.s.url}`);
    console.log(`MONGODB CONNECTED: BookingsDB - ${conn2.client.s.url}`);
    
    return { conn1, conn2 };
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

 export default connectDB;