import mongoose from "mongoose";
const BidAcceptanceSchema = new mongoose.Schema({
  bid_id: mongoose.Schema.Types.ObjectId,
  truck_id: mongoose.Schema.Types.ObjectId,
  driver_id: mongoose.Schema.Types.ObjectId,
  accepted_at: { type: Date, default: Date.now }
});
export default mongoose.model("BidAcceptance", BidAcceptanceSchema);
