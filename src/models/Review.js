import mongoose from "mongoose";
const ReviewSchema = new mongoose.Schema({
  customer_id: mongoose.Schema.Types.ObjectId,
  truck_owner_id: mongoose.Schema.Types.ObjectId,
  rating: Number,
  comment: String
});
export default mongoose.model("Review", ReviewSchema);
