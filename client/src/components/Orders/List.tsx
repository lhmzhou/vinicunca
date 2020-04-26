import React, { useState } from 'react';
import Order from './Summary';
import OrderSummary from "../../types/order-summary";
import Collapse from "antd/es/collapse";
import Details from "./Details";
import ApolloConsumer from "react-apollo/ApolloConsumer";

const {Panel} = Collapse;

interface PanelSetter {
    (key: [string]|[]): void
}

type ordersList = {
    orders: OrderSummary[],
    openPanels: [string] | [],
    setOpenPanels: PanelSetter

}



const ItemsList = ({orders, openPanels, setOpenPanels}: ordersList) => {
    return (
        <ApolloConsumer>
            {
                (client) => (
                    <Collapse activeKey={openPanels} onChange={(key) => {setOpenPanels(key as [string])}}>
                        {
                            orders.map(order => (
                                <Panel header={<Order {...order} />} key={order._id}>
                                    <Details orderId={order._id} apolloClient={client} />
                                </Panel>
                            ))
                        }
                    </Collapse>
                )
            }

        </ApolloConsumer>
    );
};

export default ItemsList;