import ItemDetails from "./item-details";


interface OrderDetails{
    itemId: string,
    userId: number
    qty: number,
    item: ItemDetails
    _id: string,
}

export default OrderDetails;