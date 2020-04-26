import React from 'react';
import Col from "antd/es/grid/col";
import Row from "antd/es/grid/row";
import {Badge} from "antd";
import { red, gold, blue } from '@ant-design/colors';

import SummaryProps from '../../types/item-summary'

const colorsByAvailability = [red, gold, blue];
const limitIndex = (index: number) => index > 2 ? 2 : index;
const getColor = (count: number) => colorsByAvailability[limitIndex(Math.floor(count / 30))];

const ItemSummary = ({ name, status, qty}: SummaryProps) => (
    <h3>
    <Row gutter={8}>
        <Col span={12}>{name} </Col>
        <Col span={8}> <Badge text={status} status="processing"/></Col>
        <Col span={4} style={{textAlign: 'right'}}>
            <Badge count={qty} style={{ backgroundColor: getColor(qty).primary}}/>
        </Col>
    </Row>
    </h3>
);


export default ItemSummary;