const uuid = require('uuid');

const mongoose = require('mongoose');

const resourceListSchema = mongoose.Schema({
  title: {type: String, require: true},
  content: {type: String, require: true},
  link: {type: String, require: true},
  categroy: {type: String}
});

resourceListSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    title: this.title,
    content: this.content,
    link: this.link,
    categroy: this.categroy
  };
}

const resourcePost = mongoose.model('resourcePost', resourceListSchema);

module.exports = {resourcePost};