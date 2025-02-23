import express from "express";
import BidAcceptance from "../models/BidAcceptance.js";

const router = express.Router();

// Create a new bid acceptance
router.post("/", async (req, res) => {
    try {
        const { bid_id, truck_id, driver_id } = req.body;
        const newBidAcceptance = new BidAcceptance({ bid_id, truck_id, driver_id });
        await newBidAcceptance.save();
        res.status(201).json(newBidAcceptance);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all bid acceptances
router.get("/", async (req, res) => {
    try {
        const bidAcceptances = await BidAcceptance.find();
        res.status(200).json(bidAcceptances);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a bid acceptance by ID
router.get("/:id", async (req, res) => {
    try {
        const bidAcceptance = await BidAcceptance.findById(req.params.id);
        if (!bidAcceptance) {
            return res.status(404).json({ message: "Bid acceptance not found" });
        }
        res.status(200).json(bidAcceptance);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a bid acceptance
router.put("/:id", async (req, res) => {
    try {
        const updatedBidAcceptance = await BidAcceptance.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBidAcceptance) {
            return res.status(404).json({ message: "Bid acceptance not found" });
        }
        res.status(200).json(updatedBidAcceptance);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a bid acceptance
router.delete("/:id", async (req, res) => {
    try {
        const deletedBidAcceptance = await BidAcceptance.findByIdAndDelete(req.params.id);
        if (!deletedBidAcceptance) {
            return res.status(404).json({ message: "Bid acceptance not found" });
        }
        res.status(200).json({ message: "Bid acceptance deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
