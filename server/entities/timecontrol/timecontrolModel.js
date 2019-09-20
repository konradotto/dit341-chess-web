var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var timeControlSchema = new Schema({
    time: { type: Number, required: true }, // Time in Minutes
    increment_: { type: Number, required: true }, // Time in Seconds
    identifier: { type: String, required: true} // Essentially the id for the time control
});

module.exports = mongoose.model('timecontrols', timeControlSchema);
