const Disaster = require("../models/Disaster");

const getDisasters = async (req, res) => {
  try {
    const disasters = await Disaster.find();
    res.json(disasters);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving disasters" });
  }
};

const addDisaster = async (req, res) => {
  try {
    const newDisaster = new Disaster(req.body);
    await newDisaster.save();
    res.status(201).json(newDisaster);
  } catch (error) {
    res.status(400).json({ message: "Error adding disaster" });
  }
};

module.exports = { getDisasters, addDisaster };
