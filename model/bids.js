import mongoose from 'mongoose'

const bidSchema = new mongoose.Schema({
    name: String,
    job: {
        type: String,
        required: true
    },
    money: Number,
    describtion: String,
    date: String,
    secrete: {
        type: String,
        required: true
    },
    option: [],
    profile: {
        firstname: String,
        lastname: String,
        email: String,
        category: String,
        group: String,
        bio: String,
        profilePicture: String,
        profilePictureUrl: String
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

export default mongoose.model('bids', bidSchema)