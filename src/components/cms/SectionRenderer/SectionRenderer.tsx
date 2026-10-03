"use client";

import React from "react";
import { Hero } from "@/components/Hero";
import { FeatureCards } from "@/components/FeatureCards";
import { CategoryGrid } from "@/components/CategoryGrid";
import { Bestsellers } from "@/components/Bestsellers";
import { StorySection } from "@/components/StorySection";
import { TrustBar } from "@/components/TrustBar";
import { CtaBanner } from "@/components/CtaBanner";
import { AboutPage } from "@/components/AboutPage";
import { ContactPage } from "@/components/ContactPage";
import { ProductListingPage } from "@/components/ProductListingPage";

interface SectionRendererProps {
  section: {
    id: string;
    type: string;
    adminTitle?: string;
    props?: Record<string, any>;
  };
  isEditable?: boolean;
  onSave?: (sectionId: string, fieldPath: string, value: string) => void;
  onNavigate?: (page: string) => void;
  onSelectProduct?: (product: any) => void;
}

export function SectionRenderer({
  section,
  isEditable = false,
  onSave = () => {},
  onNavigate = () => {},
  onSelectProduct = () => {},
}: SectionRendererProps) {
  if (!section) return null;

  const type = section.type || section.adminTitle || "";

  switch (type) {
    case "hero":
      return <Hero onExplore={() => onNavigate("shop")} />;
    case "featureCards":
      return <FeatureCards />;
    case "categoriesGrid":
      return <CategoryGrid onSelectCategory={() => onNavigate("shop")} />;
    case "bestsellers":
      return (
        <Bestsellers
          onAddToCart={() => {}}
          onQuickView={(product) => onSelectProduct(product)}
          onViewAll={() => onNavigate("shop")}
        />
      );
    case "storySection":
    case "story":
      return <StorySection onLearnMore={() => onNavigate("about")} />;
    case "trustBar":
      return <TrustBar />;
    case "ctaBanner":
      return <CtaBanner onOrderNow={() => onNavigate("shop")} />;
    case "about":
      return (
        <AboutPage
          onNavigateShop={() => onNavigate("shop")}
          onNavigateContact={() => onNavigate("contact")}
        />
      );
    case "contact":
      return <ContactPage onShowToast={() => {}} />;
    case "shop":
      return (
        <ProductListingPage
          onAddToCart={() => {}}
          onQuickView={(product) => onSelectProduct(product)}
          onNavigateHome={() => onNavigate("home")}
        />
      );
    default:
      return null;
  }
}

export default SectionRenderer;
