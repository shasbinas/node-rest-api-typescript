import mongoose, { Schema } from 'mongoose';
import argon2 from 'argon2';
const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    age: { type: Number },
}, { timestamps: true });
userSchema.pre('save', async function (next) {
    if (!this.isModified('password'))
        return next();
    this.password = await argon2.hash(this.password);
    next();
});
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await argon2.verify(this.password, enteredPassword);
};
const User = mongoose.model('User', userSchema);
export default User;
//# sourceMappingURL=User.js.map