'use strict';
module.exports = function(app) {
  var todoList = require('../controllers/todoListController');

  // todoList Routes
  app.route('/api')
    .get(todoList.list_all_tasks)
    .post(todoList.create_a_task);


  app.route('/api/:taskId')
    .get(todoList.read_a_task)
    .put(todoList.update_a_task)
    .delete(todoList.delete_a_task);
};

var express = require('express');
var router = express.Router();
var feedbackData = require('../data/dataset.json');

router.get('/api', function(req, res) {
  res.json(feedbackData);
});

module.exports = router;