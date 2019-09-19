var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var timeControlSchema = new Schema({
    time: { type: Number, required: true },
    increment_: { type: Number, required: true }
});

module.exports = mongoose.model('timecontrols', timeControlSchema);
