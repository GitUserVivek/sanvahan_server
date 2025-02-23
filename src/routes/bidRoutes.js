import express from "express";
import Bid from "../models/Bid.js";

const router = express.Router();

// Create a new bid
router.post("/", async (req, res) => {
    try {
        const { truck_owner_id, shipment_id, bid_amount } = req.body;
        const newBid = new Bid({ truck_owner_id, shipment_id, bid_amount });
        await newBid.save();
        res.status(201).json(newBid);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all bids
router.get("/", async (req, res) => {
    try {
        const bids = await Bid.find();
        res.status(200).json(bids);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a bid by ID
router.get("/:id", async (req, res) => {
    try {
        const bid = await Bid.findById(req.params.id);
        if (!bid) {
            return res.status(404).json({ message: "Bid not found" });
        }
        res.status(200).json(bid);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a bid
router.put("/:id", async (req, res) => {
    try {
        const updatedBid = await Bid.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBid) {
            return res.status(404).json({ message: "Bid not found" });
        }
        res.status(200).json(updatedBid);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a bid
router.delete("/:id", async (req, res) => {
    try {
        const deletedBid = await Bid.findByIdAndDelete(req.params.id);
        if (!deletedBid) {
            return res.status(404).json({ message: "Bid not found" });
        }
        res.status(200).json({ message: "Bid deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
