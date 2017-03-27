var express = require('express');
var router = express.Router();
var mongojs = require("mongojs");
var db = mongojs('mongodb://root:password@ds143330.mlab.com:43330/meanapp', ['tasks']);

// Get all tasks from MongoDB
router.get('/tasks', function(req, res, next){
    db.tasks.find(function(err, tasks) {
        if (err) {
            res.send(err);
        } else {
            res.json(tasks);
        }
    });
});

// Get single task
router.get('/task/:id', function(req, res, next){
    db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, task) {
        if (err) {
            res.send(err);
        } else {
            res.json(task);
        }
    });
});

// Save a task to document tasks
router.post("/task", function(req, res, next) {
    var trask = req.body;
    if (!task.title || (task.isDone + '')) {
        res.status(400);
        res.json({
            "error": "Bad data"
        });
    } else {
        db.tasks.save(task, function(err, task) {
            if (err) {
                res.send(err);
            } else {
                res.json(task);
            }
        });
    }
});

// Delete tasks
router.delete('/task/:id', function(req, res, next){
    db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, task) {
        if (err) {
            res.send(err);
        } else {
            res.json(task);
        }
    });
});

// Update tasks
router.put('/task/:id', function(req, res, next){

    var task = req.body;
    var updateTask = {};

    if (task.isDone) {
        updateTask.isDone = task.isDone;
    }

    if (task.title) {
        updateTask.title = task.title;
    }

    if (!updateTask) {
        res.status(400);
        res.json({
            "error": "Bad data"
        });
    } else {
        db.tasks.update({_id: mongojs.ObjectId(req.params.id)}, updateTask, {}, function(err, task) {
            if (err) {
                res.send(err);
            } else {
                res.json(task);
            }
        });
    }
});


module.exports = router;
