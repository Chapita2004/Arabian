import React, { useState } from 'react';
import { ChevronDown, ChevronUp, X, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SidebarFilter = ({ filters, selectedFilters, onChange, isOpen, onClose }) => {
    // Mobile drawer content
    const FilterContent = () => (
        <div className="space-y-6">
            <div className="flex items-center justify-between md:hidden mb-6">
                <h2 className="text-[#c2a35d] text-sm uppercase tracking-[0.2em] font-bold">Filtros</h2>
                <button onClick={onClose} className="text-white/50 hover:text-white">
                    <X size={20} />
                </button>
            </div>

            {filters.map((filter) => (
                <FilterGroup
                    key={filter.id}
                    filter={filter}
                    selected={selectedFilters[filter.id] || []}
                    onChange={(value) => onChange(filter.id, value)}
                />
            ))}
        </div>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <div className="hidden md:block w-64 flex-shrink-0 pr-8 border-r border-white/5">
                <div className="sticky top-32">
                    <h2 className="text-[#c2a35d] text-xs uppercase tracking-[0.3em] font-bold mb-8 flex items-center gap-2">
                        <Filter size={14} /> Filtrar Por
                    </h2>
                    <FilterContent />
                </div>
            </div>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={onClose}
                            className="fixed inset-0 bg-black/80 z-[200] md:hidden backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 left-0 w-[300px] bg-[#0a0a0a] border-r border-[#c2a35d]/20 z-[201] md:hidden p-6 overflow-y-auto"
                        >
                            <FilterContent />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

const FilterGroup = ({ filter, selected, onChange }) => {
    const [isOpen, setIsOpen] = useState(true);

    if (filter.type === 'range') {
        // Placeholder for price range - functionality depends on requirements
        return null;
    }

    const toggleSelection = (option) => {
        const newSelection = selected.includes(option)
            ? selected.filter(item => item !== option)
            : [...selected, option];
        onChange(newSelection);
    };

    return (
        <div className="border-b border-white/5 pb-4 last:border-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between text-left group"
            >
                <span className="text-white/90 text-[11px] uppercase tracking-widest font-medium group-hover:text-[#c2a35d] transition-colors">
                    {filter.name}
                </span>
                {isOpen ? <ChevronUp size={14} className="text-white/30" /> : <ChevronDown size={14} className="text-white/30" />}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="pt-4 space-y-2">
                            {filter.options.map((option) => (
                                <label key={option} className="flex items-center gap-3 cursor-pointer group">
                                    <div className={`w-3.5 h-3.5 border flex items-center justify-center transition-colors
                    ${selected.includes(option) ? 'border-[#c2a35d] bg-[#c2a35d]' : 'border-white/20 group-hover:border-[#c2a35d]/50'}`}
                                    >
                                        {selected.includes(option) && <span className="text-black text-[10px] font-bold">✓</span>}
                                    </div>
                                    <input
                                        type="checkbox"
                                        className="hidden"
                                        checked={selected.includes(option)}
                                        onChange={() => toggleSelection(option)}
                                    />
                                    <span className={`text-[11px] uppercase tracking-wider transition-colors 
                    ${selected.includes(option) ? 'text-white' : 'text-white/50 group-hover:text-white/80'}`}
                                    >
                                        {option}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SidebarFilter;
