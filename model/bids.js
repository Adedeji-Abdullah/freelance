import mongoose from 'mongoose'

const bidSchema = new mongoose.Schema({
    name: String,
    job: String,
    money: Number,
    describtion: String,
    date: String,
    option: []
})

export default mongoose.model('bids', bidSchema)