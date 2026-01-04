import mongoose from 'mongoose';
import { connectToDB } from '@/libs/mongoose';

// Function to define the model after connection
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    default: null,
  },
  phone: {
    type: String,
    default: "",
  },
  location: {
    type: String,
    default: "",
  },
  bio: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    enum: ['user', 'organizer', 'blogger', 'admin'],
    default: 'user',
  },
  resetPasswordToken: {
    type: String,
    select: false  // Don't include by default in queries
  },
  resetPasswordExpires: {
    type: Date,
    select: false  // Don't include by default in queries
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
}, {
  strict: false // Allow fields not specified in the schema
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;