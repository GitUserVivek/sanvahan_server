import mongoose from "mongoose";
const TruckSchema = new mongoose.Schema({
  truck_owner_id: mongoose.Schema.Types.ObjectId,
  license_plate: String,
  capacity: Number
});
export default mongoose.model("Truck", TruckSchema);
