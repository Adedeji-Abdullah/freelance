import mongoose, { Schema } from 'mongoose'

const profileSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    category: String,
    group: String,
    bio: String,
    profilePicture: {
        type: String,
        default: null
    },
    profilePictureUrl: {
        type: String,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model("profile", profileSchema)