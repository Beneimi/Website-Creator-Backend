const mongoose = require('mongoose');

const PageSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required : true
    },
    title: {
        type: String,
        required: true,
    },
    content:{
        type: String,
        required: true,
        default: ""
    }
})

module.exports = mongoose.model('Page', PageSchema);