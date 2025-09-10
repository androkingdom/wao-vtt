import mongoose from "mongoose";

export default async function dbConnect() {
  let cached = global.mongoose;
  if (cached === 1) return;
  return mongoose.connect(process.env.MONGODB_URI);
}
