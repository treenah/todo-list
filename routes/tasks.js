var express = require("express");
var router = express.Router();
var mongojs = require("mongojs")
var db = mongojs(
    "tasklist",
    [tasks]
);

router.get("/tasks", (req, res, next) => {
    db.tasks.find({}, {id: 1, title: 1}, (err, tasks) => {
        if(err){
            res.send(err);
        };

var data = [];
Object.keys(tasks).forEach((key) => {
    var val = tasks[key];
    data.push([val.title, val._id]);
    });
    res.send(data);
    });
});

router.post("/task", (req, res, next) => {
    var task = req.body;
    if(!task.title){
        res.status(400);
        res.json({
            error: "Bad Data"
        });
    }else{
        db.tasks.save(task, (err, task) => {
            if(err) {
                res.send(err);
            }
            res.json(task);
        });
    }
});
    
router.delete("/task/:id", (req, res, next) => {
    db.task.remove({_id: mongojs.ObjectId(req.params.id)}, (err, task) => {
        if(err){
            res.send(err);
            }
            res.json(task);
        });
    });

router.put("/task/:id", (req, res, next) => {
    var task = req.body;
    var upTask = {};

    if(task.title){
        updTask.title = task.title;
    }

    if(!updTask){
        res.status(400);
        res.json({
            error: "Bad Data"
        });
    }else{
        db.tasks.update({_id: mongojs.ObjectId(req.params.id)}),
        updTask,
        {},
        (err, task) => {
            if(err){
            res.send(err);
            }
            res.json(task);
        }
    }
});

module.exports = router;