import express from "express";
import Review from "../models/Review.js";

const router = express.Router();

// Create a new review
router.post("/", async (req, res) => {
    try {
        const { customer_id, truck_owner_id, rating, comment } = req.body;
        const newReview = new Review({ customer_id, truck_owner_id, rating, comment });
        await newReview.save();
        res.status(201).json(newReview);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all reviews
router.get("/", async (req, res) => {
    try {
        const reviews = await Review.find();
        res.status(200).json(reviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a review by ID
router.get("/:id", async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.status(200).json(review);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a review
router.put("/:id", async (req, res) => {
    try {
        const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedReview) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.status(200).json(updatedReview);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a review
router.delete("/:id", async (req, res) => {
    try {
        const deletedReview = await Review.findByIdAndDelete(req.params.id);
        if (!deletedReview) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.status(200).json({ message: "Review deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
