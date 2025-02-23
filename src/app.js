import express from "express";
import { Server as Socket } from "socket.io";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import connect from "./utils/db.js"


// Import Routes
import customerRoutes from "./routes/customerRoutes.js";
import shipmentRequestRoutes from "./routes/shipmentRequestRoutes.js";
import truckOwnerRoutes from "./routes/truckOwnerRoutes.js";
import bidRoutes from "./routes/bidRoutes.js";
import truckRoutes from "./routes/truckRoutes.js";
import driverRoutes from "./routes/driverRoutes.js";
import bidAcceptanceRoutes from "./routes/bidAcceptanceRoutes.js";
import shipmentTrackingRoutes from "./routes/shipmentTrackingRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import expressOasGenerator from 'express-oas-generator';

// Declarations

const app = express();
dotenv.config();
expressOasGenerator.init(app);

// 
// db connection 
connect()

app.use(cors());
app.use(express.json());



// Middleware for logging requests
app.use((req, res, next) => {
    console.log(`📡 API Request: ${req.method} ${req.path}`);
    next();
});
// Redirect /docs to /api-docs
app.use('/docs', (req, res) => {
    res.redirect('/api-docs');
});

// Base Route
app.get("/", (req, res) => {
    res.send("Sanvahan API is Running");
});


// API Routes                                                                
app.use("/api/user", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/shipment_requests", shipmentRequestRoutes);
app.use("/api/truck_owners", truckOwnerRoutes);
app.use("/api/bids", bidRoutes);
app.use("/api/trucks", truckRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/bid_acceptances", bidAcceptanceRoutes);
app.use("/api/shipment_trackings", shipmentTrackingRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/reviews", reviewRoutes);


// Create HTTP Server for Socket.io
let server = http.createServer(app);
let io = new Socket(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["*"],
        credentials: true,
    },
});

// Socket.io Connection
io.on("connection", (socket) => {
    console.log(`🟢 A user connected: ${socket.id}`);

    socket.on("send-location", (data) => {
        io.emit("get-location", { id: socket.id, ...data });
    });

    socket.on("disconnect", () => {
        io.emit("user-disconnected", socket.id);
        console.log(`🔴 User disconnected: ${socket.id}`);
    });
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
