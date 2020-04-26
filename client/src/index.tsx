import React from "react";
import {render} from "react-dom";
import {createStore, combineReducers, applyMiddleware} from 'redux'
import {Provider} from 'react-redux';
import {graphqlReducer, addGraphQLEndpoints} from 'iguazu-graphql';
import thunk from 'redux-thunk';
import {BrowserRouter, Route, Switch, NavLink, Redirect} from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import {PageHeader} from 'antd';
import "./app.scss";
import ApolloProvider from "react-apollo/ApolloProvider";
import Items from './components/Items';
import Orders from './components/Orders';

const GRAPH_API = 'http://localhost:3000/api/graph';

const client = new ApolloClient({
    uri: GRAPH_API
});




const store = createStore(combineReducers({
        iguazuGraphQL: graphqlReducer,
    }),
    applyMiddleware(thunk)
);


addGraphQLEndpoints([
    {
        name: 'graphApi',
        fetch: () => ({ url: GRAPH_API }),
    },
    // other endpoints can be specified at the same time
    // they can also be added later
]);

function App() {
    return (
        <ApolloProvider client={client}>
            <Provider store={store}>

                <BrowserRouter>
                    <PageHeader title="WAREHOUSE">
                        <nav className="app-nav">
                            <NavLink to="/items" activeClassName="active-link">Items</NavLink>
                            <NavLink to="/orders" activeClassName="active-link">Orders</NavLink>
                        </nav>
                    </PageHeader>
                    <Switch>
                        <Route path="/items" component={Items}/>
                        <Route path="/orders" component={Orders}/>
                        <Redirect to="/items"/>
                    </Switch>

                </BrowserRouter>
            </Provider>
        </ApolloProvider>
    );
}

const rootElement = document.getElementById("root");
render(<App/>, rootElement);
