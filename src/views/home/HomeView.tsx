"use client";

import React from "react";
import { Hero } from "@/components/Hero";
import { FeatureCards } from "@/components/FeatureCards";
import { CategoryGrid } from "@/components/CategoryGrid";
import { Bestsellers } from "@/components/Bestsellers";
import { StorySection } from "@/components/StorySection";
import { TrustBar } from "@/components/TrustBar";
import { CtaBanner } from "@/components/CtaBanner";
import { Product } from "@/data/honeyData";

interface HomeViewProps {
  pageData?: any;
  onExplore?: () => void;
  onSelectCategory?: (categoryName: string) => void;
  onAddToCart?: (product: Product, quantity?: number) => void;
  onQuickView?: (product: Product) => void;
  onLearnMore?: () => void;
  onOrderNow?: () => void;
}

export function HomeView({
  pageData,
  onExplore = () => {},
  onSelectCategory = () => {},
  onAddToCart = () => {},
  onQuickView = () => {},
  onLearnMore = () => {},
  onOrderNow = () => {},
}: HomeViewProps) {
  return (
    <div className="min-h-screen bg-[#FFFDF9]">
      <Hero onExplore={onExplore} />
      <FeatureCards />
      <CategoryGrid onSelectCategory={onSelectCategory} />
      <Bestsellers
        onAddToCart={onAddToCart}
        onQuickView={onQuickView}
        onViewAll={onExplore}
      />
      <StorySection onLearnMore={onLearnMore} />
      <TrustBar />
      <CtaBanner onOrderNow={onOrderNow} />
    </div>
  );
}

export default HomeView;
