"use client";

import React from "react";
import { ProductListingPage } from "@/components/ProductListingPage";
import { Product } from "@/data/honeyData";

interface ShopViewProps {
  pageData?: any;
  onAddToCart?: (product: Product, quantity?: number) => void;
  onQuickView?: (product: Product) => void;
  onNavigateHome?: () => void;
}

export function ShopView({
  pageData,
  onAddToCart = () => {},
  onQuickView = () => {},
  onNavigateHome = () => {},
}: ShopViewProps) {
  return (
    <ProductListingPage
      onAddToCart={onAddToCart}
      onQuickView={onQuickView}
      onNavigateHome={onNavigateHome}
    />
  );
}

export default ShopView;
