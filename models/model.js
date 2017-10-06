const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const resourcePostSchema = new mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  created: {type: Date, default: Date.now},
  url: {type: String},
  author: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
});


resourcePostSchema.methods.apiGet = function() {
  return {
    id: this._id,
    title: this.title,  
    content: this.content,
    created: this.created,
    url: this.url
  };
}

const Resources = mongoose.model('Resources', resourcePostSchema);

module.exports = {Resources};