import mongoose from "mongoose";

const habitSchema = mongoose.Schema({
    title: {
        Type: String,
        required: true,
        unique: true,
    },
    createdBy: {
        Type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    isActive: {
        Type: Boolean,
        default: false,
    },
    streak: {
        Type: Number,
        default: 0,
    },
    habitLog: [
        {
            Type: Date,
        }
    ],
}, { timestamps: true });

export const Habit = mongoose.model('Habit', habitSchema);
