import React from 'react';
import SummaryProps from '../../types/order-summary'
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import {Badge} from "antd";


const OrderSummary = ({userId, itemId, qty}: SummaryProps) => (
    <h3>
        <Row gutter={8}>
            <Col span={6}>User ID: {userId} </Col>
            <Col span={12}> Item ID: {itemId} </Col>
            <Col span={6} style={{textAlign: 'right'}}>
                Quantity: <Badge count={qty}/>
            </Col>
        </Row>
    </h3>
);


export default OrderSummary;