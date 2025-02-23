import mongoose from "mongoose";

// MongoDB Connection
const connect = () => {
    mongoose.connect(process.env.DBURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => console.log("✅ Connected to MongoDB"))
        .catch(err => console.error("❌ MongoDB connection error:", err));

}


export default connect