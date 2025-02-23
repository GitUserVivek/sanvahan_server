import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const TruckOwnerSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  phone: String,
  password: { type: String, required: true }
});

// Hash password before saving
TruckOwnerSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

export default mongoose.model("TruckOwner", TruckOwnerSchema);
