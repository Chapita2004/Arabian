import React from 'react';
import { motion } from 'framer-motion';
import Breadcrumbs from './Breadcrumbs';
import SEO from './SEO';

const LegalPage = ({ title, lastUpdated, children, description }) => {
    const breadcrumbItems = [
        { label: 'Inicio', path: '/' },
        { label: title, path: null }
    ];

    return (
        <div className="bg-perfume-pattern min-h-screen">
            <SEO
                title={`${title} - Arabian Exclusive`}
                description={description || `${title} de Arabian Exclusive`}
                url={`/${title.toLowerCase().replace(/\s+/g, '-')}`}
            />

            <div className="max-w-4xl mx-auto px-6 py-32">
                <Breadcrumbs items={breadcrumbItems} />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Header */}
                    <div className="mb-12 text-center">
                        <h1 className="text-[#c2a35d] text-3xl md:text-4xl font-light uppercase tracking-wider mb-4">
                            {title}
                        </h1>
                        {lastUpdated && (
                            <p className="text-white/50 text-xs uppercase tracking-wider">
                                Última actualización: {lastUpdated}
                            </p>
                        )}
                    </div>

                    {/* Content */}
                    <div className="bg-[#0a0a0a] border border-white/5 p-8 md:p-12">
                        <div className="prose prose-invert max-w-none legal-content">
                            {children}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default LegalPage;
