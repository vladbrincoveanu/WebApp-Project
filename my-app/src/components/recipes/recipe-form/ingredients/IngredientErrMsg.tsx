export class IngredientErrMsg {
    name: string;
    quantity: string;
    quantityType: string;

    isEqual(other: IngredientErrMsg): boolean {
        return this.name === other.name && this.quantity === other.quantity && this.quantityType === other.quantityType;
    }

    static empty(): IngredientErrMsg{
        return new IngredientErrMsg();
    }
}