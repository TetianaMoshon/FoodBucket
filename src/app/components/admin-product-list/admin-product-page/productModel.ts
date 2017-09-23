export class ProductModel {

    constructor (
        public title: string,
        public description: string,
        public price: number,
        public image: string,
        public category: string,
        public status = false,
        public discount: number,
        public promotions = false,
        public caloricity: number,
        public servingSize: number,
        public difficulty: string,
        public spiceLevel: string,
        // public ingredients: [
        //     {
        //         ingredientName: string,
        //         quantity: number,
        //         measure: string
        //     }
        // ],
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
