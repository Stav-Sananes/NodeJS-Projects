const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async');
const {
  CreateCustomError,
  createCustomError,
} = require('../errors/custom-error');
const getAllTasks = asyncWrapper(async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

const createTask = asyncWrapper(async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

const getTask = asyncWrapper(async (req, res, next) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });

    res.status(200).json({ task });
    if (!task) {
      return next(
        createCustomError({ msg: `No task with id: ${taskID}` }),
        404
      );
    }
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

const deleteTask = asyncWrapper(async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });
    if (!task) {
      return next(
        createCustomError({ msg: `No task with id: ${taskID}` }),
        404
      );
    }
    res.status(200).json({ task: null, status: 'success' });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});
const updateTask = asyncWrapper(async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req);
    res.status(200).json({});
    if (!task) {
      return next(
        createCustomError({ msg: `No task with id: ${taskID}` }),
        404
      );
    }
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

const editTask = asyncWrapper(async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
      overwrite: true,
    });
    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${taskID}` });
    }
    res.status(200).json({ task: null, status: 'success' });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});
module.exports = {
  getAllTasks,
  getTask,
  updateTask,
  deleteTask,
  createTask,
  editTask,
};
