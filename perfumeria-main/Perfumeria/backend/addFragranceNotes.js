const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');

// Notas olfativas comunes para diferentes familias
const fragranceNotes = {
    'Amaderada': {
        head: ['Bergamota', 'Limón', 'Cardamomo'],
        heart: ['Cedro', 'Pachulí', 'Vetiver'],
        base: ['Sándalo', 'Ámbar', 'Musgo de roble']
    },
    'Oriental': {
        head: ['Azafrán', 'Naranja', 'Canela'],
        heart: ['Rosa', 'Jazmín', 'Oud'],
        base: ['Vainilla', 'Ámbar', 'Almizcle']
    },
    'Floral': {
        head: ['Neroli', 'Bergamota', 'Mandarina'],
        heart: ['Rosa', 'Jazmín', 'Lirio', 'Peonía'],
        base: ['Almizcle blanco', 'Sándalo', 'Cedro']
    },
    'Frutal': {
        head: ['Manzana', 'Pera', 'Grosella negra'],
        heart: ['Durazno', 'Frambuesa', 'Jazmín'],
        base: ['Vainilla', 'Almizcle', 'Ámbar']
    },
    'Cítrica': {
        head: ['Limón', 'Bergamota', 'Naranja', 'Pomelo'],
        heart: ['Neroli', 'Petit grain', 'Lavanda'],
        base: ['Vetiver', 'Cedro', 'Almizcle']
    },
    'Gourmand': {
        head: ['Café', 'Caramelo', 'Bergamota'],
        heart: ['Vainilla', 'Praliné', 'Tonka'],
        base: ['Chocolate', 'Pachulí', 'Almizcle']
    },
    'Cuero': {
        head: ['Azafrán', 'Cardamomo', 'Pimienta'],
        heart: ['Cuero', 'Oud', 'Rosa'],
        base: ['Ámbar', 'Pachulí', 'Vetiver']
    },
    'Especiada': {
        head: ['Pimienta rosa', 'Cardamomo', 'Bergamota'],
        heart: ['Canela', 'Nuez moscada', 'Clavo'],
        base: ['Ámbar', 'Vainilla', 'Pachulí']
    }
};

// Notas por defecto si no tiene familia olfativa
const defaultNotes = {
    head: ['Bergamota', 'Limón', 'Naranja'],
    heart: ['Rosa', 'Jazmín', 'Lavanda'],
    base: ['Ámbar', 'Almizcle', 'Vainilla']
};

async function addFragranceNotes() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✓ Conectado a MongoDB');

        const products = await Product.find({});
        console.log(`\n📦 Encontrados ${products.length} productos para actualizar.\n`);

        let updatedCount = 0;

        for (const product of products) {
            // Solo actualizar si no tiene notas
            if (!product.notes || !product.notes.head || product.notes.head.length === 0) {
                // Obtener notas basadas en la familia olfativa
                const family = product.olfactoryFamily;
                const notes = fragranceNotes[family] || defaultNotes;

                // Asignar notas
                product.notes = {
                    head: notes.head,
                    heart: notes.heart,
                    base: notes.base
                };

                await product.save();
                updatedCount++;

                console.log(`✓ ${product.name}`);
                console.log(`  Familia: ${family || 'Sin familia'}`);
                console.log(`  Salida: ${notes.head.join(', ')}`);
                console.log(`  Corazón: ${notes.heart.join(', ')}`);
                console.log(`  Fondo: ${notes.base.join(', ')}\n`);
            } else {
                console.log(`⊘ ${product.name} - Ya tiene notas configuradas\n`);
            }
        }

        console.log(`\n✅ Proceso completado!`);
        console.log(`📊 ${updatedCount} productos actualizados con notas olfativas.`);
        process.exit(0);
    } catch (error) {
        console.error('❌ Error actualizando productos:', error);
        process.exit(1);
    }
}

addFragranceNotes();
