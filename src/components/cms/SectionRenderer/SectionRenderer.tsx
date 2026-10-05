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
      return <Hero onExplore={() => onNavigate("shop")} isEditable={isEditable} sectionId={section.id} sectionProps={section.props} onSave={onSave} />;
    case "featureCards":
      return <FeatureCards isEditable={isEditable} sectionId={section.id} sectionProps={section.props as any[]} onSave={onSave} />;
    case "categoriesGrid":
      return <CategoryGrid onSelectCategory={() => onNavigate("shop")} isEditable={isEditable} sectionId={section.id} sectionProps={section.props} onSave={onSave} />;
    case "bestsellers":
      return (
        <Bestsellers
          onAddToCart={() => {}}
          onQuickView={(product) => onSelectProduct(product)}
          onViewAll={() => onNavigate("shop")}
          isEditable={isEditable}
          sectionId={section.id}
          sectionProps={section.props}
          onSave={onSave}
        />
      );
    case "storySection":
    case "story":
      return <StorySection onLearnMore={() => onNavigate("about")} isEditable={isEditable} sectionId={section.id} sectionProps={section.props} onSave={onSave} />;
    case "trustBar":
      return <TrustBar isEditable={isEditable} sectionId={section.id} sectionProps={section.props as any[]} onSave={onSave} />;
    case "ctaBanner":
      return <CtaBanner onOrderNow={() => onNavigate("shop")} isEditable={isEditable} sectionId={section.id} sectionProps={section.props} onSave={onSave} />;
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
    case "productGrid":
    case "products":
      if (type === "productGrid" && !Array.isArray(section.props?.products)) return null;
      return (
        <ProductListingPage
          onAddToCart={() => {}}
          onQuickView={(product) => onSelectProduct(product)}
          onNavigateHome={() => onNavigate("home")}
          products={Array.isArray(section.props?.products) ? section.props.products : Array.isArray(section.props?.items) ? section.props.items : Array.isArray(section.props) ? section.props : undefined}
          categoriesFilter={Array.isArray(section.props?.categories) ? section.props.categories : undefined}
          saleSidebarProducts={Array.isArray(section.props?.products) ? section.props.products.filter((product: any) => product.isSale) : Array.isArray(section.props?.items) ? section.props.items.filter((product: any) => product.isSale) : undefined}
          saleSidebarTitle={typeof section.props?.saleSidebarTitle === "string" ? section.props.saleSidebarTitle : section.props?.saleSidebarTitle?.en}
        />
      );
    default:
      return null;
  }
}

export default SectionRenderer;
