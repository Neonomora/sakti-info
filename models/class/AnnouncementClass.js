import mongoose from "mongoose";

const AnnouncementClassSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: String,
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

export default mongoose.models.AnnouncementClass ||
  mongoose.model("AnnouncementClass", AnnouncementClassSchema);
