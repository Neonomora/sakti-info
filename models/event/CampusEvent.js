import mongoose from 'mongoose';

const subCampusEventSchema = new mongoose.Schema({
  title: String,
  time: Date,
},{ _id: true }); 

const campusEventSchema = new mongoose.Schema({
  title: String,
  subEvents: [subCampusEventSchema], // array of sub-events
}, { _id:true, timestamps: true });

export default mongoose.models.CampusEvent || mongoose.model('CampusEvent', campusEventSchema);