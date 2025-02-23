#!/bin/bash

MODELS_DIR="./models"

# Create models directory if it doesn't exist
mkdir -p "$MODELS_DIR"

# Define model files and their content
declare -A MODELS

MODELS["Customer.js"]='import mongoose from "mongoose";
const CustomerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String
});
export default mongoose.model("Customer", CustomerSchema);'

MODELS["ShipmentRequest.js"]='import mongoose from "mongoose";
const ShipmentRequestSchema = new mongoose.Schema({
  customer_id: mongoose.Schema.Types.ObjectId,
  from_location: String,
  to_location: String,
  weight: Number,
  status: { type: String, default: "Pending" }
});
export default mongoose.model("ShipmentRequest", ShipmentRequestSchema);'

MODELS["TruckOwner.js"]='import mongoose from "mongoose";
const TruckOwnerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String
});
export default mongoose.model("TruckOwner", TruckOwnerSchema);'

MODELS["Bid.js"]='import mongoose from "mongoose";
const BidSchema = new mongoose.Schema({
  truck_owner_id: mongoose.Schema.Types.ObjectId,
  shipment_id: mongoose.Schema.Types.ObjectId,
  bid_amount: Number,
  status: { type: String, default: "Pending" }
});
export default mongoose.model("Bid", BidSchema);'

MODELS["Truck.js"]='import mongoose from "mongoose";
const TruckSchema = new mongoose.Schema({
  truck_owner_id: mongoose.Schema.Types.ObjectId,
  license_plate: String,
  capacity: Number
});
export default mongoose.model("Truck", TruckSchema);'

MODELS["Driver.js"]='import mongoose from "mongoose";
const DriverSchema = new mongoose.Schema({
  truck_owner_id: mongoose.Schema.Types.ObjectId,
  name: String,
  phone: String,
  assigned_truck: mongoose.Schema.Types.ObjectId
});
export default mongoose.model("Driver", DriverSchema);'

MODELS["BidAcceptance.js"]='import mongoose from "mongoose";
const BidAcceptanceSchema = new mongoose.Schema({
  bid_id: mongoose.Schema.Types.ObjectId,
  truck_id: mongoose.Schema.Types.ObjectId,
  driver_id: mongoose.Schema.Types.ObjectId,
  accepted_at: { type: Date, default: Date.now }
});
export default mongoose.model("BidAcceptance", BidAcceptanceSchema);'

MODELS["ShipmentTracking.js"]='import mongoose from "mongoose";
const ShipmentTrackingSchema = new mongoose.Schema({
  shipment_id: mongoose.Schema.Types.ObjectId,
  location: String,
  timestamp: { type: Date, default: Date.now }
});
export default mongoose.model("ShipmentTracking", ShipmentTrackingSchema);'

MODELS["Payment.js"]='import mongoose from "mongoose";
const PaymentSchema = new mongoose.Schema({
  customer_id: mongoose.Schema.Types.ObjectId,
  amount: Number,
  status: { type: String, default: "Pending" }
});
export default mongoose.model("Payment", PaymentSchema);'

MODELS["Review.js"]='import mongoose from "mongoose";
const ReviewSchema = new mongoose.Schema({
  customer_id: mongoose.Schema.Types.ObjectId,
  truck_owner_id: mongoose.Schema.Types.ObjectId,
  rating: Number,
  comment: String
});
export default mongoose.model("Review", ReviewSchema);'

# Create model files
for FILE in "${!MODELS[@]}"; do
    echo "📝 Creating $MODELS_DIR/$FILE"
    echo "${MODELS[$FILE]}" > "$MODELS_DIR/$FILE"
done

echo "✅ All models created successfully!"
