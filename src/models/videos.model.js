import mongoose, { Schema } from "mongoose";
import mongooseaggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoSchema = new Schema({
    videofile: {
        type: String,// cloudinary url
        required: true,
    },
    thumbnai: {
        type: String,// cloudinary url
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    views: {
        type: Number,
        default: 0,
    },
    isPublished: {
        type: Boolean,
        default: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
}, {
    timestamps: true,
});

export const Video = mongoose.model("Video", videoSchema);