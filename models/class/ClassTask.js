import mongoose from 'mongoose';

const ClassTaskSchema = new mongoose.Schema({
  title: String,
  formatFile: String,
  upload: String,
  deadlineDate: Date,
  deadlineTime: String,
  detail: String,
}, {
  timestamps: true,
});

export default mongoose.models.ClassTask || mongoose.model('ClassTask', ClassTaskSchema);
