import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);

    // Load wishlist from localStorage on mount
    useEffect(() => {
        try {
            const savedWishlist = localStorage.getItem('arabianexclusive_wishlist');
            if (savedWishlist) {
                setWishlist(JSON.parse(savedWishlist));
            }
        } catch (error) {
            console.error('Error loading wishlist from localStorage:', error);
        }
    }, []);

    // Save wishlist to localStorage whenever it changes
    useEffect(() => {
        try {
            localStorage.setItem('arabianexclusive_wishlist', JSON.stringify(wishlist));
        } catch (error) {
            console.error('Error saving wishlist to localStorage:', error);
        }
    }, [wishlist]);

    const addToWishlist = (product) => {
        const productId = product._id || product.id;

        // Check if product is already in wishlist
        if (!wishlist.find(item => (item._id || item.id) === productId)) {
            setWishlist([...wishlist, product]);
        }
    };

    const removeFromWishlist = (productId) => {
        setWishlist(wishlist.filter(item => (item._id || item.id) !== productId));
    };

    const isInWishlist = (productId) => {
        return wishlist.some(item => (item._id || item.id) === productId);
    };

    const clearWishlist = () => {
        setWishlist([]);
    };

    const toggleWishlist = (product) => {
        const productId = product._id || product.id;
        if (isInWishlist(productId)) {
            removeFromWishlist(productId);
        } else {
            addToWishlist(product);
        }
    };

    const wishlistCount = wishlist.length;

    return (
        <WishlistContext.Provider
            value={{
                wishlist,
                wishlistCount,
                addToWishlist,
                removeFromWishlist,
                isInWishlist,
                clearWishlist,
                toggleWishlist
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
};
