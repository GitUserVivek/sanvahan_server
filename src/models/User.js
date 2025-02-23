import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'customer', 'truckOwner', 'truckDriver'],
    required: true,
  },
  phone: {
    type: String,
  },
  // Customer specific fields
  organizationName: { type: String },
  // TruckOwner specific fields
  truckOwnerDetails: {
    licensePlate: {
      type: String,
    },
    capacity: {
      type: Number,
    },
  },
  // Driver specific fields
  driverDetails: {
    assignedTruck: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Truck',
    },
    license: { type: String }
  },
  // Other general fields for any type of user
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    console.log("encrypted the password ")
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model('User', UserSchema);



export default User;