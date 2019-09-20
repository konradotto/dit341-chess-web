var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    comment: { type: String, required: true },
    userName: { type: String, required: true },
    gameId: { type: Number, required: true}
});

module.exports = mongoose.model('comments', commentSchema);
