const types = require('./types');

/*
*
* */
const queries = `
${types}
type Query {
 users: [User]!
 orders: [Order]!
 items: [Item]!
 user(id: Int!): User,
 findUser(id: Int, name: String): User,
 order(id: String!): Order
 item(id: String!): Item
 dateTime: String
 timeStamp: String
}

type Mutation {
  createOrder(itemId: String!, userId: Int!, tags: [String], qty: Int!): Order
  updateOrder(_id: String!, qty: Int, tags: [String] ): Order
  updateItem(itemToUpdate: ItemInput): Item
  deleteOrder(_id: String!): Order
}
`;

 module.exports = queries;