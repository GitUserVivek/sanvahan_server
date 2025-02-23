import express from "express";
import Customer from "../models/User.js";
const router = express.Router();

// Create a new customer
router.post("/", async (req, res) => {
    const { name, email, phone, password } = req.body;

    try {
        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email, and password are required." });
        }

        const existingCustomer = await Customer.findOne({ email });
        if (existingCustomer) {
            return res.status(400).json({ message: "Email already in use." });
        }

        const customer = new Customer({ name, email, phone, password });
        await customer.save();

        res.status(201).json({ message: "Customer created successfully!", customer });
    } catch (error) {
        res.status(500).json({ message: "Error creating customer", error });
    }
});

// Get all customers
router.get("/", async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json(customers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a customer by ID
router.get("/:id", async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        res.status(200).json(customer);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a customer
router.put("/:id", async (req, res) => {
    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCustomer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        res.status(200).json(updatedCustomer);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a customer
router.delete("/:id", async (req, res) => {
    try {
        const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
        if (!deletedCustomer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        res.status(200).json({ message: "Customer deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
