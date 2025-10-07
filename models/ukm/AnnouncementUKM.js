import mongoose from 'mongoose';

const AnnouncementUKMSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: String,
}, {
  timestamps: true,
});

export default mongoose.models.AnnouncementUKM || mongoose.model('AnnouncementUKM', AnnouncementUKMSchema);
