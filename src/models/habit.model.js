import mongoose from "mongoose";

const habitSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: ' ',
    },
    targetDays: {
        type: Number,
        default: 21,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    streak: {
        type: Number,
        default: 0,
    },
    habitLog: [
        {
            type: Date,
        }
    ],
    longestStreak: { type: Number, default: 0 },
    lastCompleted: { type: Date }
}, { timestamps: true });

export const Habit = mongoose.model('Habit', habitSchema);
