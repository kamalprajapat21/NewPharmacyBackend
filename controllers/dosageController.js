// --------------------------------
import createDosagemodel1 from '../models/Dosage1.js';
import createDosagemodel2 from '../models/Dosage2.js';

export const createDosage1 = async (req, res) => {
  try {
    const Dosage = createDosagemodel1(req.conn2)
    const {labId} = req.params;
    const { dosage } = req.body;
    const newDosage = new Dosage({ dosage,labId });
    await newDosage.save();
    res.status(201).json(newDosage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const createDosage2 = async (req, res) => {
  try {
    const Dosage = createDosagemodel2(req.conn2)
    const {labId} = req.params;
    const { dosage } = req.body;
    const newDosage = new Dosage({ dosage,labId });
    await newDosage.save();
    res.status(201).json(newDosage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDosages = async (req, res) => {
  try {
    const dosages = await Dosage.find();
    res.status(200).json(dosages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a dosage by ID
export const getDosageById = async (req, res) => {
  try {
    const { id } = req.params;
    const dosage = await Dosage.findById(id);
    if (!dosage) {
      return res.status(404).json({ message: 'Dosage not found' });
    }
    res.status(200).json(dosage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a dosage by ID
export const updateDosage = async (req, res) => {
  try {
    const { id } = req.params;
    const { dosage } = req.body;
    const updatedDosage = await Dosage.findByIdAndUpdate(id, { dosage }, { new: true });
    if (!updatedDosage) {
      return res.status(404).json({ message: 'Dosage not found' });
    }
    res.status(200).json(updatedDosage);
  } catch (error) {
    res.status (500).json({ error: error.message });
  }
};

// Delete a dosage by ID
export const deleteDosage = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDosage = await Dosage.findByIdAndDelete(id);
    if (!deletedDosage) {
      return res.status(404).json({ message: 'Dosage not found' });
    }
    res.status(200).json({ message: 'Dosage deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
