const fetch = require('node-fetch');
const HttpsProxyAgent = require('https-proxy-agent');

var proxy = process.env.HTTP_PROXY;
const usersUrl = 'https://jsonplaceholder.typicode.com/users/'
const ordersUrl = 'http://localhost:3000/api/rest/orders/'

const options = {};

if (proxy) {
  const url = require('url').parse(proxy);
  console.log(url)
  options.agent = new HttpsProxyAgent({
    host: url.hostname,
    protocol: url.protocol,
    port: url.port,
    auth: `${process.env.LOGNAME}:${process.env.PROXYPASS}`,
    rejectUnauthorized: false
  });
}

const users = () => {
  return fetch(usersUrl, options).then((res) => {
    if(res.status == 200) {
      return res.json()
    }

    res.text().then(text => console.log(text));
    return Promise.resolve([]);

  })
};

const user = ({ userId } = {},{id}) => {
  return fetch(usersUrl + (userId || id), options).then(res => res.json())
}

const orders = () => {
  return fetch(ordersUrl).then(res => res.json())
};


const order = (_,{id}) => {
  return fetch(ordersUrl+id).then(res => res.json())
}

const items = (parent,args, {dataSources: {Items}}) => {
  return Items.find().exec();
}

const item = ({itemId} = {},{ id }, {dataSources: { Items }}) => {
  return Items.findById(itemId || id).exec();
}

module.exports = {
  Query: {
    users,
    orders,
    items,
    user,
    findUser: user,
    order,
    item,
    dateTime: () => (new Date()).toString(),
    timeStamp: () => Date.now(),
  },
  Order: {
    item,
    user,
  },
};