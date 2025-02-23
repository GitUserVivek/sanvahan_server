import mongoose from "mongoose";
const ShipmentRequestSchema = new mongoose.Schema({
  customer_id: mongoose.Schema.Types.ObjectId,
  from_location: String,
  to_location: String,
  weight: Number,
  status: { type: String, default: "Pending" }
});
export default mongoose.model("ShipmentRequest", ShipmentRequestSchema);
