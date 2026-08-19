import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, SolutionItem, PromoCode, LicenseTierType } from '../types/index';

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  escrowFee: number;
  total: number;
  promoCode: PromoCode | null;
  promoError: string | null;
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
  addToCart: (solution: SolutionItem, quantity?: number, licenseTier?: LicenseTierType) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  updateLicenseTier: (cartItemId: string, licenseTier: LicenseTierType) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  openCheckout: (directItem?: SolutionItem) => void;
  closeCheckout: () => void;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
}

const KNOWN_PROMO_CODES: PromoCode[] = [
  {
    code: 'SOLVEX2026',
    discountType: 'percentage',
    value: 15,
    description: '15% Enterprise Launch Discount'
  },
  {
    code: 'SOVEREIGN50',
    discountType: 'fixed',
    value: 50,
    description: '$50 Off Any Sovereign Node License',
    minSpend: 200
  },
  {
    code: 'PARADOX25',
    discountType: 'percentage',
    value: 25,
    description: '25% Off Quantum Paradox Resolutions'
  },
  {
    code: 'FREEDOM10',
    discountType: 'percentage',
    value: 10,
    description: '10% Freedom SIM AI OS Discount'
  }
];

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('solvex_cart_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [promoCode, setPromoCode] = useState<PromoCode | null>(() => {
    try {
      const saved = localStorage.getItem('solvex_promo_code');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [promoError, setPromoError] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('solvex_cart_items', JSON.stringify(items));
    } catch {}
  }, [items]);

  useEffect(() => {
    try {
      if (promoCode) {
        localStorage.setItem('solvex_promo_code', JSON.stringify(promoCode));
      } else {
        localStorage.removeItem('solvex_promo_code');
      }
    } catch {}
  }, [promoCode]);

  const addToCart = (solution: SolutionItem, quantity = 1, licenseTier: LicenseTierType = 'Standard Single-Node') => {
    setItems(prevItems => {
      const existingIndex = prevItems.findIndex(
        item => item.solutionId === solution.id && item.licenseTier === licenseTier
      );

      if (existingIndex >= 0) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      }

      // Calculate price modifier based on tier
      let unitPrice = solution.price;
      if (licenseTier === 'Enterprise Multi-Node' && unitPrice > 0) {
        unitPrice = Math.round(unitPrice * 1.8);
      } else if (licenseTier === 'Unlimited Sovereign Mesh' && unitPrice > 0) {
        unitPrice = Math.round(unitPrice * 3.2);
      }

      const newItem: CartItem = {
        id: `cart-${solution.id}-${licenseTier.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}`,
        solutionId: solution.id,
        title: solution.title,
        description: solution.description,
        category: solution.category,
        itemType: solution.itemType,
        price: unitPrice,
        pricingModel: solution.pricingModel,
        quantity: Math.max(1, quantity),
        imageUrl: solution.imageUrl,
        iconName: solution.iconName,
        vendor: solution.vendor,
        paradoxResolution: solution.paradoxResolution,
        features: solution.features,
        specs: solution.specs,
        licenseTier
      };

      return [newItem, ...prevItems];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setItems(prev => prev.filter(item => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setItems(prev =>
      prev.map(item => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const updateLicenseTier = (cartItemId: string, licenseTier: LicenseTierType) => {
    setItems(prev =>
      prev.map(item => {
        if (item.id !== cartItemId) return item;
        let basePrice = item.price;
        // Adjust price
        return {
          ...item,
          licenseTier
        };
      })
    );
  };

  const clearCart = () => {
    setItems([]);
    setPromoCode(null);
    setPromoError(null);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen(prev => !prev);

  const openCheckout = (directItem?: SolutionItem) => {
    if (directItem) {
      addToCart(directItem, 1);
    }
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const closeCheckout = () => setIsCheckoutOpen(false);

  // Computations
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  let discountAmount = 0;
  if (promoCode) {
    if (promoCode.minSpend && subtotal < promoCode.minSpend) {
      // Not eligible
      discountAmount = 0;
    } else if (promoCode.discountType === 'percentage') {
      discountAmount = (subtotal * promoCode.value) / 100;
    } else {
      discountAmount = Math.min(promoCode.value, subtotal);
    }
  }

  const taxAmount = 0; // Digital sovereign goods
  const escrowFee = 0; // Included in platform
  const total = Math.max(0, subtotal - discountAmount + taxAmount + escrowFee);

  const applyPromoCode = (code: string): boolean => {
    setPromoError(null);
    const clean = code.trim().toUpperCase();
    const found = KNOWN_PROMO_CODES.find(p => p.code === clean);

    if (!found) {
      setPromoError(`Voucher code "${clean}" is invalid or expired.`);
      return false;
    }

    if (found.minSpend && subtotal < found.minSpend) {
      setPromoError(`Code requires a minimum order of $${found.minSpend}. Current subtotal: $${subtotal.toFixed(2)}.`);
      return false;
    }

    setPromoCode(found);
    return true;
  };

  const removePromoCode = () => {
    setPromoCode(null);
    setPromoError(null);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        discountAmount,
        taxAmount,
        escrowFee,
        total,
        promoCode,
        promoError,
        isCartOpen,
        isCheckoutOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateLicenseTier,
        clearCart,
        openCart,
        closeCart,
        toggleCart,
        openCheckout,
        closeCheckout,
        applyPromoCode,
        removePromoCode
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
