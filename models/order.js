const mongoose = require("mongoose")

const Schema = mongoose.Schema
const OrderSchema = new Schema({
   
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      items: {},
      orderLocation:{}
})
module.exports = mongoose.model('Order', OrderSchema);
