import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const DriverSchema = new mongoose.Schema({
  truck_owner_id: mongoose.Schema.Types.ObjectId,
  name: String,
  phone: String,
  email: String,
  password: { type: String, required: true },
  assigned_truck: mongoose.Schema.Types.ObjectId
});

// Hash password before saving
DriverSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

export default mongoose.model("Driver", DriverSchema);
