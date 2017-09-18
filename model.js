'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TaskSchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the name of the task'
  },
  //Date Added
  Created_date: {
    type: Date,
    default: Date.now
  },
  // Category for the resource
  category: {
    type: String,
    required: 'Kindly enter the name of the task'
  },
  // Link to the resources 
  link: {
    type: String
  }
});

module.exports = mongoose.model('Tasks', TaskSchema);