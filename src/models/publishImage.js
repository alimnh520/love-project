const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: false },
    userImage: { type: String, required: false },
    img_url: { type: String, required: false },
    text: { type: String, required: false },
}, {timestamps: true});

export default mongoose.models.publishImage || mongoose.model('publishImage', UserSchema);