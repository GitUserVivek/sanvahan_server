import express from "express";
import TruckOwner from "../models/TruckOwner.js";

const router = express.Router();

// Create a new truck owner
router.post("/", async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;
        const newTruckOwner = new TruckOwner({ name, email, phone, password });
        await newTruckOwner.save();
        res.status(201).json(newTruckOwner);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all truck owners
router.get("/", async (req, res) => {
    try {
        const truckOwners = await TruckOwner.find();
        res.status(200).json(truckOwners);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a truck owner by ID
router.get("/:id", async (req, res) => {
    try {
        const truckOwner = await TruckOwner.findById(req.params.id);
        if (!truckOwner) {
            return res.status(404).json({ message: "Truck owner not found" });
        }
        res.status(200).json(truckOwner);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a truck owner
router.put("/:id", async (req, res) => {
    try {
        const updatedTruckOwner = await TruckOwner.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTruckOwner) {
            return res.status(404).json({ message: "Truck owner not found" });
        }
        res.status(200).json(updatedTruckOwner);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a truck owner
router.delete("/:id", async (req, res) => {
    try {
        const deletedTruckOwner = await TruckOwner.findByIdAndDelete(req.params.id);
        if (!deletedTruckOwner) {
            return res.status(404).json({ message: "Truck owner not found" });
        }
        res.status(200).json({ message: "Truck owner deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
