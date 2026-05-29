import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },

})

export default mongoose.model("Url", urlSchema);