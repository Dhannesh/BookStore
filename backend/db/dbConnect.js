import mongoose from "mongoose";

export const dbConnect = (DB_URL) => {
  return mongoose.connect(DB_URL);
};
