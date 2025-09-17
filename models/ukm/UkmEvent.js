import mongoose from 'mongoose';

const subUkmEventSchema = new mongoose.Schema({
  title: String,
  time: Date,
},{ _id: true }); 

const UkmEventSchema = new mongoose.Schema({
  title: String,
  subEvents: [subUkmEventSchema], // array of sub-events
}, { _id: true, timestamps: true });

export default mongoose.models.UkmEvent || mongoose.model('UkmEvent', UkmEventSchema);