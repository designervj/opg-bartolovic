"use client";

import React from "react";
import { CartPage } from "@/components/CartPage";
import { CartItem } from "@/components/CartDrawer";

interface CartViewProps {
  pageData?: any;
  items?: CartItem[];
  onUpdateQuantity?: (productId: string, delta: number) => void;
  onSetQuantity?: (productId: string, quantity: number) => void;
  onRemoveItem?: (productId: string) => void;
  onNavigateShop?: () => void;
  onProceedToCheckout?: () => void;
}

export function CartView({
  pageData,
  items = [],
  onUpdateQuantity = () => {},
  onSetQuantity = () => {},
  onRemoveItem = () => {},
  onNavigateShop = () => {},
  onProceedToCheckout = () => {},
}: CartViewProps) {
  return (
    <CartPage
      items={items}
      onUpdateQuantity={onUpdateQuantity}
      onSetQuantity={onSetQuantity}
      onRemoveItem={onRemoveItem}
      onNavigateShop={onNavigateShop}
      onProceedToCheckout={onProceedToCheckout}
    />
  );
}

export default CartView;
