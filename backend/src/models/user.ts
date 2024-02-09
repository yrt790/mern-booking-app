import mongoose from 'mongoose';
import bscrypt from 'bcryptjs';

export type UserType = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
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
    required: true,
  },
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bscrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model<UserType>('user', userSchema);

export default User;
