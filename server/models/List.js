import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const listSchema = new mongoose.Schema({
  title: { type: String, required: true },
  todos: [todoSchema],
}, { timestamps: true });

export const List = mongoose.model('List', listSchema);
