const mongoose = require('mongoose');

const commentSchemas = new mongoose.Schema({
    nickname: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    articleId: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Comment',commentSchemas);