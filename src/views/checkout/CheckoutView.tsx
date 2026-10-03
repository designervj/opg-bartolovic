"use client";

import React from "react";
import { CheckoutPage } from "@/components/CheckoutPage";
import { CartItem } from "@/components/CartDrawer";

interface CheckoutViewProps {
  pageData?: any;
  items?: CartItem[];
  onNavigateShop?: () => void;
  onClearCart?: () => void;
}

export function CheckoutView({
  pageData,
  items = [],
  onNavigateShop = () => {},
  onClearCart = () => {},
}: CheckoutViewProps) {
  return (
    <CheckoutPage
      items={items}
      onNavigateShop={onNavigateShop}
      onClearCart={onClearCart}
    />
  );
}

export default CheckoutView;
