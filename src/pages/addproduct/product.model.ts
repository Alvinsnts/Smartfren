export class Product {
    constructor(
        public productName?: string,
        public productPrice?: string,
        public productType?: string,
        public productDetail?: string
    ) {
        this.productName = '';
        this.productPrice = '';
        this.productType = '';
        this.productDetail = '';
    }
}