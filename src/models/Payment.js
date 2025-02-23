import mongoose from "mongoose";
const PaymentSchema = new mongoose.Schema({
  customer_id: mongoose.Schema.Types.ObjectId,
  amount: Number,
  status: { type: String, default: "Pending" }
});
export default mongoose.model("Payment", PaymentSchema);
