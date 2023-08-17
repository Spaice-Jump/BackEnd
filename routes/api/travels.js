const express = require('express');
const router = express.Router();
const Travels = require('../../models/Travels');

// GET /api/travels Return all travels.

router.get('/', async (req, res, next) => {
  try {
    const filter = {};
    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip);
    const sort = req.query.sort;
    const select = req.query.select;
    const result = await Travels.list(filter, limit, skip, sort, select);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// GET /api/travels/:id Return a travel find by id.

router.get('/:id', async (req, res, next) => {
  try {
    const _id = req.params.id;
    const result = await Travels.findOne({ _id: _id });
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// POST /api/travels Create a new travel.

router.post('/', async (req, res, next) => {
  try {
    const data = req.body;
    const travel = new Travels(data);
    const result = await travel.save();
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// PUT /api/travels/:id Update a travel by id.

router.put('/:id', async (req, res, next) => {
  try {
    const _id = req.params.id;
    const data = req.body;
    const result = await Travels.findOneAndUpdate({ _id: _id }, data, {
      new: true,
    });
    res.json(result);
  } catch (err) {
    next(err);
  }
}); 

// DELETE /api/travels/:id Delete a travel by id.

router.delete('/:id', async (req, res, next) => {
  try { 
    const _id = req.params.id;
    await Travels.deleteOne({ _id: _id });
    res.json();
  } catch (err) {
    next(err);
  }   
});

module.exports = router;