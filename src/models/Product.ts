import mongoose, { Document, Model, Schema } from 'mongoose';

// ✅ Interface for Product document
export interface IProduct extends Document {
  title: string;
  author: string;
  price: number;
  category?: string;
  publisher?: string;
  isbn?: string;
  stock?: number;
  // createdBy?: mongoose.Types.ObjectId;
}

// ✅ Define schema
const productSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true, minlength: 2 },
    author: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String },
    publisher: { type: String },
    isbn: { type: String, unique: true },
    stock: { type: Number, default: 0, min: 0 },
    // createdBy: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
  },
  { timestamps: true },
);

// ✅ Create and export model
const Product: Model<IProduct> = mongoose.model<IProduct>('Product', productSchema);
export default Product;
