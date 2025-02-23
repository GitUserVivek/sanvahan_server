import express from "express";
import Truck from "../models/Truck.js";

const router = express.Router();

// Create a new truck
router.post("/", async (req, res) => {
    try {
        const { truck_owner_id, license_plate, capacity } = req.body;
        const newTruck = new Truck({ truck_owner_id, license_plate, capacity });
        await newTruck.save();
        res.status(201).json(newTruck);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all trucks
router.get("/", async (req, res) => {
    try {
        const trucks = await Truck.find();
        res.status(200).json(trucks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a truck by ID
router.get("/:id", async (req, res) => {
    try {
        const truck = await Truck.findById(req.params.id);
        if (!truck) {
            return res.status(404).json({ message: "Truck not found" });
        }
        res.status(200).json(truck);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a truck
router.put("/:id", async (req, res) => {
    try {
        const updatedTruck = await Truck.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTruck) {
            return res.status(404).json({ message: "Truck not found" });
        }
        res.status(200).json(updatedTruck);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a truck
router.delete("/:id", async (req, res) => {
    try {
        const deletedTruck = await Truck.findByIdAndDelete(req.params.id);
        if (!deletedTruck) {
            return res.status(404).json({ message: "Truck not found" });
        }
        res.status(200).json({ message: "Truck deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
