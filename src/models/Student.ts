import mongoose, { Document, Model, Schema } from 'mongoose';

// ✅ Interface for Student document
export interface IStudent extends Document {
  name: string;
  marks: number;
  class: string;
}

// ✅ Define schema
const studentSchema = new Schema<IStudent>(
  {
    name: { type: String, required: true, minlength: 2 },
    marks: { type: Number, required: true, min: 0, max: 100 },
    class: { type: String, required: true },
  },
  { timestamps: true },
);

// ✅ Create and export model
const Student: Model<IStudent> = mongoose.model<IStudent>('Student', studentSchema);
export default Student;
