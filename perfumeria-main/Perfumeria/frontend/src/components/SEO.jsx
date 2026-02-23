import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({
    title = 'Arabian Exclusive - Perfumes Árabes y de Nicho en San Juan',
    description = 'Descubrí la mejor selección de perfumes árabes, de nicho y desodorantes en San Juan, Argentina. Lattafa, Rasasi, Armaf y más marcas exclusivas.',
    keywords = 'perfumes árabes, perfumes de nicho, Lattafa, Rasasi, Armaf, perfumería San Juan, fragancias árabes Argentina',
    image = 'https://images.unsplash.com/photo-1615631648086-325025c9e51e?q=80&w=1200&auto=format&fit=crop',
    url = 'https://arabianexclusive.com',
    type = 'website',
    price,
    currency = 'ARS',
    availability,
    brand,
    productName,
    schemaData
}) => {
    const siteUrl = 'https://arabianexclusive.com';
    const fullUrl = url.startsWith('http') ? url : `${siteUrl}${url}`;
    const fullImage = image.startsWith('http') ? image : `${siteUrl}${image}`;

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <link rel="canonical" href={fullUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={fullImage} />
            <meta property="og:site_name" content="Arabian Exclusive" />
            <meta property="og:locale" content="es_AR" />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={fullUrl} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={fullImage} />

            {/* Product-specific Open Graph */}
            {type === 'product' && price && (
                <>
                    <meta property="og:type" content="product" />
                    <meta property="product:price:amount" content={price} />
                    <meta property="product:price:currency" content={currency} />
                    {brand && <meta property="product:brand" content={brand} />}
                    {availability && <meta property="product:availability" content={availability} />}
                </>
            )}

            {/* Schema.org JSON-LD */}
            {schemaData && (
                <script type="application/ld+json">
                    {JSON.stringify(schemaData)}
                </script>
            )}
        </Helmet>
    );
};

export default SEO;
