const express = require("express");
const { flightModel } = require("../models/flight.model");
const flightRouter = express.Router();

// flight added
flightRouter.post("/api/flights", async (req, res) => {
  try {
    const flight = req.body;
    const data = new flightModel(flight);
    await data.save();
    res.status(201).json({ msg: "flight data added sucessfully" });
  } catch (error) {
    res.status(201).json({ msg: error.message });
  }
});

// get flight data
flightRouter.get("/api/flights", async (req, res) => {
  try {
    const flight = await flightModel.find();
    res.status(200).send(flight);
  } catch (error) {
    res.status(201).json({ msg: error.message });
  }
});

// get flight data by id
flightRouter.get("/api/flights/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const flight = await flightModel.find({ _id: id });
    res.status(200).send(flight);
  } catch (error) {
    res.status(201).json({ msg: error.message });
  }
});

// update flight data by id
flightRouter.patch("/api/flights/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await flightModel.findByIdAndUpdate({ _id: id });
    res.status(201).send("flight updated sucessful");
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
});

// update flight data by id
flightRouter.delete("/api/flights/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await flightModel.findByIdAndDelete({ _id: id });
    res.status(202).send(`flight deleted sucessful `);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
});

module.exports = { flightRouter };
