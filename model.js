const mongoose = require('mongoose');

const resourcePostSchema = mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String},
  created: {type: Date, default: Date.now},
  url: {type: String}
});


resourcePostSchema.methods.apiRepr = function() {
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