import express from "express";
import ShipmentRequest from "../models/ShipmentRequest.js";

const router = express.Router();

// Create a new shipment request
router.post("/", async (req, res) => {
    try {
        const { customer_id, from_location, to_location, weight } = req.body;
        const newShipmentRequest = new ShipmentRequest({
            customer_id,
            from_location,
            to_location,
            weight
        });
        await newShipmentRequest.save();
        res.status(201).json(newShipmentRequest);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all shipment requests
router.get("/", async (req, res) => {
    try {
        const shipmentRequests = await ShipmentRequest.find();
        res.status(200).json(shipmentRequests);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a shipment request by ID
router.get("/:id", async (req, res) => {
    try {
        const shipmentRequest = await ShipmentRequest.findById(req.params.id);
        if (!shipmentRequest) {
            return res.status(404).json({ message: "Shipment request not found" });
        }
        res.status(200).json(shipmentRequest);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a shipment request
router.put("/:id", async (req, res) => {
    try {
        const updatedShipmentRequest = await ShipmentRequest.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedShipmentRequest) {
            return res.status(404).json({ message: "Shipment request not found" });
        }
        res.status(200).json(updatedShipmentRequest);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a shipment request
router.delete("/:id", async (req, res) => {
    try {
        const deletedShipmentRequest = await ShipmentRequest.findByIdAndDelete(req.params.id);
        if (!deletedShipmentRequest) {
            return res.status(404).json({ message: "Shipment request not found" });
        }
        res.status(200).json({ message: "Shipment request deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
