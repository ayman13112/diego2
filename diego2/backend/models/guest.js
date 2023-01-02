const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const guestSchema = new Schema({}, { timestamps: true });

const guest = mongoose.model("guest", guestSchema);
module.exports = guest;
