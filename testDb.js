import mongoose from "mongoose";

const uri = "mongodb+srv://nirmallamrin77:ZR5ba1zOtSQmHr0b@cluster0.h3omdma.mongodb.net/?retryWrites=true&w=majority";

async function run() {
  try {
    await mongoose.connect(uri);
    console.log("Connected successfully!");
  } catch (err) {
    console.error("Connection error:", err);
  } finally {
    await mongoose.disconnect();
  }
}

run();
