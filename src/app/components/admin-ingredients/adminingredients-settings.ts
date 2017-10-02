export const  settings = {
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
        ingredient_id: {
            title: 'ID',
            filter: true,
            width: '10%',
        },
        title: {
            title: 'Ingredients',
            filter: true,
            width: '30%',
        },
        measure: {
            title: 'Measure',
            width: '13%',
            sort: false,
            filter: true,
        },
        quantity: {
            title: 'Warehouse quantity',
            width: '22%',
            filter: true,
        },
        price: {
            title: 'Price',
            width: '10%',
            filter: true,
        },
        image: {
            title: 'Image',
            width: '13%',
            sort: false,
            filter: false,
        },
    },
};
