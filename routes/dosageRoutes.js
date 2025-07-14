// import express from 'express';
// import { createDosage} from '../controllers/dosageController.js';
// // import { createDosage, getDosages, getDosageById, updateDosage, deleteDosage } from '../controllers/dosageController.js';

// const router = express.Router();

// // Define your routes
// router.post('/', createDosage);
// // router.get('/', getDosages);
// // router.get('/:id', getDosageById);
// // router.put('/:id', updateDosage);
// // router.delete('/:id', deleteDosage);

// export default router;


// // import express from 'express';
// // import { createDosage} from '../controllers/dosageController.js';
// // // import { createDosage, getDosages, getDosageById, updateDosage, deleteDosage } from '../controllers/dosageController.js';

// // const router = express.Router();

// // // Define your routes
// // router.post('/', createDosage);
// // // router.get('/', getDosages);
// // // router.get('/:id', getDosageById);
// // // router.put('/:id', updateDosage);
// // // router.delete('/:id', deleteDosage);

// // export default router;


// -------------------------------------
import express from 'express';
import { createDosage1,createDosage2} from '../controllers/dosageController.js';
// import { createDosage, getDosages, getDosageById, updateDosage, deleteDosage } from '../controllers/dosageController.js';

const router = express.Router();

// Define your routes
router.post('/1/:labId', createDosage1);
router.post('/2/:labId', createDosage2);
// router.get('/', getDosages);
// router.get('/:id', getDosageById);
// router.put('/:id', updateDosage);
// router.delete('/:id', deleteDosage);

export default router;
