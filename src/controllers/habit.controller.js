import mongoose from "mongoose";
import { Habit } from "../models/habit.model.js";
import { User } from "../models/user.model.js";
import { HabitCompletion } from "../models/habitCompletion.model.js";
import moment from "moment";

const createHabit = async (req, res) => {
    try {
        let { title, description, targetDays } = req.body;

        if (!title) return res.status(400).json({ message: "Title field is required" });

        title = title.trim();
        if (description) description = description.trim();

        if (targetDays && (isNaN(targetDays) || targetDays <= 0)) {
            return res.status(400).json({ message: "Target days must be a positive number" });
        };

        let existedHabit = await Habit.findOne({ title });

        if (existedHabit) return res.status(500).json({ message: "Title already in used" });

        let habit = await Habit.create({
            title,
            description,
            targetDays,
            createdBy: req.user._id
        });

        if (!habit) return res.status(500).json({ message: "Something went wrong while creating habit" });

        let user = await User.findById(req.user._id);

        user.habits.push(habit._id);
        user.markModified('habits');
        await user.save({ validateBeforeSave: false });

        res
            .status(200)
            .json({
                message: "Habit created successfully",
                habit,
            })


    } catch (error) {
        console.log("Error while creating habit || ", error.message);
        res.status(500).json({ error: "Something went wrong while creating the habit" })
    }
};

const deleteHabit = async (req, res) => {
    try {
        let habitId = req.params.habitId;
        if (!mongoose.Types.ObjectId.isValid(habitId)) return res.status(401).json({ message: "Habit id not found" });

        let habit = await Habit.findByIdAndDelete(habitId);

        if (!habit) return res.status(401).json({ message: "Habit not found" });

        res
            .status(200)
            .json({ message: "Habit deleted successfully" });

    } catch (error) {
        console.log("Error : ", error.message);
        res.status(500).json({ error: "Something went wrong while deleting habit" })
    }
}

const updateHabit = async (req, res) => {
    try {
        let habitId = req.params.habitId;
        let { title, description, targetDays, isActive } = req.body;

        if (!mongoose.Types.ObjectId.isValid(habitId)) return res.status(400).json({ message: "Habit id is wrong" });
        if (!title || title.trim() === '') return res.status(401).json({ message: "title is required" });

        let existedHabit = await Habit.findOne({ title, _id: { $ne: habitId } });

        if (existedHabit) return res.status(400).json({ message: "Title already in used" });

        let habit = await Habit.findByIdAndUpdate(habitId, {
            title,
            description,
            targetDays,
            isActive,
        }, {
            new: true
        });
        if (!habit) return res.status(401).json({ message: "Habit not found" });

        res
            .status(200)
            .json({
                message: "Habit updated successfullt",
                habit,
            })

    } catch (error) {
        console.log("Error : ", error.message);
        res.status(500).json({ error: "Something went wrong while updating habit" });
    }
}

const completeHabit = async (req, res) => {
  try {
    const habitId = req.params.habitId;
    const userId = req.user._id;
    const today = moment().startOf('day').toDate();

    const alreadyDone = await HabitCompletion.findOne({ habitId, userId, date: today });
    if (alreadyDone) {
      return res.status(400).json({ message: "Habit already marked as done today" });
    }

    await HabitCompletion.create({ habitId, userId, date: today });

    const habit = await Habit.findById(habitId);
    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    const yesterday = moment(today).subtract(1, 'day').toDate();
    const last = habit.lastCompleted ? moment(habit.lastCompleted).startOf('day').toDate() : null;

    if (last && moment(last).isSame(yesterday)) {
      habit.currentStreak += 1;
    } else {
      habit.currentStreak = 1;
    }

    habit.longestStreak = Math.max(habit.longestStreak, habit.currentStreak);

    habit.lastCompleted = today;

    await habit.save();

    res.status(200).json({ message: "Habit marked as done", habit });

  } catch (error) {
    console.log('Error while marking habit:', error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export {
    createHabit,
    deleteHabit,
    updateHabit,
    completeHabit,
}