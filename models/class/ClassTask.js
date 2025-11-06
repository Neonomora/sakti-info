import mongoose from "mongoose";

const ClassTaskSchema = new mongoose.Schema(
  {
    title: String,
    format: String,
    upload: String,
    dateTime: Date,
    detail: String,
    classFilter: {
      type: String,
      enum: ["TRKJ", "BD", "MKSP"],
    },
    subClassFilter: {
      type: String,
      enum: ["A1", "B1", "C1"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.ClassTask ||
  mongoose.model("ClassTask", ClassTaskSchema);
