export class ProductModel {

    constructor (
        public title: string,
        public description: string,
        public price: number,
        public image: string,
        public category: string,
        public discount: number,
        public promotions: boolean,
        public caloricity: number,
        public servingSize: number,
        public difficulty: string,
        public spiceLevel: string,
        public ingredients: [
            {
                ingredientId: number,
                ingredientName: string,
                quantity: number,
                measure: string
            }
        ]
    ) {}
}
