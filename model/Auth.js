import mongoose from 'mongoose';

const authSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // post: [],
    // application: []
});

export default mongoose.model('freelance', authSchema);