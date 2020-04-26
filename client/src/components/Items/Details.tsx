import React, {FormEvent} from 'react';
import ItemDetails from '../../types/item-details'
import InputNumber from "antd/es/input-number";
import Button from "antd/es/button";
import Form from "antd/es/form";
import Tag from 'antd/es/tag';
import Mutation, {FetchResult, MutationResult} from 'react-apollo/Mutation';

import {loader} from 'graphql.macro';
import {FormInteraction} from "../../types/common";
import {noop} from "@babel/types";

const updateItemMutation = loader('../../mutations/updateItem.graphql');
const ItemQuery = loader('../../queries/item.graphql');

type ItemQueryType = {
    item: ItemDetails
}

const ItemInfo = ({qty, tags, _id, onUpdate = noop}: ItemDetails&FormInteraction) => (
    <Mutation mutation={updateItemMutation}>
        {
            (updateItem) => {
                async function formSubmit (event:FormEvent<HTMLFormElement>) {
                    event.preventDefault();
                    const target = event.target as HTMLFormElement;
                    const result = await updateItem(
                        {
                            variables: {item: { _id, qty: parseInt(target.qty.value)}},
                            update: (store, { data: { updateItem } }) => {

                                // comment the next line to check how the update function works
                                // return;

                                const cache = store.readQuery<ItemQueryType>({
                                    query: ItemQuery,
                                    variables: { itemId: updateItem._id }
                                }) || { item: {}};


                                const newCache = {
                                    item: {
                                        ...(cache.item || {}),
                                        qty: updateItem.qty+90,

                                    }
                                };


                                store.writeQuery({
                                    query: ItemQuery,
                                    variables: { itemId: updateItem._id },
                                    data: newCache,
                                });

                                return store;
                            }
                        });
                    // if(result) {
                    //     onUpdate({ qty: result.data!.qty })
                    // }
                };

                return (
                    <Form onSubmit={formSubmit}>
                        <label>quantity: <InputNumber key={qty} defaultValue={qty} name="qty"/></label>
                        <div style={{paddingLeft: 0, marginTop: '1em', marginBottom: '1em'}}>{tags.map((tag: string) =>
                            <Tag>{tag}</Tag>)}</div>
                        <Button type="primary" htmlType="submit">Update</Button>
                    </Form>);
            }
        }

    </Mutation>
)

export default ItemInfo;
