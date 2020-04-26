const Order = `
type Order {
  _id: String!
  itemId: String!
  item: Item
  user: User
  qty: Int!
  userId: Int!,
  expiresOn: String!
  tags: [String]
}`;

const Item = `
type Size {
    h: Float,
    w: Float,
    uom: String
}

type Item {
  _id: String!
  item: String
  qty: Int
  status: String
  size: Size
  tags: [String]
}

input ItemInput {
 _id: String!
  item: String
  qty: Int
  tags: [String]
}
`;

const UserAddress = `
type UserAddress {
  street: String
  suite: String
  city: String
  zipcode: String
}
`;

const User = `
${UserAddress}
type User {
  id: Int
  name: String
  username: String
  email: String
  phone: String
  website: String
  address: UserAddress
}
`;

module.exports = `
  ${User}
  ${Order}
  ${Item}
`;
