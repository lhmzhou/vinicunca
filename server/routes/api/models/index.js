const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  item: String,
  qty: Number,
  status: String,
  size: {
    h: Number,
    w: Number,
    uom: String,
  },
  tags: [String]
});

const orderSchema = new mongoose.Schema({
  itemId: String,
  qty: Number,
  userId: String,
  expiresOn: Date,
  tags: [String]
});

const Items = mongoose.model('Inventory', itemSchema, 'inventory');
const Orders = mongoose.model('Order', orderSchema);

module.exports = {
  Items,
  Orders
}