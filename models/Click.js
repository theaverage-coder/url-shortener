import mongoose from "mongoose";

const clickSchema = ({
    urlId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Url",
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
})

export default mongoose.model("Click", clickSchema);