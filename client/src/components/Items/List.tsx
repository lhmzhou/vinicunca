import React from 'react';
import Collapse from 'antd/es/collapse';
import {QueryResult} from "react-apollo";
import {Spin} from "antd";
import {loader} from "graphql.macro";
import Query from "react-apollo/Query";

import Summary from './Summary';
import Details from './Details';
import ItemSummary from "../../types/item-summary";
import ApolloConsumer from "react-apollo/ApolloConsumer";

const query = loader('../../queries/item.graphql');

const {Panel} = Collapse;

type itemsList = {
    items: ItemSummary[]
}

const ItemsList = ({items}: itemsList) => {
    return (
        <ApolloConsumer>
            {
                (client) => {
                    return (
                        <Collapse>
                            {
                                items.map(item => (
                                    <Panel header={<Summary {...item} />} key={item._id}>

                                        <Query query={query} variables={{itemId: item._id}} key={item._id}>
                                            {
                                                ({loading, data}: QueryResult) => {
                                                    if (loading) {
                                                        return <Spin/>;
                                                    }

                                                    return data && (
                                                        <Details
                                                            {...data.item}
                                                        />
                                                    ) || null;
                                                }
                                            }
                                        </Query>
                                    </Panel>
                                ))
                            }
                        </Collapse>
                    )
                }
            }

        </ApolloConsumer>
    );
};

export default ItemsList;