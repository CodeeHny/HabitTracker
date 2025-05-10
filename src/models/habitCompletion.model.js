import mongoose from "mongoose";

const habitCompletionSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require:true,
    },
    habitId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Habit",
        require:true,
    },
    date:{
        type:Date,
        require:true,
    }
});

export const HabitCompletion = mongoose.model('HabitCompletion', habitCompletionSchema); 