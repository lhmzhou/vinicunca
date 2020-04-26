import React, {FormEvent} from 'react';
import PropTypes from 'prop-types';
import {queryGraphQLData, mutateGraphQLData} from 'iguazu-graphql';
import {connectAsync} from 'iguazu';
import OrderDetails from '../../types/order-details';
import Form from "antd/es/form";
import InputNumber from "antd/es/input-number";
import Tag from "antd/es/tag";
import Button from "antd/es/button";
import {IguazuBasicResult, LoadDataAsPropsFunction} from "../../types/external/iguazu-types";
import {compose, Dispatch} from "redux";
import {Spin} from "antd";
import {connect} from "react-redux";
import {ApolloContextValue} from "react-apollo/ApolloContext";
import withApollo from "react-apollo/withApollo";
import {ApolloClient} from 'apollo-boost';
import ItemDetails from "../../types/item-details";
import {loader} from "graphql.macro";

const ItemQuery = loader('../../queries/item.graphql');

type OrderQueryResult = {
    orderQuery: { order: OrderDetails }
}

interface OrderUpdater {
    (event: FormEvent<HTMLFormElement>): Promise<{}>
}

type DetailProps = OrderQueryResult
    & IguazuBasicResult
    & { updateOrder: OrderUpdater };


const OrderInfo = ({isLoading, orderQuery, updateOrder}: DetailProps) => {
    if (isLoading() || !orderQuery) {
        return <Spin/>;
    }

    // debugger;

    const {order: {qty, item: {qty: inStock, tags, name}, _id}} = orderQuery;

    return (
        <Form onSubmit={updateOrder}>
            <h4><label>Items in order: <InputNumber key={qty} defaultValue={qty} name="qty"/></label></h4>
            <h4><label>Items in stock: {inStock}</label></h4>
            <h4><label>Item Name: {name}</label></h4>
            <div style={{paddingLeft: 0, marginTop: '1em', marginBottom: '1em'}}>{tags.map((tag: string) =>
                <Tag>{tag}</Tag>)}</div>
            <Button type="primary" htmlType="submit">Update</Button>
        </Form>)
}

type OwnProps = {
    orderId: string,
    apolloClient: ApolloClient<{}>,
};

const query = `
query Order($orderId: String!){
    order(id: $orderId) {
        _id
        qty
        userId
        item {
            name: item
            qty
            _id
            tags
        }
    }
}
`;

const mutation = `
mutation UpdateOrder($orderId: String!, $qty: Int!){
  updateOrder(_id: $orderId, qty: $qty) {
    _id
    tags
    qty
    item {
      name: item
      qty
      _id
    }
    
  }
}
`;

const loadDataAsProps: LoadDataAsPropsFunction<OwnProps> = ({store: {dispatch}, ownProps: {orderId}}) => {
    return {
        orderQuery: () => dispatch(queryGraphQLData({endpointName: 'graphApi', query, variables: {orderId}}))
    }
}

// interconnecting Iguazu and Apollo
const linkDispatchToProps = (dispatch: Dispatch, {orderId, apolloClient}: OwnProps) => ({
    updateOrder: (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const target = event.target as HTMLFormElement;
        return dispatch(mutateGraphQLData({
            endpointName: 'graphApi',
            mutation,
            variables: {orderId, qty: parseInt(target.qty.value)}
        })).promise
            .then(({data: {updateOrder: {item}}}: { data: {updateOrder: { item: ItemDetails } }}) =>
        {
            // debugger;

            try {
                const itemCache = apolloClient.store.getCache().readQuery<{item:ItemDetails}>({
                    query: ItemQuery,
                    variables: {itemId: item._id}
                }) || { item: {} };

                const newCache = {
                    item: {
                        ...(itemCache.item || {}),
                        ...item,

                    }
                };


                apolloClient.store.getCache().writeQuery({
                    query: ItemQuery,
                    variables: {itemId: item._id},
                    data: newCache,
                });

            } catch (e) {
                // fails if the query to update does not exist
            }

        }
    )
    }
})

export default compose(
    connect(undefined, linkDispatchToProps),
    connectAsync({loadDataAsProps})
)(OrderInfo);