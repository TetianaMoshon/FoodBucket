import {AdminProductListImageComponent} from './admin-product-list-image.component';
export const settings = {
    actions: {
        position: 'right',
            delete: 'true',
            columnTitle: ' ',
    },
    add: {
        addButtonContent: 'Add'
    },
    pager: {
        display: true,
            perPage: 5,
    },
    mode: 'external',
    columns: {
        productId: {
            title: 'ID',
                filter: true,
                width: '10%',
        },
        title: {
            title: 'Name',
                filter: true,
                width: '30%',
        },
        image: {
            title: 'Image',
                width: '13%',
                type: 'custom',
                renderComponent: AdminProductListImageComponent,
                sort: false,
                filter: false,
        },
        category: {
            title: 'Category',
                width: '22%',
                filter: true,
        },
        price: {
            title: 'Price',
                width: '10%',
                filter: true,
        },
    },
};
