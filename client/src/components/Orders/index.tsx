import React, {useState} from 'react';
import {Spin} from 'antd';
import {connectAsync} from 'iguazu';
import {queryGraphQLData} from 'iguazu-graphql';

import List from './List';
import OrderSummary from "../../types/order-summary";
import {LoadDataAsPropsFunction} from "../../types/external/iguazu-types";

const query = `
query Orders {
    orders {
        _id
        itemId
        qty
        userId
    }
}
`

interface BooleanFn {
    (): boolean
}

type OrdersQuery = {
    orders: [OrderSummary]
}

const Orders = ({ isLoading, ordersQuery }: {isLoading: BooleanFn, ordersQuery: OrdersQuery}) => {
    const [openPanels, setOpenPanels] = useState<[string]|[]>([]);

    debugger;
    if(isLoading()) {
        return <Spin/>;
    }

    return <List orders={ordersQuery.orders} openPanels={openPanels} setOpenPanels={setOpenPanels}/>
};

const loadDataAsProps: LoadDataAsPropsFunction<{}> = (args) => {
    const {store: { dispatch }} = args;
    return {
        ordersQuery: () => dispatch(queryGraphQLData({ endpointName: 'graphApi', query })),
    }
}

export default connectAsync({loadDataAsProps})(Orders);