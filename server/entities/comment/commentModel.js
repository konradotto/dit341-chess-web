var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    comment: { type: String, required: true },
    userId: { type: String, required: true },
    gameId: { type: String, required: true}
});

module.exports = mongoose.model('comments', commentSchema);
