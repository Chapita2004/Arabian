import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs = ({ items }) => {
    if (!items || items.length === 0) return null;

    // Generate Schema.org BreadcrumbList
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.label,
            "item": item.path ? `https://arabianexclusive.com${item.path}` : undefined
        }))
    };

    return (
        <>
            {/* Schema.org JSON-LD */}
            <script type="application/ld+json">
                {JSON.stringify(breadcrumbSchema)}
            </script>

            {/* Visual Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="mb-6">
                <ol className="flex items-center space-x-2 text-xs uppercase tracking-wider">
                    {items.map((item, index) => {
                        const isLast = index === items.length - 1;

                        return (
                            <li key={index} className="flex items-center">
                                {index > 0 && (
                                    <ChevronRight size={12} className="text-[#c2a35d]/40 mx-2" />
                                )}

                                {item.path && !isLast ? (
                                    <Link
                                        to={item.path}
                                        className="text-[#c2a35d] hover:text-white transition-colors flex items-center gap-1"
                                    >
                                        {index === 0 && <Home size={12} />}
                                        {item.label}
                                    </Link>
                                ) : (
                                    <span className={`flex items-center gap-1 ${isLast ? 'text-white/50' : 'text-[#c2a35d]'}`}>
                                        {index === 0 && <Home size={12} />}
                                        {item.label}
                                    </span>
                                )}
                            </li>
                        );
                    })}
                </ol>
            </nav>
        </>
    );
};

export default Breadcrumbs;
