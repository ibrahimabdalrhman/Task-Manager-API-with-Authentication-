const { log } = require('console');
const Task = require('../models/taskModel');


exports.postTask = async (req, res, next) => {
    const title = req.body.title;
    const description=req.body.description;
    const userId = req.userId;
    const deadline = req.body.deadline;
    endTime=require
    const newTask = await Task.create({
        title, description,deadline, userId
    });
    res.status(200).json({ newTask });

}

exports.getTasks = async (req, res, next) => {
    const tasks = await Task.find({userId: req.userId});
    res.status(200).json({
        length: tasks.length,
        tasks
    });
};

exports.getTaskById = async (req, res, next) => {
    const id = req.params.id;
    const tasks = await Task.findById(id);
    res.status(200).json({
        tasks
    });
};

exports.updateTask = async (req, res, next) => {
    const id = req.params.id;
    const task = await Task.findByIdAndUpdate(id, { tasks : req.body });
    res.status(200).json({ task });
};

exports.deleteTask = async (req, res, next) => {
    const id = req.params.id;   
    const task = await Task.findByIdAndRemove(id);
    res.status(200).json({ task });
    
};

exports.completeTask = async (req, res, next) => {
    const id = req.params.id;
    const task = await Task.findById(id);
    if (task.complete) {
        task.complete = false;
    } else {
        task.complete = true;
    }
    await task.save();
    res.status(200).json({ task });
};

exports.missingTasks =async (req, res, next) => {
    const date = Date.now();
    console.log(date);
    const tasks = await Task.find({userId:req.userId,deadline:{$lt : date}})
    res.status(200).json({ 
        length: tasks.length,
        tasks
     });
};

