import express from "express";
import Driver from "../models/Driver.js";

const router = express.Router();

// Create a new driver
router.post("/", async (req, res) => {
    try {
        const { truck_owner_id, name, email, phone, assigned_truck, password } = req.body;
        const newDriver = new Driver({ truck_owner_id, name, email, phone, assigned_truck, password });
        await newDriver.save();
        res.status(201).json(newDriver);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all drivers
router.get("/", async (req, res) => {
    try {
        const drivers = await Driver.find();
        res.status(200).json(drivers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a driver by ID
router.get("/:id", async (req, res) => {
    try {
        const driver = await Driver.findById(req.params.id);
        if (!driver) {
            return res.status(404).json({ message: "Driver not found" });
        }
        res.status(200).json(driver);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a driver
router.put("/:id", async (req, res) => {
    try {
        const updatedDriver = await Driver.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedDriver) {
            return res.status(404).json({ message: "Driver not found" });
        }
        res.status(200).json(updatedDriver);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a driver
router.delete("/:id", async (req, res) => {
    try {
        const deletedDriver = await Driver.findByIdAndDelete(req.params.id);
        if (!deletedDriver) {
            return res.status(404).json({ message: "Driver not found" });
        }
        res.status(200).json({ message: "Driver deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
