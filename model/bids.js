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
    option: []
})

export default mongoose.model('bids', bidSchema)