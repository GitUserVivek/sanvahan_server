import mongoose from "mongoose";
const ShipmentTrackingSchema = new mongoose.Schema({
  shipment_id: mongoose.Schema.Types.ObjectId,
  location: String,
  timestamp: { type: Date, default: Date.now }
});
export default mongoose.model("ShipmentTracking", ShipmentTrackingSchema);
