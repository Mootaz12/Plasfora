import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  role: { type: [String], default: ['client'] },
});

export default model('User', userSchema);
