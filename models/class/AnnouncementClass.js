import mongoose from 'mongoose';

const AnnouncementClassSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: String,
}, {
  timestamps: true,
});

export default mongoose.models.AnnouncementClass || mongoose.model('AnnouncementClass', AnnouncementClassSchema);
