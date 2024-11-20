const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  level: { type: String, required: true }, 
  institute: String,
  year: Number,
  grade: String,
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  profilePic: { type: String, default: 'default-avatar.png' }, 
  currentLocation: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  education: [educationSchema],
 
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
