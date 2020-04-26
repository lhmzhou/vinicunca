import React from 'react';
import {Query} from 'react-apollo';
import {loader} from 'graphql.macro';
import {Spin} from 'antd'

import List from './List';


const query = loader('../../queries/items.graphql');

const Items = () => {
    return (<Query query={query}>
        {
            ({loading, data}) => {
                if (loading) {
                    return <Spin/>
                }

                return <List items={data.items}/>
            }
        }
    </Query>)
};

export default Items;