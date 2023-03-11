const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController');
const { auth}  = require("../middleware/authMiddleware");

router
    .route("/")
    .post(auth, tasksController.postTask)
    .get(auth, tasksController.getTasks);
  
router.get("/missing", auth, tasksController.missingTasks);

router
    .route("/:id")
    .get(auth, tasksController.getTaskById)
    .patch(auth, tasksController.updateTask)
    .delete(auth, tasksController.deleteTask);
  
router.post("/complete/:id", auth, tasksController.completeTask);



module.exports = router;