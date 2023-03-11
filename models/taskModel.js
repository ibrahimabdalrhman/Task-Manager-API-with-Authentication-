const mongoose = require('mongoose');
const { stringify } = require('querystring');

const Schema = mongoose.Schema;
const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxlength: 50,
    },
    description: {
        type: String,
        maxlength: 200,
    },
    complete: {
        type: Boolean,
        default: false,
    },
    startTime: {
        type: Date,
        default: Date.now,
    },
    deadline: {
        type: Date,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
});

module.exports = mongoose.model('Task', taskSchema);