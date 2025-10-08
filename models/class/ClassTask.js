import mongoose from 'mongoose';

const ClassTaskSchema = new mongoose.Schema({
  title: String,
  format: String,
  upload: String,
  dateTime: Date,
  detail: String,
}, {
  timestamps: true,
});

export default mongoose.models.ClassTask || mongoose.model('ClassTask', ClassTaskSchema);
