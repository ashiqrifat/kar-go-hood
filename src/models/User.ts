// models/User.ts
import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  email:    string;
  password: string;
}

const UserSchema = new Schema<IUser>({
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default model<IUser>('User', UserSchema);