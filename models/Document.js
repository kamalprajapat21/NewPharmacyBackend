
// // backend/models/Document.js
// import mongoose from 'mongoose';

// const documentSchema = new mongoose.Schema({
//   // Other fields as per your requirement
//   aadharCards: [{
//         type: String, // Assuming storing file paths
//         required: true
//       }],
//   // type: mongoose.Schema.Types.ObjectId,
//   //   ref: 'BookingforUrgent',
//   price: Number,
//   discount: Number,
//   discountedPrice: Number,
  
// });
//   // Other fields


// const Document = mongoose.model('Document', documentSchema);

// export default Document;



// backend/models/Document.js
import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  // Other fields as per your requirement
  aadharCards: [{
        type: String, // Assuming storing file paths
        required: true
      }],
  // type: mongoose.Schema.Types.ObjectId,
  //   ref: 'BookingforUrgent',
  price: Number,
  discount: Number,
  discountedPrice: Number,
  
});
  // Other fields


const Document = mongoose.model('Document', documentSchema);

export default Document;

