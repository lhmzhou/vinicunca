# vinicunca

<p align="center">
  <img width="900" height="200" src="https://user-images.githubusercontent.com/16420802/80039415-c19df600-84c5-11ea-9f71-c1aa8040ffba.png">
</p>

`vinicunca` demonstrates how GraphQL can be utilized for querying services and databases.

## Feature Components

- Build a GraphQL server and client
- Provide query-able building 
- Routing, Apollo statement management, UI app components

------------------

<details>
<summary>Server</summary>

### Requirements

[Docker for Mac](https://docs.docker.com/docker-for-mac/install/)
</br>
[Docker for Windows](https://docs.docker.com/docker-for-windows/install)
</br>
[NodeJS >= 10](https://nodejs.org/en/download/)

### Start Server

start mongodb server `docker-compose up`
 
start node app `npm start`

### Development

install pm2 `npm install pm2 -g`

to start the server in watch mode use `npm run start:dev`


### Project structure

`mongodb` folder contains the data for the mongodb database

`routes/api`  contains the apis code for this server, we will call this <API> from now on.

`<API>/models` contains the mongoose models used to perform operations on the mogodb database.

`<API>/rest` contains code for the rest api

`<API>/rest/swagger.yml` Rest api swagger file. You can see the content using the swagger ui started by docker-compose.

`<API>/graph` contains code for the graphql api
</details>


------------------

<details>
<summary>Client</summary>

### Requirements     

[NodeJS >= 10](https://nodejs.org/en/download/)

### Start Client

start node app `npm start`

### Program Structure

`remote-schema.graphql` schema for the graphql service consumed by this app

`.graphqlconfig` intellij's JSGraphql plugin configuration file

`tsconfig.json` TypeScript compiler config file

`mutation and queries folder` contains the mutation and queries used by the Items components

`types folder` holds all the typescript type definitions used across the app

`types/external` holds the types for the eternal libraries that do not provide `@types` 

`index.tsx` configures apollo client and defines the app routes

`components/Items` defines the screen for the items route

`components/Orders` defines the screen for the orders route
</details>

------------------

## Sample Query

```
query ($orderId: String!){
   order(id: $orderId) { 
     _id
     itemId
     qty
     user {
       name
       email
     }
     item {
       name: item
       inStock: qty
     }
   }
}
```

## Sample JSON output

```
{
   "data": {
     "order": [
       {
         "_id": "5cec0e0eedd378874f1e49d3",
         "itemId": "5cec3997465682b928789f8",
         "qty": 4, 
         "user": {
           "name": "Higgs Boson",
           "email" "h-b@cern.net"
         }. 
         "item": {
           "name": "journal",
           "inStock": 50
         }
       }
     ]
   }
 }
```

------------------

## UI Screengrabs

<img width="681" alt="ui snapshot -- orders" src="https://user-images.githubusercontent.com/16420802/79627239-af5a3b80-8104-11ea-9755-392d3ed469d3.png">


<img width="852" alt="ui snapshot -- items" src="https://user-images.githubusercontent.com/16420802/79627254-b7b27680-8104-11ea-9f39-304ba8868602.png">

------------------

## Sample Network Results

<img width="914" alt="service query network screenshot (a)" src="https://user-images.githubusercontent.com/16420802/79627248-b4b78600-8104-11ea-8620-b4208998ab93.png">

<img width="950" alt="service query network screenshot (b)" src="https://user-images.githubusercontent.com/16420802/79627251-b6814980-8104-11ea-8feb-d552fd7d1bdd.png">

------------------
 
## Down the Rabbit Hole 

[GraphQL](https://graphql.org/)
</br>
[Client-side GraphQL](https://www.howtographql.com/advanced/0-clients/)
</br>
[Apollo](https://www.apollographql.com/docs/react/essentials/get-started/)
</br>
[Using Apollo with Typescript](https://medium.com/@borekb/apollo-client-typescript-example-99febdaa18fa)
</br>
[node-sass](https://www.npmjs.com/package/node-sass)
</br>
[react redux](https://react-redux.js.org/)

------------------

## License 

`vinicunca` is free software, and may be redistributed under the terms dictated in the [LICENSE](https://github.com/lhmzhou/vinicunca/blob/master/LICENSE) file.