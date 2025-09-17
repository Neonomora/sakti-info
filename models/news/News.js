import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
  title: String,
  content: String,
}, { timestamps: true });

export default mongoose.models.News || mongoose.model('News', newsSchema);
