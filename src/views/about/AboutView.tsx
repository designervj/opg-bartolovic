"use client";

import React from "react";
import { AboutPage } from "@/components/AboutPage";

interface AboutViewProps {
  pageData?: any;
  onNavigateShop?: () => void;
  onNavigateContact?: () => void;
}

export function AboutView({
  pageData,
  onNavigateShop = () => {},
  onNavigateContact = () => {},
}: AboutViewProps) {
  return (
    <AboutPage
      onNavigateShop={onNavigateShop}
      onNavigateContact={onNavigateContact}
    />
  );
}

export default AboutView;
