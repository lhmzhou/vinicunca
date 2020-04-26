const express = require('express');
const { Items } = require('../models');
const router = express.Router();

global.inventory = {
  decreaseItemQtty: (_id, qtty) => { return varyQtty({_id, qty: { $gte: qtty } }, Math.abs(qtty)*-1) },
  increaseItemQtty: (_id, qtty) => { return varyQtty({ _id }, Math.abs(qtty)) },
}

const varyQtty = (query, amount) => updateItem(query, { $inc: { qty: amount } });

const updateById = (_id, data) => updateItem({ _id }, data);

const updateItem = (query, data) => {
  return Items.findOneAndUpdate(
    query,
    data,
    { new: true }
  );
}

router.get('/:id', ((req, res) => {
  Items.findById(req.params.id)
    .exec()
    .then(res.json.bind(res))
    .catch(err => rest.status(500).send(err));

}));

router.get('/', ((req, res) => {

  Items.find(req.query)
    .exec()
    .then(res.json.bind(res))
    .catch(err => rest.status(500).send(err));

}));

router.post('/', ((req, res) => {
  (new Items(req.body))
    .save()
    .then(result => res.json(result))
    .catch(err => res.status(500).send(err));
}));

router.put('/:id', ((req, res) => {
  updateById(req.params.id, req.body)
    .then(result => res.json(result))
    .catch(err => res.status(500).send(err));
}));

router.delete('/:id', ((req, res) => {
  Items.deleteOne({_id: req.params.id})
    .then(() => res.send('ok'))
    .catch(err => res.status(500).send(err));
}));

module.exports = {
  router,
  Items,
};