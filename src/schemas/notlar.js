

const { Schema, model } = require("mongoose");

let notData = Schema({
    user: { type: String }, 
    notlar: {type: Array }
})

module.exports = model("notlar", notData);