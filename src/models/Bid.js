import mongoose from "mongoose";
const BidSchema = new mongoose.Schema({
  truck_owner_id: mongoose.Schema.Types.ObjectId,
  shipment_id: mongoose.Schema.Types.ObjectId,
  bid_amount: Number,
  status: { type: String, default: "Pending" }
});
export default mongoose.model("Bid", BidSchema);
