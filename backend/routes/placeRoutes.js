const express = require("express");
const router = express.Router();
const Place = require("../models/Place");

// GET ALL
router.get("/", async (req, res) => {
  const places = await Place.find();
  res.json(places);
});

// ADD
router.post("/", async (req, res) => {
  const place = new Place(req.body);
  await place.save();
  res.json(place);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Place.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// UPDATE (EDIT + RATING)
router.put("/:id", async (req, res) => {
  const updated = await Place.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

module.exports = router;