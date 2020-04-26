import ItemSummary from "./item-summary";

interface ItemDetails extends ItemSummary{
    tags: string[],
}

export default ItemDetails;