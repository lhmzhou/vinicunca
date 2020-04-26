const fetch = require('node-fetch');
const ordersUrl = 'http://localhost:3000/api/rest/orders/'

const getRestMethod = (data, id) => (data && ((id && 'put') || 'post')) || 'delete';

const manipulateOrder =  (data, id) => {
  return fetch(
    (ordersUrl + (id || '')),
    {
      method: getRestMethod(data, id),
      body: JSON.stringify(data),
      headers: {'Content-Type': 'application/json'},
    }
  ).then(res => res.json());
}


const createOrder = (_, data) => manipulateOrder(data, undefined);

const updateOrder = (_, {_id, ...data}) => manipulateOrder(data, _id);

const deleteOrder = (_, {_id}) => {
  return manipulateOrder(undefined, _id);
};


const createItem = (_, data, {dataSources: {Item}}) => Item.create(data);

const updateItem = async (_, { itemToUpdate: { _id, ...data } }, { dataSources: { Items } }) => {
    console.log({_id, ...data});
    const result = await Items.findByIdAndUpdate(_id, data, {new: true})
    console.log(result);
    return result;
};


const deleteItem = (_, {_id}, {dataSources: {Item}}) => Item.findByIdAndDelete(_id).exec();
//
// const order = (_,{id}) => {
//   return fetch(ordersUrl+id).then(res => res.json())
// }
//
// const items = (parent,args, {dataSources: {Items}}) => {
//   return Items.find().exec();
// }
//
// const item = ({itemId} = {},{ id }, {dataSources: { Items }}) => {
//   return Items.findById(itemId || id).exec();
//}

module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  updateItem,
};