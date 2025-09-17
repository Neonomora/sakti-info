import mongoose from 'mongoose';

const InfoTemplateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
}, {timestamps: true});

export default mongoose.models.InfoTemplate || mongoose.model('InfoTemplate', InfoTemplateSchema);
