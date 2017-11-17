const mongo = require('mongodb');
const mongoose = require('mongoose');

// mongoose.Promise = global.Promise;

var resourcePostSchema = new mongoose.Schema({
  title: {
    type: String, 
    required: true
  },
  content: {
    type: String, 
    required: true
  },
  created: {
    type: Date, 
    default: Date.now
  },
  link: {
    type: String
  },
  author: {
    type: String
  },
  image: {
    type: String
  }
});

resourcePostSchema.methods.apiGet = function() {
  return {
    id: this._id,
    title: this.title,  
    content: this.content,
    created: this.created,
    link: this.link,
    image: this.image
  };
}

var Resource = mongoose.model('Resource', resourcePostSchema);
module.exports = Resource
