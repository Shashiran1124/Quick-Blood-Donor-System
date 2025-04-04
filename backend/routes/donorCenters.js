const express = require('express');
const router = express.Router();
const DonorCenter = require('../models/DonorCenter');

// CREATE
router.post('/add', async (req, res) => {
  try {
    const newCenter = new DonorCenter(req.body);
    await newCenter.save();
    res.status(201).json({ message: 'Donor center created successfully', data: newCenter });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ all
router.get('/get', async (req, res) => {
  try {
    const centers = await DonorCenter.find();
    res.json(centers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ one
router.get('/:id', async (req, res) => {
  try {
    const center = await DonorCenter.findById(req.params.id);
    if (!center) return res.status(404).json({ error: 'Center not found' });
    res.json(center);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put('/update/:id', async (req, res) => {
  try {
    const updatedCenter = await DonorCenter.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedCenter) return res.status(404).json({ error: 'Center not found' });
    res.json({ message: 'Center updated successfully', data: updatedCenter });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedCenter = await DonorCenter.findByIdAndDelete(req.params.id);
    if (!deletedCenter) return res.status(404).json({ error: 'Center not found' });
    res.json({ message: 'Center deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
