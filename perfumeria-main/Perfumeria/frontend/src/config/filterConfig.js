export const filterConfig = {
    'Perfumes árabes': [
        {
            id: 'brand',
            name: 'Marca',
            options: ['Lattafa', 'Afnan', 'Armaf', 'Rasasi', 'Al Haramain', 'Maison Alhambra', 'Paris Corner']
        },
        {
            id: 'gender',
            name: 'Género',
            options: ['Hombre', 'Mujer', 'Unisex']
        },
        {
            id: 'olfactoryFamily',
            name: 'Familia Olfativa',
            options: ['Amaderada', 'Oriental', 'Floral', 'Frutal', 'Cítrica', 'Gourmand', 'Cuero', 'Especiada']
        },
        {
            id: 'concentration',
            name: 'Concentración',
            options: ['Eau de Parfum', 'Extrait de Parfum', 'Aceite Perfumado']
        },
        {
            id: 'price',
            name: 'Precio',
            type: 'range',
            min: 0,
            max: 300000
        }
    ],
    'Perfumes de nicho': [
        {
            id: 'brand',
            name: 'Marca',
            options: ['Xerjoff', 'Roja Parfums', 'Parfums de Marly', 'Amouage', 'Nishane', 'Mancera', 'Montale']
        },
        {
            id: 'gender',
            name: 'Género',
            options: ['Unisex', 'Hombre', 'Mujer']
        },
        {
            id: 'olfactoryFamily',
            name: 'Familia Olfativa',
            options: ['Amaderada', 'Oriental', 'Floral', 'Chypre', 'Fougère', 'Cuero']
        },
        {
            id: 'concentration',
            name: 'Concentración',
            options: ['Extrait de Parfum', 'Eau de Parfum']
        },
        {
            id: 'price',
            name: 'Precio',
            type: 'range',
            min: 100000,
            max: 1000000
        }
    ],
    'Desodorantes árabes': [
        {
            id: 'brand',
            name: 'Marca',
            options: ['Lattafa', 'Afnan', 'Armaf']
        },
        {
            id: 'gender',
            name: 'Género',
            options: ['Hombre', 'Mujer', 'Unisex']
        },
        {
            id: 'price',
            name: 'Precio',
            type: 'range',
            min: 10000,
            max: 50000
        }
    ]
};
