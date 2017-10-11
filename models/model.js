const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const resourcePostSchema = new mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  created: {type: Date, default: Date.now},
  link: {type: String},
  author: {type: String}
});


resourcePostSchema.methods.apiGet = function() {
  return {
    id: this._id,
    title: this.title,  
    content: this.content,
    created: this.created,
    link: this.link
  };
}

const Resources = mongoose.model('Resources', resourcePostSchema);

module.exports = {Resources};