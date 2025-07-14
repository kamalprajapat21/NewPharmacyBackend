// // backend/models/Document.js
// import mongoose from 'mongoose';

// const dosageSchema = new mongoose.Schema({
//   // dosage: { type: String, required: true },

//   // dosage: [{
//   //     type: String, // Assuming storing file paths
//   //     required: true
//   //   }],
//   // }, { timestamps: true });
//   dosage: {
//     type: String // Assuming storing file paths
    
//   },
// }, { timestamps: true });

// const Dosage = mongoose.model('Dosage', dosageSchema);

// export default Dosage;



// backend/models/Document.js
import mongoose from 'mongoose';

const dosageSchema = new mongoose.Schema({
  dosage: String,
  labId:String
}, { timestamps: true });

// const Dosage = mongoose.model('Dosage', dosageSchema);
export default (conn) => conn.model('Dosage1', dosageSchema);


