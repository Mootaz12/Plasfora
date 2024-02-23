import { Schema, model, Types } from 'mongoose';

const userSchema = new Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  role: {
    type: [String],
    default: ['Patient'],
  },
});

export default model('User', userSchema);
