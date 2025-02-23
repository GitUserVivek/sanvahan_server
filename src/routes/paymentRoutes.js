import express from "express";
import Payment from "../models/Payment.js";

const router = express.Router();

// Create a new payment
router.post("/", async (req, res) => {
    try {
        const { customer_id, amount } = req.body;
        const newPayment = new Payment({ customer_id, amount });
        await newPayment.save();
        res.status(201).json(newPayment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all payments
router.get("/", async (req, res) => {
    try {
        const payments = await Payment.find();
        res.status(200).json(payments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a payment by ID
router.get("/:id", async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);
        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }
        res.status(200).json(payment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a payment
router.put("/:id", async (req, res) => {
    try {
        const updatedPayment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPayment) {
            return res.status(404).json({ message: "Payment not found" });
        }
        res.status(200).json(updatedPayment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a payment
router.delete("/:id", async (req, res) => {
    try {
        const deletedPayment = await Payment.findByIdAndDelete(req.params.id);
        if (!deletedPayment) {
            return res.status(404).json({ message: "Payment not found" });
        }
        res.status(200).json({ message: "Payment deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
