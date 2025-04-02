const { default: mongoose, model } = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: false },
    image: { type: String, required: false },
    images: [String],
    isVerified: { type: Boolean, default: false },
}, {timestamps: true});

export default mongoose.models.UserProfile || mongoose.model('UserProfile', UserSchema);