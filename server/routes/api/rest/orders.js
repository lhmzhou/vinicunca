const express = require('express');
const { Orders } = require('../models');

const router = express.Router();

const reserveItemMiddleware = ({body: {qty, itemId}, method}, res, next) => {
  global.inventory.decreaseItemQtty(itemId, qty)
    .then((data) => {
      next();
    })
    .catch(err => {
      res.status(500).send(err)
    })
};

const updateItemQtty = async ({params: { id }, body: { qty: newQty } , method},res, next) => {
  if(newQty === undefined) {return next()}

  try {
    let promise;
    const result = await Orders.findById(id);

    if(!result) {
      return res.status(404).send("nod found:")
    }

    if(result.qty === newQty) { return next(); }

    const { itemId, qty } = result;
    if(qty < newQty) { promise = global.inventory.decreaseItemQtty(itemId, qty - newQty); }
    else {
      promise = global.inventory.increaseItemQtty(itemId, newQty - qty);
    }

    await promise;
    next()
  } catch(e) {
    console.error(e);
    res.status(500).send(e)
  }
}

router.get('/:id', ((req, res) => {
  Orders.findById(req.params.id)
    .exec()
    .then(res.json.bind(res))
    .catch(err => rest.status(500).send(err));

}));

router.get('/', ((req, res) => {
  Orders.find(req.query)
    .exec()
    .then(result => res.json(result))
    .catch(err => res.status(500).send(err));

}));

router.post('/', reserveItemMiddleware, ((req, res) => {
  (new Orders({...req.body, expiresOn: (Date.now() + 20*60 * 1000)}))
    .save()
    .then(result => res.json(result))
    .catch(err => res.status(500).send(err));
}));

router.put('/:id', updateItemQtty, (({params: {id}, body}, res) => {
  Orders.findOneAndUpdate({_id: id}, body, { new: true })
    .then(result => {
      console.log(result);
      return res.json(result);
    })
    .catch(err => {
      console.log(err)
      res.status(500).send(err);
    });
}));

router.delete('/:id', (({params: { id: _id }}, res) => {
  Orders.findById(_id)
    .then(({ qty, itemId }) => global.inventory.increaseItemQtty(itemId, qty))
    .then(() => Orders.deleteOne({ _id }))
    .then(() => res.send('{}'))
    .catch(err => res.status(500).send(err));
}));






module.exports = {
  router,
  Orders,
};