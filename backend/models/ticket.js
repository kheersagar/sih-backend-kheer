var mongoose = require ('mongoose');


var ticketSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true,
        maxlength: 32,
        trim: true
    },
    age:{
        type: String,
        maxlength: 32,
        trim: true

    },
    adhar:{
        type: String,
        trim: true,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model("ticket", ticketSchema);