import mongoose from 'mongoose';

const albumSchema = new mongoose.Schema(
  {
    imageUrl: String,
    publicId: String,
    eventCategory: {
      type: String,
      enum: ['Independent Day', 'HBI', 'other'],
    },
  },
  {
    timestamps: true,
  }
);

const Album = mongoose.models.Album || mongoose.model('Album', albumSchema);

export default Album;
